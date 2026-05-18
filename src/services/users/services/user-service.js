import { Pool } from 'pg';
import UserRepositories from '../repositories/user-repositories.js';
import ProfileRepositories from '../../profiles/repositories/profile-repositories.js';
import InvariantError from '../../../exceptions/invariant-error.js';


class UserService {
  constructor() {
    this._pool = new Pool();
  }

  async register({ email, username, password }) {
    const isEmailExist = await UserRepositories.verifyNewEmail(email);
    if (isEmailExist) {
      throw new InvariantError('Email sudah digunakan');
    }

    const isUsernameExist = await UserRepositories.verifyNewUsername(username);
    if (isUsernameExist) {
      throw new InvariantError('Username sudah digunakan');
    }

    const user = await UserRepositories.createUser({
      email,
      username,
      password,
    });

    if (!user) {
      throw new InvariantError('User gagal ditambahkan');
    }

    const profile = await ProfileRepositories.createProfile({
      userId: user.id,
      name: username,
      relation: 'self',
    });

    return { user, profile };
  }
}

export default new UserService();