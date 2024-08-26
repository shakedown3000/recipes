import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabaseClient from "../../lib/supabaseClients";
import { RecipeComplete } from "../../types/supabase-types-own";
import "./Detailpage.css";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>(); // id vom Route-Param
  const [recipe, setRecipe] = useState<RecipeComplete | null>(null);

  const fetchSingleRecipe = async () => {
    if (!id) {
      console.error("No recipe id given.");
      return;
    }
    // Immer sicherstellen, dass Antwort auch ingredients und category enthält (um Fehler zu vermeiden)
    const supabaseResponse = await supabaseClient
      .from("recipes")
      .select(
        `
      id,
      name,
      description,
      servings,
      instructions,
      category_id,
      imageUrl,
      rating,
      created_at,
      ingredients (
        id,
        recipe_id,
        name,
        quantity,
        unit,
        additionalInfo,
        created_at
      ),
      category: categories (
        id,
        name,
        created_at
      )
    `
      )
      .eq("id", id)
      .single();

    if (supabaseResponse.error) {
      console.error("Recipe not found in database");
      return;
    }

    if (supabaseResponse.data) {
      setRecipe(supabaseResponse.data);
    }
  };

  useEffect(() => {
    fetchSingleRecipe();
  }, [id]);

  if (!recipe) {
    return <p>No result</p>;
  }

  return (
    <div className="recipe-detail-container">
      <div className="image-container">
        <img
          src={recipe.imageUrl || "placeholder-image-url.jpg"}
          alt={recipe.name}
          className="recipe-image"
        />
      </div>

      <h1 className="recipe-title">{recipe.name}</h1>

      <p className="recipe-description">{recipe.description}</p>

      <p className="recipe-category">
        Kategorie: {recipe.category ? recipe.category.name : "Unbekannt"}
      </p>

      {/* Portionen */}
      <p className="recipe-servings">Portionen: {recipe.servings}</p>

      {/* Bewertung */}
      <p className="recipe-rating">
        Bewertung: {recipe.rating ? recipe.rating : "Keine Bewertung"}
      </p>

      {/* Zutatenliste */}
      <h2>Zutaten:</h2>
      <ul className="recipe-ingredients">
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.quantity} {ingredient.unit || ""} {ingredient.name}
            {ingredient.additionalInfo && ` (${ingredient.additionalInfo})`}
          </li>
        ))}
      </ul>

      <h2>Zubereitung:</h2>
      <p className="recipe-instructions">{recipe.instructions}</p>
    </div>
  );
};

export default DetailPage;
