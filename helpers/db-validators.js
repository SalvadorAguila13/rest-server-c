const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`El role ${role} no existe en la base de datos`);
  }
};

// Verificar si el correo existe.
const isValidEmail = async (email) => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`El email ${email} ya esta registrado en la base de datos`);
}}

// Verificar el id de la base de datos 
const userExistsById = async(id) => {
  const existUserId = await User.findById( id );
  if (!existUserId) {
    throw new Error(`El id ${id} no esta registrado en la base de datos`);
}}

module.exports = {
  isValidRole,
  isValidEmail,
  userExistsById
};
