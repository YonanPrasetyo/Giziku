import api from "../../../shared/utils/api";

export const getRanks = async () => {
  const res = await api.get("/ranks");
  return res.data.data;
};

export const getRankById = async (id) => {
  const res = await api.get(`/ranks/${id}`);
  return res.data.data;
};

export const createRank = async (formData) => {
  const res = await api.post("/ranks", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateRank = async (id, formData) => {
  const res = await api.put(`/ranks/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteRank = async (id) => {
  const res = await api.delete(`/ranks/${id}`);
  return res.data;
};