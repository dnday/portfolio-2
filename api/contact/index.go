package handler

import (
    "context"
    "encoding/json"
    "log"
    "net/http"
    "os"
    "time"

    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
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

// Handler is the serverless function entry point for Vercel
func Handler(w http.ResponseWriter, r *http.Request) {
    // Set CORS headers
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

    // Handle preflight OPTIONS requests
    if r.Method == "OPTIONS" {
        w.WriteHeader(http.StatusOK)
        return
    }

    // Only accept POST method
    if r.Method != "POST" {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
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

    // Get MongoDB connection string
    mongoURI := os.Getenv("MONGODB_URI")
    if mongoURI == "" {
        log.Println("MongoDB URI not set")
        http.Error(w, "Server configuration error", http.StatusInternalServerError)
        return
    }

    // Connect to MongoDB
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    
    clientOptions := options.Client().ApplyURI(mongoURI)
    client, err := mongo.Connect(ctx, clientOptions)
    if err != nil {
        log.Printf("MongoDB connection error: %v", err)
        http.Error(w, "Database connection error", http.StatusInternalServerError)
        return
    }
    defer client.Disconnect(ctx)

    // Verify connection
    err = client.Ping(ctx, nil)
    if err != nil {
        log.Printf("MongoDB ping failed: %v", err)
        http.Error(w, "Database connection error", http.StatusInternalServerError)
        return
    }

    // Create contact submission with timestamp
    submission := ContactSubmission{
        ContactRequest: contactReq,
        CreatedAt:      time.Now(),
    }

    // Get database and collection names
    dbName := os.Getenv("MONGODB_DB_NAME")
    if dbName == "" {
        dbName = "portfolio"
    }
    
    collectionName := os.Getenv("MONGODB_COLLECTION")
    if collectionName == "" {
        collectionName = "contacts"
    }

    // Save to MongoDB
    collection := client.Database(dbName).Collection(collectionName)
    _, err = collection.InsertOne(ctx, submission)
    if err != nil {
        log.Printf("Failed to save contact: %v", err)
        http.Error(w, "Failed to save your message", http.StatusInternalServerError)
        return
    }

    log.Printf("Contact form from %s saved to MongoDB", contactReq.Email)

    // Send success response
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]string{"message": "Contact form submitted successfully"})
}