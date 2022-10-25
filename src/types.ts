export interface FoodItem {
  id: string;
  name: string;
  expirationDays: number;
  amount: {
    qty: number;
    unit: string;
  };
  category: string;
}
