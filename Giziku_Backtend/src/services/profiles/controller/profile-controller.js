import ProfileRepositories from '../repositories/profile-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const createProfile = async (req, res, next) => {
  const { userId, name, dateOfBirth, weight, height, gender, relation } = req.validated;

  const profile = await ProfileRepositories.createProfile({
    userId,
    name,
    dateOfBirth,
    weight,
    height,
    gender,
    relation,
  });

  if (!profile) {
    return next(new InvariantError('Profile gagal ditambahkan'));
  }

  return response(res, 201, 'Profile berhasil ditambahkan', profile);
};

export const getProfiles = async (req, res, next) => {
  const userId = req.user.id;
  const profiles = await ProfileRepositories.getAllProfiles(userId);

  profiles.forEach((profile) => {
    const dateOfBirth = new Date(profile.date_of_birth);
    const resultDate = new Date();
    const age = resultDate.getFullYear() - dateOfBirth.getFullYear();
    profile.age = age;
  });

  if (!profiles) {
    return next(new NotFoundError('Profiles tidak ditemukan'));
  }

  return response(res, 200, 'Profiles berhasil ditampilkan', profiles);
};

export const getProfileById = async (req, res, next) => {
  const { id } = req.params;
  const profile = await ProfileRepositories.getProfileById(id);

  if (!profile) {
    return next(new NotFoundError('Profile tidak ditemukan'));
  }

  return response(res, 200, 'Profile berhasil ditampilkan', profile);
};

export const updateProfileById = async (req, res, next) => {
  const { id } = req.params;
  const { userId, name, dateOfBirth, weight, height, gender, relation } = req.validated;

  const profile = await ProfileRepositories.updateProfileById(id, {
    userId,
    name,
    dateOfBirth,
    weight,
    height,
    gender,
    relation,
  });

  if (!profile) {
    return next(new NotFoundError('Profile tidak ditemukan'));
  }

  return response(res, 200, 'Profile berhasil diperbarui', profile);
};

export const deleteProfileById = async (req, res, next) => {
  const { id } = req.params;
  const profile = await ProfileRepositories.deleteProfileById(id);

  if (!profile) {
    return next(new NotFoundError('Profile tidak ditemukan'));
  }

  return response(res, 200, 'Profile berhasil dihapus', profile);
};
