import api from "./axios";

export const getVents = async () => {
  const response = await api.get("/vents");

  return response.data;
};

export const createVent = async (ventData) =>{
    const response = await api.post("/vents",ventData);

    return response.data;
};