package main

import (
	"fmt"
	"igrosine/db"
	"igrosine/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()

	// Middleware to enable CORS with specific origin
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowCredentials: true,
	}))

	if app != nil {
		fmt.Println("Fiber server is running")
		db.ConnectDB()
		routes.AdminRoutes(app)
	}

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	app.Listen(":8000")
}
