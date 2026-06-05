import MissionRepositories from '../repositories/mission-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const createMission = async (req, res, next) => {
  const foodId = req.validated.food_id;
  const { description, xp } = req.validated;

  const mission = await MissionRepositories.createMission({ foodId, description, xp });

  if (!mission) return next(new InvariantError('Mission gagal ditambahkan'));

  return response(res, 201, 'Mission berhasil ditambahkan', mission);
};

export const getMissions = async (req, res) => {
  const missions = await MissionRepositories.getAllMissions();
  return response(res, 200, 'Missions berhasil ditampilkan', missions);
};

export const getMissionById = async (req, res, next) => {
  const { id } = req.params;
  const mission = await MissionRepositories.getMissionById(id);

  if (!mission) return next(new NotFoundError('Mission tidak ditemukan'));

  return response(res, 200, 'Mission berhasil ditampilkan', mission);
};

export const updateMissionById = async (req, res, next) => {
  const { id } = req.params;
  const foodId = req.validated.food_id;
  const { description, xp } = req.validated;

  const mission = await MissionRepositories.updateMissionById(id, { foodId, description, xp });

  if (!mission) return next(new NotFoundError('Mission tidak ditemukan'));

  return response(res, 200, 'Mission berhasil diperbarui', mission);
};

export const deleteMissionById = async (req, res, next) => {
  const { id } = req.params;
  const mission = await MissionRepositories.deleteMissionById(id);

  if (!mission) return next(new NotFoundError('Mission tidak ditemukan'));

  return response(res, 200, 'Mission berhasil dihapus', mission);
};
