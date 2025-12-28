export interface Product {
  id: number;
  name: string;
  description: string;
  quantity: number; // stock
  price: number;
  categoryId: number;
  imageUrl?: string;
}
