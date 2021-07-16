const jwt = require('../helpers/JWT');

/**
 * Проверка авторизации пользователя и получение его данных из токена
 * @param req - запрос
 * @param res - ответ
 * @param next
 * @return {*}
 */
module.exports = function (req, res, next) {
  if(req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer token
    if(!token) {
      return res.status(401).json({message: 'Не авторизован'});
    }
    req.user = jwt.verify(token);
    next();
  } catch (e) {
    return res.status(401).json({message: 'Не авторизован'});
  }
}