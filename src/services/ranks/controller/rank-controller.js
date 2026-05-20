import RankRepositories from '../repositories/rank-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const createRank = async (req, res, next) => {
  const { name, minXp, maxXp, iconUrl } = req.validated;

  const rank = await RankRepositories.createRank({ name, minXp, maxXp, iconUrl });

  if (!rank) return next(new InvariantError('Rank gagal ditambahkan'));

  return response(res, 201, 'Rank berhasil ditambahkan', rank);
};

export const getRanks = async (req, res, next) => {
  const ranks = await RankRepositories.getAllRanks();
  return response(res, 200, 'Ranks berhasil ditampilkan', ranks);
};

export const getRankById = async (req, res, next) => {
  const { id } = req.params;
  const rank = await RankRepositories.getRankById(id);

  if (!rank) return next(new NotFoundError('Rank tidak ditemukan'));

  return response(res, 200, 'Rank berhasil ditampilkan', rank);
};

export const updateRankById = async (req, res, next) => {
  const { id } = req.params;
  const { name, minXp, maxXp, iconUrl } = req.validated;

  const rank = await RankRepositories.updateRankById(id, { name, minXp, maxXp, iconUrl });

  if (!rank) return next(new NotFoundError('Rank tidak ditemukan'));

  return response(res, 200, 'Rank berhasil diperbarui', rank);
};

export const deleteRankById = async (req, res, next) => {
  const { id } = req.params;
  const rank = await RankRepositories.deleteRankById(id);

  if (!rank) return next(new NotFoundError('Rank tidak ditemukan'));

  return response(res, 200, 'Rank berhasil dihapus', rank);
};
