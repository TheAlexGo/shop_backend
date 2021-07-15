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

  static verify(token) {

  }
}
module.exports = JWT;