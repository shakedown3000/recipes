import { Link } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";
import supabaseClient from "../../lib/supabaseClients";
import { Profile } from "../../types/supabase-types-own";
import { useEffect, useState } from "react";
import "./LoginStatus.css";

// Funktion zum Abrufen des Benutzerprofils
const getUserProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Fehler beim Abrufen des Benutzerprofils:", error);
    return null;
  }

  return data;
};

const LoginStatus = () => {
  const userContext = useUserContext();
  const user = userContext?.user;
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const userProfile = await getUserProfile(user.id);
        setProfile(userProfile);
      };

      fetchProfile();
    }
  }, [user]);

  const handleLogoutClicked = async (e: React.MouseEvent) => {
    e.preventDefault();

    const signoutResponse = await supabaseClient.auth.signOut();

    if (signoutResponse.error) {
      console.log("Logout error", signoutResponse.error);
    } else {
      userContext?.setUser(null);
    }
  };

  const userName = profile ? profile.first_name : user?.email;

  return (
    <div className="login-status">
      {user ? (
        <div>
          <span>Hallo </span>
          <span>
            <Link to="/profile">{userName}</Link>
          </span>
          <button className="logout-button" onClick={handleLogoutClicked}>
            Logout
          </button>
        </div>
      ) : (
        <button className="login-button">
          <Link to="/login">Login</Link>
        </button>
      )}
    </div>
  );
};

export default LoginStatus;
