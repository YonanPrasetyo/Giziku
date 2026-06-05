import ResultRepositories from '../repositories/result-repositories.js';
import FoodRepository from '../../food/repositories/food-repositories.js';
import UserMissionRepositories from '../../user-missions/repositories/user-mission-repositories.js';
import ProfileRepositories from '../../profiles/repositories/profile-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export const createResult = async (req, res, next) => {
  const { profileId } = req.validated;
  if (!req.file) {
    return next(new InvariantError('Image hasil harus diunggah'));
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  try {
    const rawAiEndpoint = process.env.AI_ENDPOINT_URL;
    if (!rawAiEndpoint) {
      return next(new InvariantError('Konfigurasi AI_ENDPOINT_URL belum tersedia'));
    }

    const aiEndpoint = rawAiEndpoint.replace(/\/+$/, '');

    const formData = new FormData();
    formData.append('file', fs.createReadStream(req.file.path));

    const aiResponse = await axios.post(aiEndpoint, formData, {
      headers: {
        ...formData.getHeaders(),
      },
      timeout: 10000,
    });

    if (!aiResponse.data || !aiResponse.data.success) {
      return next(new InvariantError('Gagal memproses gambar pada server AI'));
    }
    const foodName = aiResponse.data.class;

    const foods = await FoodRepository.getFoodByName(foodName);
    const food = foods[0];
    if (!food) {
      return next(new NotFoundError(`Makanan '${foodName}' hasil deteksi AI tidak ditemukan di database kami`));
    }

    const { id: foodId, name, calories, protein, sugar, carbohydrates, fat } = food;
    const date = new Date();

    const matchedMissions = await UserMissionRepositories.getPendingMissionsByProfileIdAndFoodId(profileId, foodId);
    if (matchedMissions.length > 0) {
      const profile = await ProfileRepositories.getProfileById(profileId);

      for (const mission of matchedMissions) {
        await UserMissionRepositories.completeMission(mission.id);
        await UserMissionRepositories.submitMissionProof(mission.id, imageUrl, 'approved');

        if (profile && profile.user_id) {
          await UserMissionRepositories.awardXp(profile.user_id, mission.xp);
        }
      }
    }

    const result = await ResultRepositories.createResult({
      profileId,
      imageUrl,
      date,
      name,
      calories,
      protein,
      sugar,
      carbohydrates,
      fat
    });

    if (!result) return next(new InvariantError('Result gagal ditambahkan'));

    const completedMissions = matchedMissions.map((mission) => ({
      userMissionId: mission.id,
      xp: mission.xp,
      description: mission.description,
      status: 'approved',
    }));

    const message = matchedMissions.length > 0
      ? 'Result berhasil ditambahkan berdasarkan deteksi AI dan misi terkait disetujui'
      : 'Result berhasil ditambahkan berdasarkan deteksi AI';

    return response(res, 201, message, {
      result,
      completedMissions,
    });

  } catch (error) {
    console.error('AI Server Error: ', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      code: error.code,
    });

    if (error.response?.status === 405) {
      return next(new InvariantError('Koneksi ke server AI gagal: metode POST tidak diterima oleh endpoint AI. Periksa AI_ENDPOINT_URL dan jenis request yang diharapkan server AI.'));
    }

    if (error.code === 'ECONNREFUSED') {
      return next(new InvariantError('Koneksi ke server AI gagal: server tidak dapat dijangkau. Periksa AI_ENDPOINT_URL dan status server AI.'));
    }

    if (error.code === 'ETIMEDOUT') {
      return next(new InvariantError('Koneksi ke server AI gagal: permintaan timeout. Coba lagi nanti.'));
    }

    return next(new InvariantError(`Koneksi ke server AI gagal: ${error.message}`));
  }
};

export const createResultByFoodName = async (req, res, next) => {
  const { profileId, foodName } = req.validated;
  const imageUrl = '-';

  try {
    const foods = await FoodRepository.getFoodByName(foodName);
    const food = foods[0];
    if (!food) {
      return next(new NotFoundError(`Makanan '${foodName}' tidak ditemukan di database kami`));
    }

    const { name, calories, protein, sugar, carbohydrates, fat } = food;
    const date = new Date();

    const result = await ResultRepositories.createResult({
      profileId,
      imageUrl,
      date,
      name,
      calories,
      protein,
      sugar,
      carbohydrates,
      fat,
    });

    if (!result) return next(new InvariantError('Result gagal ditambahkan'));

    return response(res, 201, 'Result berhasil ditambahkan berdasarkan nama makanan', result);
  } catch (error) {
    next(error);
  }
};

export const getResultsByProfileId = async (req, res) => {
  const { profileId } = req.params;
  const results = await ResultRepositories.getAllResults(profileId);
  return response(res, 200, 'Results berhasil ditampilkan', results);
};

export const getThreeLatestResultsByProfileId = async (req, res) => {
  const { profileId } = req.params;
  const results = await ResultRepositories.getThreeLatestResultsByProfileId(profileId);
  return response(res, 200, 'Results berhasil ditampilkan', results);
};

export const getTotalNutritionTodayByProfileId = async (req, res) => {
  const { profileId } = req.params;
  const totalNutrition = await ResultRepositories.getTotalNutritionTodayByProfileId(profileId);
  return response(res, 200, 'Total nutrisi hari ini berhasil ditampilkan', totalNutrition);
};

export const getResultById = async (req, res, next) => {
  const { id } = req.params;
  const result = await ResultRepositories.getResultById(id);

  if (!result) return next(new NotFoundError('Result tidak ditemukan'));

  const dateOfBirth = new Date(result.date_of_birth);
  const resultDate = new Date(result.date);
  const age = resultDate.getFullYear() - dateOfBirth.getFullYear();
  result.age = age;

  return response(res, 200, 'Result berhasil ditampilkan', result);
};

export const getAllResults = async (req, res) => {
  const { profileId } = req.params;
  const results = await ResultRepositories.getAllResults(profileId);
  return response(res, 200, 'Results berhasil ditampilkan', results);
};