export interface Product {
  id: string;
  name: string;
  category: 'Skincare' | 'Makeup' | 'Haircare' | 'Fragrance';
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  benefits: string[];
  ingredients: string;
  howToUse: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  shippingMethod: string;
  paymentMethod: string;
}

export interface BusinessMetric {
  metric: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  description: string;
}
