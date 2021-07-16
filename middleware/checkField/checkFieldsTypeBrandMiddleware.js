module.exports = function (req, res, next) {
  const {name} = req.body;

  if(!name) {
    return res.status(400).json({message: "Не указано название!"});
  }

  req.data = {...req.body};
  next();
}