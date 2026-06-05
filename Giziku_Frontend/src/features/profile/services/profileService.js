import api from "../../../shared/utils/api";

export const getProfiles = async () => {
  const res = await api.get("/profiles");
  return res.data.data;
};

export const getProfileById = async (id) => {
  const res = await api.get(`/profiles/${id}`);
  return res.data.data;
};

export const createProfile = async (payload) => {
  const res = await api.post("/profiles", payload);
  return res.data;
};

export const updateProfile = async (id, payload) => {
  const res = await api.put(`/profiles/${id}`, payload);
  return res.data;
};

export const deleteProfile = async (id) => {
  const res = await api.delete(`/profiles/${id}`);
  return res.data;
};