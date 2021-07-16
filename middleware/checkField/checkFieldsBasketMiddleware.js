module.exports = function (req, res, next) {
  const { id } = req.body;
  if(!id) {
    return res.status(400).json({message: "Не указан id!"});
  }
  next();
}