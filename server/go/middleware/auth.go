package middlewars

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func Auth(c *fiber.Ctx) error {
	cookies := c.Cookies("adminToken")

	if cookies == "" {
		return c.Status(401).JSON(fiber.Map{"status": 401, "message": "You are not signed in"})
	} else {
		token, err := jwt.Parse(cookies, func(token *jwt.Token) (interface{}, error) {
			c.Locals("adminToken", token)
			return []byte("process.env.JWT_SECRET"), nil
		})

		if !token.Valid {
			return c.Status(401).JSON(fiber.Map{"status": 401, "message": "Token has expired or not valid"})
		}

		if err != nil {
			return c.Status(401).JSON(fiber.Map{"status": 401, "message": "You are not authorized"})
		}
		return c.Next()
	}
}
