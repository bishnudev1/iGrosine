package models

type Item struct {
	Category  string `json:"category" validate:"required"`
	ID        string    `json:"id" validate:"required"`
	Image     string `json:"image" validate:"required"`
	Name      string `json:"name" validate:"required"`
	Seller    string `json:"seller" validate:"required"`
	Price     string `json:"price" validate:"required"`
	RealPrice string `json:"realPrice" bson:"realPrice" validate:"required"` //
	Off       string `json:"off" validate:"required"`
	Desc      string `json:"desc" validate:"required"`
	Reviews   []struct{} `json:"reviews"` // Initialize as empty slice
}
