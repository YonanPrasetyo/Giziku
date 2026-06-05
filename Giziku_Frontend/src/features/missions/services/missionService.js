import api from "../../../shared/utils/api";


export const getUserMissions = async () => {
  const res = await api.get("/user-missions");
  return res.data;
};

export const getRankByXp = async () => {
  const res = await api.get("/rank/xp");
  return res.data?.data || null;
};


export const getMissions = async () => {
  const res = await api.get("/missions");
  return res.data;
};

export const getMissionById = async (id) => {
  const res = await api.get(`/missions/${id}`);
  return res.data;
};

export const createMission = async (payload) => {
  const res = await api.post("/missions", payload);
  return res.data;
};

export const updateMission = async (id, payload) => {
  const res = await api.put(`/missions/${id}`, payload);
  return res.data;
};

export const deleteMission = async (id) => {
  const res = await api.delete(`/missions/${id}`);
  return res.data;
};