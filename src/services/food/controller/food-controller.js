import FoodRepository from '../repositories/food-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const createFood = async (req, res, next) => {
  const { name, category, portionSize, calories, protein, sugar, carbohydrates, fat } = req.validated;

  const food = await FoodRepository.createFood({ name, category, portionSize, calories, protein, sugar, carbohydrates, fat });

  if (!food) return next(new InvariantError('Food gagal ditambahkan'));

  return response(res, 201, 'Food berhasil ditambahkan', food);
};

export const getFoods = async (req, res) => {
  const foods = await FoodRepository.getAllFoods();
  return response(res, 200, 'Foods berhasil ditampilkan', foods);
};

export const getFoodById = async (req, res, next) => {
  const { id } = req.params;
  const food = await FoodRepository.getFoodById(id);

  if (!food) return next(new NotFoundError('Food tidak ditemukan'));

  return response(res, 200, 'Food berhasil ditampilkan', food);
};

export const updateFoodById = async (req, res, next) => {
  const { id } = req.params;
  const { name, category, portionSize, calories, protein, sugar, carbohydrates, fat } = req.validated;

  const food = await FoodRepository.updateFoodById(id, { name, category, portionSize, calories, protein, sugar, carbohydrates, fat });

  if (!food) return next(new NotFoundError('Food tidak ditemukan'));

  return response(res, 200, 'Food berhasil diperbarui', food);
};

export const deleteFoodById = async (req, res, next) => {
  const { id } = req.params;
  const food = await FoodRepository.deleteFoodById(id);

  if (!food) return next(new NotFoundError('Food tidak ditemukan'));

  return response(res, 200, 'Food berhasil dihapus', food);
};