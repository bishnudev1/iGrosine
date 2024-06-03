package routes

import (
	"igrosine/controllers"
	middlewars "igrosine/middleware"

	"github.com/gofiber/fiber/v2"
)

func AdminRoutes(app *fiber.App) {
	app.Post("/api/admin-signup", controllers.SignupAdmin)
	app.Post("/api/admin-login", controllers.LoginAdmin)
	app.Get("/api/admin-me", middlewars.Auth, controllers.GetAdmin)
}
