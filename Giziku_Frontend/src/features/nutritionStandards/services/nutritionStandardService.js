import api from "../../../shared/utils/api";

export const getNutritionStandards = async () => {
  const res = await api.get("/nutrition-standards");
  return res.data.data;
};

export const getNutritionStandardById = async (id) => {
  const res = await api.get(`/nutrition-standards/${id}`);
  return res.data.data;
};

export const createNutritionStandard = async (payload) => {
  const res = await api.post("/nutrition-standards", payload);
  return res.data;
};

export const updateNutritionStandard = async (id, payload) => {
  const res = await api.put(`/nutrition-standards/${id}`, payload);
  return res.data;
};

export const deleteNutritionStandard = async (id) => {
  const res = await api.delete(`/nutrition-standards/${id}`);
  return res.data;
};