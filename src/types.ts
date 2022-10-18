export interface FoodItem {
  id: number;
  name: string;
  exp: number;
  qty: {
    no: number;
    unit: string;
  };
  category: string;
}
