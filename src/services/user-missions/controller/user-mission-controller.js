import UserMissionRepositories from '../repositories/user-mission-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const createUserMission = async (req, res, next) => {
  const { profileId, missionId, assignedDate, mealType } = req.validated;

  const item = await UserMissionRepositories.createUserMission({ profileId, missionId, assignedDate, mealType });

  if (!item) return next(new InvariantError('User mission gagal ditambahkan'));

  return response(res, 201, 'User mission berhasil ditambahkan', item);
};

export const getUserMissions = async (req, res, next) => {
  const items = await UserMissionRepositories.getAllUserMissions();
  return response(res, 200, 'User missions berhasil ditampilkan', items);
};

export const getUserMissionById = async (req, res, next) => {
  const { id } = req.params;
  const item = await UserMissionRepositories.getUserMissionById(id);

  if (!item) return next(new NotFoundError('User mission tidak ditemukan'));

  return response(res, 200, 'User mission berhasil ditampilkan', item);
};

export const updateUserMissionById = async (req, res, next) => {
  const { id } = req.params;
  const { profileId, missionId, assignedDate, mealType, isCompleted } = req.validated;

  const item = await UserMissionRepositories.updateUserMissionById(id, { profileId, missionId, assignedDate, mealType, isCompleted });

  if (!item) return next(new NotFoundError('User mission tidak ditemukan'));

  return response(res, 200, 'User mission berhasil diperbarui', item);
};

export const deleteUserMissionById = async (req, res, next) => {
  const { id } = req.params;
  const item = await UserMissionRepositories.deleteUserMissionById(id);

  if (!item) return next(new NotFoundError('User mission tidak ditemukan'));

  return response(res, 200, 'User mission berhasil dihapus', item);
};
