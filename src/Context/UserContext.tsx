import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import supabaseClient from "../lib/supabaseClients";

interface IUserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

export const UserContext = createContext<IUserContext | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // Verhindert dass beim neuladen der seite der state verloren geht
  const [loading, setLoading] = useState<boolean>(true);

  // wird genau einmal beim Neuladen der Seite aufgerufen
  useEffect(() => {
    const fetchSession = async () => {
      // supabase holt sich aktuelle session
      const sessionResponse = await supabaseClient.auth.getSession();
      if (sessionResponse.error) {
        return;
      }
      // bei aktuell gültiger Session:
      if (sessionResponse.data.session) {
        setUser(sessionResponse.data.session.user);
      }
    };
    fetchSession();
  }, []);

  // ? ich reiche hier über value={{ user, setUser }} die Werte aus meinem State im UserProvider
  // ? durch an den UserContext.Provider

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Benutzerdefinierter Hook für den Zugriff auf den UserContext
// Noch einmal erklären lassen
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
