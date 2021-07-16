const {Basket, BasketDevice} = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
  async addItem(req, res) {
    const { id } = req.body;

    const basket = await Basket.findOne({where: {userId: req.user.id}});
    const basketDevice = await BasketDevice.create({
      basketId: basket.id,
      deviceId: id
    });

    res.json({basketDevice});
  }

  async removeItem(req, res, next) {
    const { id } = req.body;
    const basketDevices = await BasketDevice.findOne({where: {deviceId: id}});
    if(!basketDevices) {
      return next(ApiError.badRequest('Товара нет в корзине!'));
    }
    await BasketDevice.destroy({where: {deviceId: id}});
    res.json({message: `Товар с id: ${id} успешно удалён из корзины!`});
  }

  async get(req, res) {
    const basket = await Basket.findOne(
      {
        where: {userId: req.user.id},
        include: [{model: BasketDevice, as: 'items'}]
      });
    res.json({basket});
  }
}

module.exports = new BasketController();