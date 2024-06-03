package utils

import (
	"igrosine/models"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateJwt(admin models.Admin) (string, error) {

	claims := jwt.MapClaims{
		"email":     admin.Email,
		"name":      admin.Name,
		"password":  admin.Password,
		"createdAt": admin.CreatedAt,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte("process.env.JWT_SECRET"))

	if err != nil {
		return "", err
	}

	return tokenString, nil
}
