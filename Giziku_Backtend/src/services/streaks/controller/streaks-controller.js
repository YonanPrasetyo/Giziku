import StreaksRepositories from '../repositories/streaks-repositories';
import response from '../../../utils/response.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const getStreakByUserId = async (req, res, next) => {
  const { userId } = req.user.id;
  const streak = await StreaksRepositories.getStreakByUserId(userId);

  if (!streak) return next(new NotFoundError('Streak tidak ditemukan'));

  return response(res, 200, 'Streak berhasil ditampilkan', streak);
};