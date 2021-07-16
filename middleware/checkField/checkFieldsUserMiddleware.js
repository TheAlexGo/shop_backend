module.exports = function (proc) {
  return function(req, res, next) {
    const { email, password } = req.body;
    switch (proc) {
      case 'REGISTER':
        if(!email || !password) {
          return res.status(400).json({message: "Некорректный email или password!"});
        }
        break;
      case 'DELETE':
        if(!email ) {
          return res.status(400).json({message: "Не указан email пользователя!"});
        }
    }
    req.data = req.body;
    next();
  }
}