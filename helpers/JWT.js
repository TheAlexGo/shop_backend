const jwt = require('jsonwebtoken');
class JWT {
  /**
   * Генерирует JWT-токен
   * @param {number} id - id пользователя
   * @param {string} email - email пользоавтеля
   * @param {string} role - role пользователя
   * @return {jwt} - возвращает токен
   */
  static generate(id, email, role) {
    return jwt.sign(
      {
        id,
        email,
        role
      },
      process.env.SECRET_KEY,
      {expiresIn: '24h'}
    );
  }

  /**
   * Проверка токена по секретному ключу, получение объекта с данными токена
   * @param token
   * @return {jwt}
   */
  static verify(token) {
    return jwt.verify(token, process.env.SECRET_KEY);
  }
}
module.exports = JWT;