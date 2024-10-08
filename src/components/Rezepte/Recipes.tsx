import { useEffect, useState } from "react";
import supabaseClient from "../../lib/supabaseClients";
import "./Recipes.css";
import { Link } from "react-router-dom";
import { useSearchContext } from "../../Context/SearchContext"; // Importiere den Suchkontext

type Recipe = {
  id: string;
  name: string;
  description: string;
  servings: number;
  instructions: string;
  category_id: string | null;
  imageUrl: string | null;
  rating: number | null;
  created_at: Date;
};

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { searchTerm } = useSearchContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      let selectQuery = supabaseClient
        .from("recipes")
        .select("*")
        .order("rating", { ascending: false })
        .limit(3);

      if (searchTerm) {
        selectQuery = selectQuery.ilike("name", `%${searchTerm}%`);
      }

      const result = await selectQuery;

      if (result.error) {
        console.error(result.error);
        setRecipes([]);
      } else {
        setRecipes(result.data);
      }
    };

    fetchRecipes();
  }, [searchTerm]);

  return (
    <div className="recipe-container">
      <main className="recipe-list-container">
        {!recipes && <p>Loading...</p>}
        {recipes.length > 0 &&
          recipes.map((recipe) => (
            <div className="recipe-item" key={recipe.id}>
              <div className="image-container">
                <img src={recipe.imageUrl || ""} alt={recipe.name}></img>
              </div>
              <strong>{recipe.name}</strong>
              <p>{recipe.description}</p>
              <p>Bewertung: {recipe.rating}</p>
              <button className="recipe_button">
                <Link to={`/recipes/${recipe.id}`}>Zum Rezept</Link>
              </button>
            </div>
          ))}
      </main>
    </div>
  );
};

export default Recipes;
