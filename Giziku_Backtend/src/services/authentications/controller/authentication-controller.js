import AuthenticationRepositories from '../repositories/authentication-repositories.js';
import UserRepositories from '../../users/repositories/user-repositories.js';
import TokenManager from '../../../security/token-manager.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import AuthenticationError from '../../../exceptions/authentication-error.js';

export const login = async (req, res, next) => {
  const { email, password } = req.validated;
  const user = await AuthenticationRepositories.verifyUserCredential(email, password);

  if (!user) {
    return next(new AuthenticationError('Kredensial yang Anda berikan salah'));
  }

  const accessToken = TokenManager.generateAccessToken({ id: user.id, role: user.role });
  const refreshToken = TokenManager.generateRefreshToken({ id: user.id, role: user.role });

  await AuthenticationRepositories.addRefreshToken(refreshToken, user.id);

  return response(res, 201, 'Authentication berhasil ditambahkan', {
    accessToken,
    refreshToken,
  });
};

export const refreshToken = async (req, res, next) => {
  const { refreshToken: token } = req.validated;

  const result = await AuthenticationRepositories.verifyRefreshToken(token);

  if (!result) {
    return next(new InvariantError('Refresh token tidak valid'));
  }

  const { id } = TokenManager.verifyRefreshToken(token);

  if (!id) {
    return next(new InvariantError('User tidak ditemukan'));
  }

  const user = await UserRepositories.getUserById(id);

  const accessToken = TokenManager.generateAccessToken({ id: user.id, role: user.role });

  return response(res, 200, 'Access Token berhasil diperbarui', { accessToken });
};

export const logout = async (req, res, next) => {
  const { refreshToken: token } = req.validated;

  const result = await AuthenticationRepositories.verifyRefreshToken(token);

  if (!result) {
    return next(new InvariantError('Refresh token tidak valid'));
  }

  await AuthenticationRepositories.deleteRefreshToken(token);

  return response(res, 200, 'Refresh token berhasil dihapus');
};

