package models

type Item struct {
	Category  string `json:"category" validate:"required"`
	ID        string    `json:"id" validate:"required"`
	// MongoID        int    `json:"_id"`
	Image     string `json:"image" validate:"required"`
	Name      string `json:"name" validate:"required"`
	Seller    string `json:"seller" validate:"required"`
	Price     string `json:"price" validate:"required"`
	RealPrice string `json:"realPrice" validate:"required"`
	Off       string `json:"off" validate:"required"`
	Desc      string `json:"desc" validate:"required"`
	Reviews   []struct {
		// Define the structure for reviews here
	} `json:"reviews"`
}
