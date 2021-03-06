const jwt = require('jsonwebtoken');
class JWT {
  /**
   * Генерирует JWT-токен
   * @param {number} id - id пользователя
   * @param {string} role - role пользователя
   * @return {jwt} - возвращает токен
   */
  static generate(id, role) {
    return jwt.sign(
      {
        id,
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