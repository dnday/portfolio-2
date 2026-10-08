package handler

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/mail"
	"os"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Contact form endpoint (POST /api/contact).
//
// Each message is delivered every way that is configured, and the request succeeds if at least one works:
//   - RESEND_API_KEY + CONTACT_TO_EMAIL: emailed to you through Resend (CONTACT_FROM_EMAIL is optional).
//   - MONGODB_URI (+ MONGODB_DB_NAME, MONGODB_COLLECTION): saved to MongoDB.

// ContactRequest represents the contact form data
type ContactRequest struct {
	Name    string `json:"name" bson:"name"`
	Email   string `json:"email" bson:"email"`
	Subject string `json:"subject" bson:"subject"`
	Message string `json:"message" bson:"message"`
	// Honeypot: the form hides this field, so only bots fill it in.
	Company string `json:"company" bson:"-"`
}

// ContactSubmission extends ContactRequest with timestamp
type ContactSubmission struct {
	ContactRequest `bson:",inline"`
	CreatedAt      time.Time `bson:"created_at"`
}

// A variable so a test can point it at a fake server.
var resendURL = "https://api.resend.com/emails"

// Handler is the serverless function entry point for Vercel
func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	r.Body = http.MaxBytesReader(w, r.Body, 64<<10)
	var req ContactRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request format", http.StatusBadRequest)
		return
	}

	// Bots get a normal-looking success and nothing is sent.
	if req.Company != "" {
		writeOK(w)
		return
	}

	req.Name = strings.TrimSpace(req.Name)
	req.Email = strings.TrimSpace(req.Email)
	req.Subject = strings.TrimSpace(strings.ReplaceAll(req.Subject, "\n", " "))
	req.Message = strings.TrimSpace(req.Message)
	if msg := validate(req); msg != "" {
		http.Error(w, msg, http.StatusBadRequest)
		return
	}

	resendKey := os.Getenv("RESEND_API_KEY")
	mongoURI := os.Getenv("MONGODB_URI")
	if resendKey == "" && mongoURI == "" {
		log.Println("contact: neither RESEND_API_KEY nor MONGODB_URI is set")
		http.Error(w, "Server configuration error", http.StatusInternalServerError)
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	delivered := false
	if resendKey != "" {
		if err := sendEmail(ctx, resendKey, req); err != nil {
			log.Printf("contact: email failed: %v", err)
		} else {
			delivered = true
		}
	}
	if mongoURI != "" {
		if err := save(ctx, mongoURI, req); err != nil {
			log.Printf("contact: saving failed: %v", err)
		} else {
			delivered = true
		}
	}
	if !delivered {
		http.Error(w, "Failed to send your message", http.StatusInternalServerError)
		return
	}

	log.Printf("contact: message from %s delivered", req.Email)
	writeOK(w)
}

// validate returns a message for the visitor, or "" when the request is fine.
func validate(req ContactRequest) string {
	switch {
	case req.Name == "" || req.Email == "" || req.Message == "":
		return "Missing required fields"
	case len(req.Name) > 100 || len(req.Email) > 200 || len(req.Subject) > 200 || len(req.Message) > 5000:
		return "One of the fields is too long"
	}
	if addr, err := mail.ParseAddress(req.Email); err != nil || addr.Address != req.Email {
		return "Please enter a valid email address"
	}
	return ""
}

func sendEmail(ctx context.Context, key string, req ContactRequest) error {
	to := os.Getenv("CONTACT_TO_EMAIL")
	if to == "" {
		return fmt.Errorf("CONTACT_TO_EMAIL is not set")
	}
	from := os.Getenv("CONTACT_FROM_EMAIL")
	if from == "" {
		// Resend's shared sender; it can only deliver to the address on your Resend account.
		from = "Portfolio <onboarding@resend.dev>"
	}
	subject := req.Subject
	if subject == "" {
		subject = "New message"
	}

	body, err := json.Marshal(map[string]any{
		"from":     from,
		"to":       []string{to},
		"reply_to": req.Email,
		"subject":  "Portfolio: " + subject,
		"text":     fmt.Sprintf("From: %s <%s>\n\n%s", req.Name, req.Email, req.Message),
	})
	if err != nil {
		return err
	}
	httpReq, err := http.NewRequestWithContext(ctx, http.MethodPost, resendURL, bytes.NewReader(body))
	if err != nil {
		return err
	}
	httpReq.Header.Set("Authorization", "Bearer "+key)
	httpReq.Header.Set("Content-Type", "application/json")

	res, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	if res.StatusCode >= 300 {
		// Resend explains the refusal in the body (wrong recipient, unverified domain, bad key).
		// It only goes to the server log, never to the visitor.
		detail, _ := io.ReadAll(io.LimitReader(res.Body, 500))
		return fmt.Errorf("resend answered %s: %s", res.Status, bytes.TrimSpace(detail))
	}
	return nil
}

func save(ctx context.Context, uri string, req ContactRequest) error {
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		return err
	}
	defer client.Disconnect(ctx)

	dbName := os.Getenv("MONGODB_DB_NAME")
	if dbName == "" {
		dbName = "portfolio"
	}
	collectionName := os.Getenv("MONGODB_COLLECTION")
	if collectionName == "" {
		collectionName = "contacts"
	}
	_, err = client.Database(dbName).Collection(collectionName).InsertOne(ctx, ContactSubmission{
		ContactRequest: req,
		CreatedAt:      time.Now(),
	})
	return err
}

func writeOK(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Contact form submitted successfully"})
}
