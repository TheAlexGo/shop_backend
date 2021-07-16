module.exports = function (req, res, next) {
  let {name, price, brandId, typeId, img, info} = {...req.body, ...req.files};

  if(!name || !price || !brandId || !typeId || !img) {
    return res.status(400).json({message: "Не указано name, price, brandId, typeId или не выбран img!"});
  }
  if(info) {
    info = JSON.parse(info);
  }

  req.data = {...req.body, ...req.files};
  req.data.info = info;

  next();
}