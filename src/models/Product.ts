export default interface Product {
  id: number;
  sku: string;
  title: string;
  desc?: string;
  image?: string;
  price: number;
  basePrice?: number;
  stocked?: boolean;
}
