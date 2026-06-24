import api from "./axios";

export const createComment = async (commentData) => {
  const response = await api.post(
    "/comments",
    commentData
  );

  return response.data;
};