"use client";

import React, { createContext, useContext, useState } from "react";
import api from "../utils/api";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

const UserContext = createContext({});
const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const { toast }: any = useToast();

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log(loading);
      const { data } = await api.post("/users/login", { email, password });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.error("Login Error:", error);
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "يرجى التحقق من بيانات الدخول والمحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const { data } = await api.post("/users/logout");
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUserContext };
