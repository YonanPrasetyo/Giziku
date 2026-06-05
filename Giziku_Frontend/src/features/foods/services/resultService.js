import api from "../../../shared/utils/api";

export const getResultById = async (id, token) => {
  const res = await api.get(`/results/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const createResultByFoodName = async (payload) => {
  const res = await api.post("/results/direct", payload);
  return res.data.data;
};

export const getNutritionStandard = async (age, gender, token) => {
  const res = await api.get(
    `/nutrition-standards/age/${age}/gender/${gender}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.data;
};