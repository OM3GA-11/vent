import api from "./axios";

export const getVents = async (emotion) => {
  const response = await api.get("/vents", {
    params: emotion ? { emotion } : {},
  });

  return response.data;
};

export const createVent = async (ventData) =>{
    const response = await api.post("/vents",ventData);

    return response.data;
};

export const getVentById = async (id) => {
  const response = await api.get(`/vents/${id}`);

  return response.data;
};