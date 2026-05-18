import foodRepositories from '../repositories/food-repositories.js';
import response from '../../../utils/response.js';
// import NotFoundError from '../../../exceptions/not-found-error.js';
import InvariantError from '../../../exceptions/invariant-error.js';

export const createFood = async (req, res, next) => {
  const { profileId } = req.validated;

  console.log('profileId:', profileId);

  if (!req.file) {
    return next(new InvariantError('Gambar makanan harus diunggah'));
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  const result = await foodRepositories.createFood({ profileId, imageUrl });

  return response(res, 201, 'Makanan berhasil diunggah', result);
};