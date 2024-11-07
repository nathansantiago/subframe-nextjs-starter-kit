// models.tsx

export interface MissedIngredient {
    aisle?: string;
    amount?: number;
    id?: number;
    image?: string;
    meta?: string[];
    name?: string;
    original?: string;
    originalName?: string;
    unit?: string;
    unitLong?: string;
  }
  
  export interface UsedIngredient {
    aisle?: string;
    amount?: number;
    id?: number;
    image?: string;
    meta?: string[];
    name?: string;
    original?: string;
    originalName?: string;
    unit?: string;
    unitLong?: string;
  }
  
  export interface Recipe {
    _id?: string;
    id?: string;
    image?: string;
    imageType?: string;
    likes?: number;
    missedIngredientCount?: number;
    missedIngredients?: MissedIngredient[];
    title?: string;
    unusedIngredients?: Record<string, any>[];
    usedIngredientCount?: number;
    usedIngredients?: UsedIngredient[];
    summary?: string;
    analyzedInstructions?: Record<string, any>[];
  }
  
  export interface Recipes {
    recipes?: Recipe[];
  }
  
  export interface GetRecipesInput {
    ingredients?: Record<string, any>[];
    number?: number;
  }