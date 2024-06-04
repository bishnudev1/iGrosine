package db

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	//"go.mongodb.org/mongo-driver/mongo/readpref"
)

type MONGO struct {
	Client *mongo.Client
	DB     *mongo.Database
}

var MI MONGO

func ConnectDB() {

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb+srv://bishnudevkhutia26:YQVvPVm9FhptRfGn@igrosine.zru5dui.mongodb.net/igrosine"))
	if err != nil {
		log.Fatal(err)
	}

	//ping the database
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB successfully!")

	MI = MONGO{
		Client: client,
		DB:     client.Database("igrosine"),
	}
	fmt.Println("MI", MI)
}
