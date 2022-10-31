import { Timestamp } from 'firebase/firestore';

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
export interface UsersFoodItem {
  id: string;
  name: string;
  expirationDays: number;
  amount: {
    qty: number;
    unit: string;
  };
  category: string;
  addedAt: Date;
  expirationDate: Date;
  daysLeft?: number;
}

export interface UsersFridge {
  fridgeId: string;
  foods: UsersFoodItem[];
}
