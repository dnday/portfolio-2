package db

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DB struct {
    MongoDB            *mongo.Database
    ContactsCollection *mongo.Collection
    Client             *mongo.Client
}

func Connect() (*DB, error) {
    // Direct connection string to avoid env file issues
    // Replace with correct password if needed
    mongoURI := "mongodb+srv://marcel:BHt7i3.rCcbejBD@portfolio-contact.gg4qgjc.mongodb.net/?retryWrites=true&w=majority&appName=portfolio-contact"
    
    // Connect with a timeout context
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    
    // Create client options
    clientOptions := options.Client().ApplyURI(mongoURI)
    
    // Connect to MongoDB
    client, err := mongo.Connect(ctx, clientOptions)
    if err != nil {
        return nil, err
    }
    
    // Ping MongoDB to verify connection
    err = client.Ping(ctx, nil)
    if err != nil {
        return nil, err
    }
    
    log.Println("Connected to MongoDB successfully")
    
    // Set database and collection
    db := client.Database("portfolio")
    contactsCollection := db.Collection("contacts")
    
    return &DB{
        MongoDB:            db,
        ContactsCollection: contactsCollection,
        Client:             client,
    }, nil
}

// Disconnect closes MongoDB connection
func (db *DB) Disconnect(ctx context.Context) error {
    return db.Client.Disconnect(ctx)
}
