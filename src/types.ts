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

export interface IngredientsObject {
  Text: string;
  IngredientId: number;
  Quantity: number;
  MinQuantity: number;
  QuantityFraction: string;
  Unit: string;
  Ingredient: string;
}
export interface IngredientGroup {
  portions: number;
  Ingredients: IngredientsObject[];
}

export interface Recipe {
  Id: number;
  ImageId: number;
  ImageUrl: string;
  Title: string;
  PreambleHTML: string;
  Difficulty: string;
  CookingTime: string;
  CookingTimeAbbreviated: string;
  CookingTimeMinutes: number;
  CommentCount: number;
  AverageRating: string;
  IngredientCount: number;
  OfferCount: number;
  IsGoodClimateChoice: boolean;
  IsKeyHole: boolean;
  NumberOfUserRatings: string;
  IngredientGroups: IngredientGroup[];
}
