class ApiError extends Error {
  constructor(status, message) {
    // Получаем родительский конструктор
    super();
    this.status = status;
    this.message = message;
  }

  /**
   * Неверный запрос
   * @param {string} message - сообщение об ошибке
   * @return {ApiError}
   */
  static badRequest(message) {
    return new ApiError(400, message);
  }

  /**
   * Внутрення ошибка сервера
   * @param {string} message - сообщение об ошибке
   * @return {ApiError}
   */
  static internal(message) {
    return new ApiError(500, message);
  }

  /**
   * Запрещённый доступ
   * @param {string} message - сообщение об ошибке
   * @return {ApiError}
   */
  static forbidden(message) {
    return new ApiError(403, message);
  }
}

module.exports = ApiError;
