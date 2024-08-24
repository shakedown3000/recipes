import { Tables } from "./supabase-types-gen";

export type Recipe = Tables<"recipes">;
export type Ingredients = Tables<"ingredients">;
export type Categories = Tables<"categories">;
export type Profile = Tables<"profiles">;

// Datentyp mit Recipe
// Komplexer Datentyp, zusammengesetzt
export type RecipeComplete = Recipe & {
  ingredients: Ingredients[];
  category: Categories | null;
};

// Warum hier Interface?

export interface IIngredient {
  id: string;
  recipe_id: string;
  name: string;
  quantity: number | null;
  unit: string | null;
  additionalInfo?: string | null;
  created_at: string;
}

export interface ICategory {
  id: string;
  name: string;
  created_at: string;
}
