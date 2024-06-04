package controllers

import (
	"context"
	"fmt"
	"igrosine/db"
	// "igrosine/utils"

	"igrosine/models"

	// "gorest/utils"
	// "time"

	// "github.com/go-playground/validator/v10"
	// "github.com/golang-jwt/jwt/v5"

	// "github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	// "github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// var validate = validator.New()


func GetItems(c *fiber.Ctx) error {
	// Fetch all items from the database
	cursor, err := db.MI.DB.Collection("items").Find(context.Background(), bson.M{})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"message": "Failed to fetch items",
		})
	}
	defer cursor.Close(context.Background())

	var items []map[string]interface{} // Define a slice of maps to store items

	// Decode BSON documents into slice of maps
	for cursor.Next(context.Background()) {
		var item map[string]interface{}
		if err := cursor.Decode(&item); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"success": false,
				"message": "Failed to decode items",
			})
		}
		items = append(items, item)
	}

	if err := cursor.Err(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"message": "Failed to iterate over items",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"count":   len(items),
		"items":   items,
	})
}


func DeleteItem(c *fiber.Ctx) error {
	// Parse request body
	var reqBody struct {
		ID string `json:"_id"`
	}
	if err := c.BodyParser(&reqBody); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"message": "Invalid request body",
		})
	}

	// Convert ID string to ObjectID
	id, err := primitive.ObjectIDFromHex(reqBody.ID)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"message": "Invalid item ID",
		})
	}

	// Find the item by ID and delete it
	filter := bson.M{"_id": id}
	result, err := db.MI.DB.Collection("items").DeleteOne(context.Background(), filter)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"message": "Failed to delete item",
		})
	}

	if result.DeletedCount == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"success": false,
			"message": "Item not found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"message": "Item deleted successfully",
	})

}


func AddItem(c *fiber.Ctx) error {
    // Parse request body
    var item models.Item
    if err := c.BodyParser(&item); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "success": false,
            "message": err,
        })
    }

    // Initialize Reviews as an empty array
    item.Reviews = []struct{}{}

    fmt.Println(item)

    // Validate if all required fields are provided
    if item.ID == "" || item.Category == "" || item.Image == "" || item.Name == "" || item.Seller == "" || item.Price == "" || item.RealPrice == "" || item.Off == "" || item.Desc == "" {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "success": false,
            "message": "All fields are required",
        })
    }

    // Check if item with the same ID already exists
    filter := bson.M{"id": item.ID}
    count, err := db.MI.DB.Collection("items").CountDocuments(context.Background(), filter)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "success": false,
            "message": "Failed to check existing item",
        })
    }
    if count > 0 {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "success": false,
            "message": "Item with the same ID already exists",
        })
    }

    // Insert the new item into the database
    if _, err := db.MI.DB.Collection("items").InsertOne(context.Background(), item); err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "success": false,
            "message": "Failed to add item",
        })
    }

    return c.Status(fiber.StatusCreated).JSON(fiber.Map{
        "success": true,
        "message": "Item added successfully",
        "item":    item,
    })
}
