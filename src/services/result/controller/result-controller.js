import ResultRepositories from '../repositories/result-repositories.js';
import FoodRepository from '../../food/repositories/food-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const createResult = async (req, res, next) => {
  const { profileId } = req.validated;
  if (!req.file) {
    return next(new InvariantError('Image hasil harus diunggah'));
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  // AI DISINI DAN NANTI AKAN KELUAR NAMA MAKANANNYA
  // random food name for testing (mangga, jeruk, pisang, apel, anggur)
  // buat random antara 5 nama makanan itu dong
  const foodName = ['mangga', 'jeruk', 'pisang', 'apel', 'anggur'][Math.floor(Math.random() * 5)];

  const foods = await FoodRepository.getFoodByName(foodName);
  const food = foods[0];
  if (!food) {
    return next(new NotFoundError('Food tidak ditemukan'));
  }
  const { name, calories, protein, sugar, carbohydrates, fat } = food;

  const date = new Date();

  const result = await ResultRepositories.createResult({ profileId, imageUrl, date, name, calories, protein, sugar, carbohydrates, fat });

  if (!result) return next(new InvariantError('Result gagal ditambahkan'));

  return response(res, 201, 'Result berhasil ditambahkan', result);
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