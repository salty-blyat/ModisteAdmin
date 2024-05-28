


export interface ProductProps {
    id: number;
    name: string;
    description: string;
    price: number;
    category_name: string;
    image_url: string[]; // Array of image URLs
    inStock: number;
    num_purchases: number;
    created_at: string; // Date string in ISO format
    discount?: number | null; // Optional discount value 
  }