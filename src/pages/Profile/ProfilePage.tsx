import { useEffect, useState } from "react";
import supabaseClient from "../../lib/supabaseClients";
import { useUserContext } from "../../Context/UserContext";
import { Profile } from "../../types/supabase-types-own";
import "./ProfilePage.css";

const ProfilePage = () => {
  const userContext = useUserContext();
  const user = userContext?.user;
  const [profile, setProfile] = useState<Profile>();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);

  const DUMMY_IMAGE_URL = "/public/dummy_image.png";

  if (!user) {
    return (
      <div className="not-logged-in">
        Du bist nicht eingeloggt. Bitte logge dich ein.
      </div>
    );
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
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
        setAvatarUrl(profileResponse.data.avatar_url || null);
        if (profileResponse.data.avatar_url) {
          setImageUploaded(true); // beim Laden Info, dass es ein Bild schon gibt
        }
      }
    };
    fetchUserProfile();
  }, []);

  const handleUpload = async () => {
    if (!avatarFile) {
      return;
    }
    setUploading(true);
    const fileName = `${user.id}_${avatarFile.name}`;

    const uploadAvatarResponse = await supabaseClient.storage
      .from("avatar")
      .upload(fileName, avatarFile, { upsert: true });

    if (uploadAvatarResponse.error) {
      console.error(
        "Fehler beim Hochladen des Avatars",
        uploadAvatarResponse.error
      );
      setUploading(false);
      return;
    }

    const publicUrlForAvatarResponse = await supabaseClient.storage
      .from("avatar")
      .getPublicUrl(fileName);

    if (!publicUrlForAvatarResponse.data) {
      console.log("Fehler beim Abrufen der öffentlichen URL");
      setUploading(false);
      return;
    }

    const updateProfilesResponse = await supabaseClient
      .from("profiles")
      .update({ avatar_url: publicUrlForAvatarResponse.data.publicUrl }) // select("avatar_url")
      .eq("id", user.id);

    setUploading(false);
    if (updateProfilesResponse.error) {
      console.error(
        "Fehler beim Setzen der avatar_url",
        updateProfilesResponse.error.message
      );
      return;
    } else {
      setAvatarUrl(publicUrlForAvatarResponse.data.publicUrl);
      setImageUploaded(true);
    }
  };

  const handleDelete = async () => {
    if (!avatarUrl) {
      return;
    }

    const fileName = avatarUrl.split("/").pop();

    if (!fileName) {
      return;
    }
    const deleteAvatarResponse = await supabaseClient.storage
      .from("avatar")
      .remove([fileName]);

    if (deleteAvatarResponse.error) {
      console.error(
        "Fehler beim Löschen des Avatars",
        deleteAvatarResponse.error.message
      );
      return;
    }

    const updateProfilesResponse = await supabaseClient
      .from("profiles")
      .update({ avatar_url: null })
      .eq("id", user.id);

    if (updateProfilesResponse.error) {
      console.error(
        "Fehler beim Entfernen der avatar_url",
        updateProfilesResponse.error.message
      );
      return;
    } else {
      setAvatarUrl(null);
      setImageUploaded(false);
    }
  };

  return (
    <section className="profile_wrapper">
      <div className="profile-page">
        <img
          src={avatarUrl || DUMMY_IMAGE_URL}
          alt="avatar"
          className="avatar-image"
        />

        <table className="profile-table">
          <tbody>
            <tr>
              <td>
                <strong>E-Mail:</strong>
              </td>
              <td>{user ? user.email : ""}</td>
            </tr>
            <tr>
              <td>
                <strong>Vorname:</strong>
              </td>
              <td>{profile?.first_name}</td>
            </tr>
            <tr>
              <td>
                <strong>Nachname:</strong>
              </td>
              <td>{profile?.last_name}</td>
            </tr>
            <tr>
              <td>
                <strong>Sign up at:</strong>
              </td>
              <td>{new Date(user.created_at).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        {!imageUploaded && ( // Upload-Container nur anzeigen, wenn kein Bild hochgeladen wurde
          <div className="upload-container">
            <label className="label">Upload profile picture:</label>
            <input
              type="file"
              className="input"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  setAvatarFile(e.target.files[0]);
                }
              }}
            />
            <button onClick={handleUpload} disabled={uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        )}

        {imageUploaded && ( //  nur anzeigen, wenn ein Bild hochgeladen wurde
          <button onClick={handleDelete} className="delete-button">
            Delete Profile Picture
          </button>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
