import { useEffect, useState } from "react";
import "./AllRecipes.css";
import supabaseClient from "../../lib/supabaseClients";
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
  created_at: string;
};

const AllRecipes = () => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { searchTerm } = useSearchContext(); // Verwende den Suchkontext

  useEffect(() => {
    const fetchAllRecipes = async () => {
      let selectQuery = supabaseClient.from("recipes").select("*");

      if (searchTerm) {
        selectQuery = selectQuery.ilike("name", `%${searchTerm}%`);
      }

      const { data, error } = await selectQuery;

      if (error) {
        console.error(error);
      } else {
        setAllRecipes(data || []);
      }
      setLoading(false);
    };
    fetchAllRecipes();
  }, [searchTerm]);

  return (
    <section className="allRecipes">
      <h1>Alle Rezepte</h1>

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
