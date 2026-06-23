import api from "./axios";

export const getVents = async () => {
  const response = await api.get("/vents");

  return response.data;
};