import UserMissionRepositories from '../repositories/user-mission-repositories.js';
import ProfileRepositories from '../../profiles/repositories/profile-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';
import { getMealType } from '../../../utils/meal-type.js';

export const getUserMissionBatch = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const profiles = await ProfileRepositories.getByUserId(userId);

    if (!profiles || profiles.length === 0) {
      return next(new NotFoundError('Profile tidak ditemukan'));
    }

    const mealType = getMealType();

    const results = [];

    for (const profile of profiles) {
      const profileId = profile.id;

      let missions =
        await UserMissionRepositories.getUserMissionsToday(
          profileId,
          mealType
        );

      if (!missions || missions.length === 0) {
        const randomMissions =
          await UserMissionRepositories.getRandomMissions(3);

        if (!randomMissions || randomMissions.length === 0) {
          return next(new InvariantError('Mission tidak tersedia'));
        }

        await UserMissionRepositories.insertUserMissions(
          profileId,
          randomMissions,
          mealType
        );

        missions =
          await UserMissionRepositories.getUserMissionsToday(
            profileId,
            mealType
          );
      }

      const formattedMissions = missions.map((m) => ({
        id: m.id,
        title: m.title,
        desc: m.description,
        xp: m.xp,
        done: !!m.is_completed,
      }));

      results.push({
        profile: {
          id: profile.id,
          name: profile.name,
        },
        missions: formattedMissions,
      });
    }

    return response(
      res,
      200,
      `Misi ${mealType} berhasil ditampilkan`,
      results
    );
  } catch (error) {
    next(error);
  }
};

export const getProfileMissionsBatch = async (req, res, next) => {
  try {
    const profileId = req.params.profileId;

    const profile = await ProfileRepositories.getProfileById(profileId);

    if (!profile || profile.length === 0) {
      return next(new NotFoundError('Profile tidak ditemukan'));
    }

    const missions = await UserMissionRepositories.getUserMissionsToday(profileId, getMealType());

    const formattedMissions = missions.map((m) => ({
      id: m.id,
      title: m.title,
      desc: m.description,
      xp: m.xp,
      done: !!m.is_completed,
      assignedDate: m.assigned_date,
      mealType: m.meal_type,
    }));

    return response(
      res,
      200,
      'Semua misi berhasil ditampilkan',
      {
        profile: {
          id: profile.id,
          name: profile.name,
        },
        missions: formattedMissions,
      }
    );
  } catch (error) {
    next(error);
  }
};

export const completeMissionBatch = async (req, res, next) => {
  try {
    const profileId = req.params.profileId;
    const { missionIds } = req.body;
    const parsedMissionIds = JSON.parse(missionIds);

    if (!req.file) {
      return next(new InvariantError('Bukti penyelesaian misi harus diunggah'));
    }

    const iconUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const profile = await ProfileRepositories.getProfileById(profileId);

    if (!profile || profile.length === 0) {
      return next(new NotFoundError('Profile tidak ditemukan'));
    }

    const results = [];
    for (const missionId of parsedMissionIds) {
      const userMission = await UserMissionRepositories.getUserMissionById(missionId);

      if (!userMission || userMission.profile_id !== parseInt(profileId)) {
        return next(new NotFoundError(`Misi dengan ID ${missionId} tidak ditemukan untuk profile ini`));
      }

      const randomStatus = Math.random() < 0.2 ? 'rejected' : 'approved';

      if (randomStatus === 'approved') {
        await UserMissionRepositories.awardXp(profile.user_id, userMission.xp);
        await UserMissionRepositories.completeMission(missionId);
      }
      await UserMissionRepositories.submitMissionProof(userMission.id, iconUrl, randomStatus);

      results.push({
        id: missionId,
        title: userMission.title,
        status: randomStatus,
      });
    }

    return response(res, 200, 'Misi berhasil diselesaikan', results);
  } catch (error) {
    next(error);
  }
};

export const getAllUserMissions = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profile = await ProfileRepositories.getByUserId(userId);
    const profileId = profile.id;

    const missions = await UserMissionRepositories.getAllUserMissions(
      profileId
    );

    const formatted = missions.map((m) => ({
      id: m.id,
      title: m.title,
      desc: m.description,
      xp: m.xp,
      done: !!m.is_completed,
      assignedDate: m.assigned_date,
      mealType: m.meal_type,
    }));

    return response(res, 200, 'Semua misi berhasil ditampilkan', formatted);
  } catch (error) {
    next(error);
  }
};