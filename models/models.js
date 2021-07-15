// Описание моделей данных
const sequelize = require('../db');
// Для описания типа данных
const {DataTypes} = require('sequelize');

// Модель пользователя
const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" }
});

// Модель корзины
const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

// Модель устройства в корзине
const BasketDevice = sequelize.define('basket_device', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

// Модель устройства
const Device = sequelize.define('device', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

// Модель типа
const Type = sequelize.define('type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

// Модель бренда
const Brand = sequelize.define('brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

// Модель рейтинга
const Rating = sequelize.define('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.INTEGER, unique: true, allowNull: false }
});

// Модель описания устройства
const DeviceInfo = sequelize.define('device_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false }
});

// Модель типа бренда (дополнительная таблица для связи между типами и брендами)
const TypeBrand = sequelize.define('type_brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// Связь между пользователем и корзиной: 1 к 1
User.hasOne(Basket);
Basket.belongsTo(User);

// Связь между пользователем и рейтингом: 1 ко многим
User.hasMany(Rating);
Rating.belongsTo(User);

// Связь между корзиной и девайсами в ней: 1 ко многим
Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

// Связь между типом и девайсом: 1 ко многим
Type.hasMany(Device);
Device.belongsTo(Type);

// Связь между брендом и девайсом: 1 ко многим
Brand.hasMany(Device);
Device.belongsTo(Brand);

// Связь между девайсом и рейтингом: 1 ко многим
Device.hasMany(Rating);
Rating.belongsTo(Device);

// Связь между девайсом и девайсом в корзине: 1 ко многим
Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

// Связь между девайсом и информацией о нём: 1 ко многим
Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device);

// Связь между типом и брендом: многое ко многим
Type.belongsToMany(Brand, {through: TypeBrand});
Brand.belongsToMany(Type, {through: TypeBrand});

module.exports = {
  User,
  Basket,
  BasketDevice,
  Device,
  Type,
  Brand,
  Rating,
  TypeBrand,
  DeviceInfo
}
