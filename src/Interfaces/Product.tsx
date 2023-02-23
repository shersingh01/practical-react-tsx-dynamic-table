export interface Product {
    id: number;
    name: string;
    price: number;
    productbrand?: { name: string };
    category?: { name: string };
    sellcounter: number;
  }