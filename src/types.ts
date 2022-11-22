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
  savedRecipes: any[];
  shoppingList: UsersFoodItem[];
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

export interface Params {
  phrase: string;
  recordsPerPage: string;
  pageNumber: string;
  sorting: string;
}
