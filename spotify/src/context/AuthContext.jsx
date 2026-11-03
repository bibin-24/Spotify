
import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("spotify_clone_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem("spotify_clone_user", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("spotify_clone_user");
      }
    } catch {
      
    }
  }, [currentUser]);

  const login = (email) => {
    const user = {
      name: email.split("@")[0] || "Spotify User",
      email: email,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    };
    setCurrentUser(user);
    return user;
  };

  const signup = (email) => {
    return login(email);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
