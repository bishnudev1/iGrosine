package routes

import (
	"igrosine/controllers"
	middlewars "igrosine/middleware"

	"github.com/gofiber/fiber/v2"
)

func ItemRoutes(app *fiber.App) {
	app.Get("/api/get-items", controllers.GetItems)
	app.Post("/api/add-item",
	middlewars.Auth, 
	controllers.AddItem)
	app.Post("/api/delete-item",
	
	middlewars.Auth,
	
	controllers.DeleteItem)
}
