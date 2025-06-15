// src/hooks/useAuthContext.js
import { useContext } from "react";
import { AuthContext } from "./AuthProvider.jsx";

export const useAuthContext = () => useContext(AuthContext);
