import React, { createContext, useContext, useState } from "react";
import * as userService from "../services/UserSevice";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => userService.getUser());

  const login = async (email, password) => {
    try {
      const user = await userService.login(email, password);
      setUser(user);
      toast.success("Login Successful");
    } catch (error) {
      const errorMessage =
        error.response?.data || "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };

  const register = async data => {
    try {
      const user = await userService.register(data);
      setUser(user);
      toast.success("Register Successful")
    }
    catch(error) {
      toast.error(error.response.data)
    }
  }

  const logout = () => {
    userService.logout();
    setUser(null);
    toast.success("Logout successful");
  };

  const updateProfile = async user => {
    const updateUser = await userService.updateProfile(user);
    toast.success("Profile updated Successfully");
    if(updateUser) {
      setUser(updateUser);
    }
  }

  
  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
