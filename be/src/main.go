package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"portfolio/src/db"
	"time"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

// ContactRequest represents the contact form data
type ContactRequest struct {
	Name    string `json:"name" bson:"name"`
	Email   string `json:"email" bson:"email"`
	Subject string `json:"subject" bson:"subject"`
	Message string `json:"message" bson:"message"`
}

// ContactSubmission extends ContactRequest with timestamp
type ContactSubmission struct {
	ContactRequest `bson:",inline"`
	CreatedAt      time.Time `bson:"created_at"`
}

var (
	database *db.DB
)

func init() {
	// Try to load .env from the current directory
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using environment variables directly")
	} else {
		log.Println("Successfully loaded .env file")
	}
}

func debugEnvFile() {
	log.Printf("Current directory: %s", getCurrentDir())
	
	// Check if .env exists in common locations
	locations := []string{".", "..", filepath.Join("..", "..")}
	for _, loc := range locations {
		path := filepath.Join(loc, ".env")
		if _, err := os.Stat(path); err == nil {
			log.Printf(".env file found at: %s", path)
		} else {
			log.Printf(".env file not found at: %s", path)
		}
	}
}

func main() {
	debugEnvFile()

	// Add near the start of main()
	log.Printf("MONGODB_URI: %s", maskSecret(os.Getenv("MONGODB_URI")))
	log.Printf("MONGODB_DB_NAME: %s", os.Getenv("MONGODB_DB_NAME"))
	log.Printf("MONGODB_COLLECTION: %s", os.Getenv("MONGODB_COLLECTION"))

	// Connect to MongoDB using the DB package
	var err error
	database, err = db.Connect()
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}

	// Close the connection when the application exits
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	defer database.Disconnect(ctx)

	// Define port with fallback
	port := os.Getenv("PORT")
	if port == "" {
		port = "8081" // Using 8081 since 8080 is in use
	}

	router := mux.NewRouter()

	// API routes
	router.HandleFunc("/api/v1/contact", handleContact).Methods("POST", "OPTIONS")

	// Setup CORS
	c := cors.New(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:5173", // Vite's default port
			"http://localhost:3000", // Create React App default port
			"http://localhost",      // For production
			"http://localhost:80",
			"http://127.0.0.1:5173",
		},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	// Wrap router with CORS middleware
	handler := c.Handler(router)

	// Start server
	log.Printf("Server starting on port %s...", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

func getCurrentDir() string {
	dir, err := os.Getwd()
	if err != nil {
		return "unknown"
	}
	return dir
}

func handleContact(w http.ResponseWriter, r *http.Request) {
	// For preflight OPTIONS requests
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Parse the request body
	var contactReq ContactRequest
	err := json.NewDecoder(r.Body).Decode(&contactReq)
	if err != nil {
		http.Error(w, "Invalid request format", http.StatusBadRequest)
		return
	}

	// Validate the request
	if contactReq.Name == "" || contactReq.Email == "" || contactReq.Message == "" {
		http.Error(w, "Missing required fields", http.StatusBadRequest)
		return
	}

	// Create contact submission with timestamp
	submission := ContactSubmission{
		ContactRequest: contactReq,
		CreatedAt:      time.Now(),
	}

	// Save to MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err = database.ContactsCollection.InsertOne(ctx, submission)
	if err != nil {
		log.Printf("Failed to save contact to MongoDB: %v", err)
		http.Error(w, "Failed to save your message", http.StatusInternalServerError)
		return
	}

	log.Printf("Contact form from %s saved to MongoDB", contactReq.Email)

	// Send success response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Contact form submitted successfully"})
}

// Add this helper function
func maskSecret(secret string) string {
	if len(secret) <= 10 {
		return "[empty or too short]"
	}
	return secret[:5] + "..." + secret[len(secret)-5:]
}