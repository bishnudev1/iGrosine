package models

import (
	"time"
)

type Admin struct {
	Name      string    `json:"name" bson:"name" validate:"required"`
	Email     string    `json:"email" bson:"email" validate:"required"`
	Password  string    `json:"password" bson:"password" validate:"required"`
	CreatedAt time.Time `json:"createdAt" bson:"createdAt"`
}
