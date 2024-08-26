import { useEffect, useState } from "react";
import "./AllRecipes.css";
import supabaseClient from "../../lib/supabaseClients";
import { Link } from "react-router-dom";

type Recipe = {
  id: string;
  name: string;
  description: string;
  servings: number;
  instructions: string;
  category_id: string | null;
  imageUrl: string | null;
  rating: number | null;
  created_at: string;
};

const AllRecipes = () => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      const { data, error } = await supabaseClient.from("recipes").select("*");

      if (error) {
        console.error(error);
      } else {
        setAllRecipes(data || []);
      }
      setLoading(false); // Set loading to false after fetching
    };
    fetchAllRecipes();
  }, []);

  return (
    <section className="allRecipes">
      <h2>Browse all recipes</h2>

      <div className="recipe-list-container">
        {loading && <p>Loading...</p>}
        {!loading && allRecipes.length === 0 && <p>No recipes available</p>}
        {!loading &&
          allRecipes.length > 0 &&
          allRecipes.map((recipe) => (
            <div className="recipe-item" key={recipe.id}>
              {recipe.imageUrl && (
                <div className="image-container">
                  <img src={recipe.imageUrl} alt={recipe.name}></img>
                </div>
              )}
              <strong>{recipe.name}</strong>
              <p>{recipe.description}</p>
              <p>Bewertung: {recipe.rating}</p>
              <button className="recipe_button">
                <Link to={`/recipes/${recipe.id}`}>Zum Rezept</Link>
              </button>
            </div>
          ))}
      </div>
    </section>
  );
};

export default AllRecipes;
