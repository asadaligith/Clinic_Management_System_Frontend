import { createContext, useState } from "react";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

 const updateUser = (data) => {
  // Ensure doctors have `id` set to MongoDB _id
  if (data.role === "doctor" && !data.id && data._id) {
    data.id = data._id;
  }

  setUser(data);
  localStorage.setItem("user", JSON.stringify(data));
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <userContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
