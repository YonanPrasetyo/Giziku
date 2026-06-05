import NutritionStandardRepositories from '../repositories/nutrition-standart-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const createNutritionStandard = async (req, res, next) => {
  const { ageMin, ageMax, gender, calories, protein, sugar } = req.validated;

  const nutritionStandard = await NutritionStandardRepositories.createNutritionStandard({ ageMin, ageMax, gender, calories, protein, sugar });

  if (!nutritionStandard) return next(new InvariantError('Standar gizi gagal ditambahkan'));

  return response(res, 201, 'Standar gizi berhasil ditambahkan', nutritionStandard);
};

export const getNutritionStandards = async (req, res) => {
  const nutritionStandards = await NutritionStandardRepositories.getAllNutritionStandards();
  return response(res, 200, 'Standar gizi berhasil ditampilkan', nutritionStandards);
};

export const getNutritionStandardById = async (req, res, next) => {
  const { id } = req.params;
  const nutritionStandard = await NutritionStandardRepositories.getNutritionStandardById(id);

  if (!nutritionStandard) return next(new NotFoundError('Standar gizi tidak ditemukan'));

  return response(res, 200, 'Standar gizi berhasil ditampilkan', nutritionStandard);
};

export const getNutritionStandardByAgeAndGender = async (req, res, next) => {
  const { age, gender } = req.params;
  const nutritionStandard = await NutritionStandardRepositories.getNutritionStandardByAgeAndGender(age, gender);

  if (!nutritionStandard) return next(new NotFoundError('Standar gizi tidak ditemukan'));

  return response(res, 200, 'Standar gizi berhasil ditampilkan', nutritionStandard);
};

export const updateNutritionStandardById = async (req, res, next) => {
  const { id } = req.params;
  const { ageMin, ageMax, gender, calories, protein, sugar } = req.validated;

  const nutritionStandard = await NutritionStandardRepositories.updateNutritionStandardById(id, { ageMin, ageMax, gender, calories, protein, sugar });

  if (!nutritionStandard) return next(new NotFoundError('Standar gizi tidak ditemukan'));

  return response(res, 200, 'Standar gizi berhasil diperbarui', nutritionStandard);
};

export const deleteNutritionStandardById = async (req, res, next) => {
  const { id } = req.params;
  const nutritionStandard = await NutritionStandardRepositories.deleteNutritionStandardById(id);

  if (!nutritionStandard) return next(new NotFoundError('Standar gizi tidak ditemukan'));

  return response(res, 200, 'Standar gizi berhasil dihapus', nutritionStandard);
};