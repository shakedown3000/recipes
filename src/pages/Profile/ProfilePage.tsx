import { useEffect, useState } from "react";
import supabaseClient from "../../lib/supabaseClients";
import { useUserContext } from "../../Context/UserContext";
import { Profile } from "../../types/supabase-types-own";

const ProfilePage = () => {
  const userContext = useUserContext();
  const user = userContext?.user;
  const [profile, setProfile] = useState<Profile>();

  if (!user) {
    return;
  }

  console.log("User", user);

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log("fetch called");
      // ? wir fragen die Tabelle profiles ab mit allen Spalten und vergleichen, dass die id gleich
      // ? unserer user.id ist -> user kommt von oben aus dem globalen Kontext
      const profileResponse = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileResponse.error) {
        console.log("Error getting profile", profileResponse.error.message);
      }
      if (profileResponse.data) {
        setProfile(profileResponse.data);
      }
    };
    fetchUserProfile();
  }, [user]);

  return (
    <div className="profile-page">
      <p>
        <strong>E-Mail</strong>
        {user ? user.email : ""}
      </p>
      <p>
        <strong>Vorname</strong>
        {profile?.first_name}
      </p>
      <p>
        <strong>Nachname</strong>
        {profile?.last_name}
      </p>
      <p>
        <strong>Sign up at:</strong>
        {new Date(user.created_at).toLocaleString()}
      </p>
    </div>
  );
};

export default ProfilePage;
