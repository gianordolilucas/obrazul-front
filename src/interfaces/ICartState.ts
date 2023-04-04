export interface ICartState {
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }[];
}