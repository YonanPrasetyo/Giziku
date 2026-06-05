import api from "../../../shared/utils/api";

export const getFoods = async (name) => {
  const url = name ? `/foods/search?name=${encodeURIComponent(name)}` : "/foods";
  const res = await api.get(url);
  return res.data.data;
};

export const getFoodById = async (id) => {
  const res = await api.get(`/foods/${id}`);
  return res.data.data;
};

export const createFood = async (payload) => {
  const res = await api.post("/foods", payload);
  return res.data;
};

export const updateFood = async (id, payload) => {
  const res = await api.put(`/foods/${id}`, payload);
  return res.data;
};

export const importFoods = async (formData) => {
  const res = await api.post("/foods/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteFood = async (id) => {
  const res = await api.delete(`/foods/${id}`);
  return res.data;
};