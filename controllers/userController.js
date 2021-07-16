const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const path = require('path');
const JWT = require(path.resolve(__dirname, '..','helpers', 'JWT'));
const {User, Basket} = require('../models/models');

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;

    const candidate = await User.findOne({where: {email}});
    if(candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({email, role, password: hashPassword});
    await Basket.create({userId: user.id});
    const token = JWT.generate(user.id, user.role);
    return res.json({token});
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({where: {email}});
    if(!user) {
      return next(ApiError.internal('Пользователь не найден'));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if(!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'));
    }
    const token = JWT.generate(user.id, user.role);
    return res.json({token});
  }

  async delete(req, res, next) {
    const {email} = req.body;
    const user = await User.findOne({where: {email}});
    if(!user) {
      return next(ApiError.internal('Пользователь не найден'));
    }
    await User.destroy({where: {email}});
    return res.json({message: `Пользователь с email: ${email} успешно удалён!`});
  }

  async check(req, res) {
    const token = JWT.generate(req.user.id, req.user.role);
    return res.json({token});
  }
}

module.exports = new UserController();
