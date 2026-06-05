import api from "../../../shared/utils/api";

export const getUserMissions = async () => {
  const res = await api.get("/user-missions");
  return res.data;
};

export const getRankByXp = async () => {
  const res = await api.get(`/rank/xp`);
  return res.data;
};