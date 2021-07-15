require('dotenv').config();

const express = require('express'); // добавляем express
const sequelize = require('./db'); // добавляем базу данных
const models = require('./models/models'); // добавляем модели
const cors = require('cors'); // отправка запросов из браузера
const fileUpload = require('express-fileupload'); // добавляем fileUpload
const router = require('./routes/index'); // подключаем маршруты
const errorHandler = require('./middleware/ErrorHandlingMiddleware'); // подключаем обработчик ошибок
const path = require('path'); // добавляем path

const PORT = process.env.PORT || 5000;


const app = express(); // создаём express приложение
app.use(cors()); // регистрируем cors
app.use(express.json()); // чтобы приложение могло парсить json-формат
app.use(express.static(path.resolve(__dirname, 'static'))); // регистрируем папку static для просмотра статических файлов
app.use(fileUpload({})); // регистрируем загрузчик файлов
app.use('/api', router); // регистрируем маршруты в приложении

// Обработка ошибок, последний Middleware
app.use(errorHandler);


const start = async () => {
  try {
    await sequelize.authenticate(); // Подключение к БД
    await sequelize.sync(); // Сверяет состояние БД со схемой
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // запуск приложения
  } catch(e) {
    console.log(e);
  }
}

start().then();

