const { response, request } = require("express");

const getUser = (req = request, res = response) => {
    const {q, name, apikey} = req.query

  res.status(200).json({
    ok: true,
    msg: "Hola mundo",
    q,
    name,
    apikey
  });
};

const putUser = (req = request, res = response) => {
  const id = req.params.id;
  res.status(500).json({
    msg: "put API",
    id
  });
};

const postUser = (req = request, res = response) => {
  const { name, age } = req.body;

  res.status(201).json({
    msg: "post API",
    name,
    age,
  });
};

const patchUser = (req = request, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "patch API",
  });
};

const deleteUser = (req = request, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "delete API",
  });
};

module.exports = {
  getUser,
  putUser,
  postUser,
  patchUser,
  deleteUser,
};
