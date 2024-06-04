package controllers

import (
	"context"
	// "fmt"
	"igrosine/db"
	"igrosine/utils"

	"igrosine/models"

	// "gorest/utils"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"

	// "github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	// "github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
)

var validate = validator.New()

func GetAdmin(c *fiber.Ctx) error {
	admin := c.Locals("adminToken").(*jwt.Token)
	claims := admin.Claims.(jwt.MapClaims)
	return c.Status(200).JSON(fiber.Map{"status": 200, "message": "You are authorized", "data": claims})
}

func SignupAdmin(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	admins := db.MI.DB.Collection("admins")

	var admin models.Admin

	if err := c.BodyParser(&admin); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request",
		})
	}

	validationErr := validate.Struct(admin)

	if validationErr != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": validationErr.Error(),
		})

	}

	isExistingAdmin := admins.FindOne(ctx, bson.M{"email": admin.Email})

	if isExistingAdmin.Err() == nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Admin already exists",
		})
	}

	hashedPassword, err := utils.HashPassword(admin.Password)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Failed to hash password",
		})
	}

	admin.Password = hashedPassword

	admin.CreatedAt = time.Now()

	_, err = admins.InsertOne(ctx, admin)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Failed to create admin",
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"message": "Admin created successfully",
	})
}

func LoginAdmin(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	admins := db.MI.DB.Collection("admins")

	var admin models.Admin

	if err := c.BodyParser(&admin); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request",
		})
	}

	// validationErr := validate.Struct(admin)

	// if validationErr != nil {
	// 	return c.Status(400).JSON(fiber.Map{
	// 		"message": validationErr.Error(),
	// 	})

	// }

	var existingAdmin models.Admin

	err := admins.FindOne(ctx, bson.M{"email": admin.Email}).Decode(&existingAdmin)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid email or password",
		})
	}

	if !utils.CheckPasswordHash(admin.Password, existingAdmin.Password) {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid email or password",
		})
	}

	token, err := utils.GenerateJwt(existingAdmin)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Failed to login",
		})
	}

	cookie := new(fiber.Cookie)
	cookie.Name = "adminToken"
	cookie.Value = token
	cookie.Expires = time.Now().Add(24 * time.Hour)

	c.Cookie(cookie)

	return c.JSON(fiber.Map{
		"success": true,
		"token":   token,
		"message": "Login successful",
	})
}
