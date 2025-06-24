import apiClient from "../index";
import axios from "axios";

export const login = async (userData) => {
  const loginresponse = await apiClient.post("/user/login", userData);
  return loginresponse;
};
