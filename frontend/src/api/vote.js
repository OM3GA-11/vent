import api from "./axios";

export const voteVent = async (voteData) => {
  const response = await api.post("/votes", voteData);

  return response.data;
};