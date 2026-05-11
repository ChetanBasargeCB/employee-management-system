import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState({
    name: localStorage.getItem("user") || "",
    role: localStorage.getItem("role") || "",
    email: localStorage.getItem("email") || "",
  });

  // login function
  const login = (userData) => {

    localStorage.setItem("user", userData.user.name);
    localStorage.setItem("role", userData.user.role);
    localStorage.setItem("email", userData.user.email);

    setUser({
      name: userData.user.name,
      role: userData.user.role,
      email: userData.user.email,
    });
  };

  // logout function
  const logout = () => {

    localStorage.clear();

    setUser({
      name: "",
      role: "",
      email: "",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


// exporting context to all components
export const useAuth = () => useContext(AuthContext);