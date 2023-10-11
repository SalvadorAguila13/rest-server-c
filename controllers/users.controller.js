const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');


const getUser = async(req = request, res = response) => {
    const {limit = 5, desde = 0 } = req.query

    const [total, users] = await Promise.all([
        User.countDocuments({state: true}),
        User.find({state: true})
            .skip(Number(desde))
            .limit(Number(limit))
    ])

    res.status(200).json({
        total,
        users
    })
};


const putUser = async(req, res = response) => {
  const {id} = req.params;
  const {_id, password, google, email, ...resto} = req.body;
  // TODO: Validar contra base de datos.
  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt)
  };

  const user = await User.findByIdAndUpdate(id, resto)

  res.status(201).json({
    user
  });
};


const postUser = async (req = request, res = response) => {
  // todo:capturar información que llega en la req
  const {name, email, password, role} = req.body;
  // todo: Mandar y guardar información a la base de datos de moongose 
  const user = new User({name, email, password, role});
  
  // Todo: Encriptación de la contraseña
  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt)
  // Guardar base de datos
  await user.save()
  res.status(201).json({
    user
  });
};


const patchUser = (req = request, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "patch API",
  });
};


const deleteUser = async(req = request, res = response) => {
  const {id} = req.params 
    // Borrar fisicamente de la DB
    // const user = await User.findByIdAndDelete(id)

    // Cambiar solo el state y no mostrar el usuario "Borrado", pero su registro sigue en base de datos
    const user = await User.findByIdAndUpdate(id, {state: false})
    res.status(200).json(user)
};

module.exports = {
  getUser,
  putUser,
  postUser,
  patchUser,
  deleteUser,
};
