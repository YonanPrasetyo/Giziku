import UserRepositories from '../repositories/user-repositories.js';
import response from '../../../utils/response.js';
import NotFoundError from '../../../exceptions/not-found-error.js';
import UserService from '../services/user-service.js';

export const createUser = async (req, res, next) => {
  const { email, username, password } = req.validated;

  const result = await UserService.register({ email, username, password });

  return response(res, 201, 'User berhasil ditambahkan', result.user);
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await UserRepositories.getUserById(id);

  if (!user) {
    return next(new NotFoundError('User tidak ditemukan'));
  }

  return response(res, 200, 'User berhasil ditampilkan', { id: user.id, email: user.email, username: user.username, updated_at: user.updated_at, created_at: user.created_at });
};