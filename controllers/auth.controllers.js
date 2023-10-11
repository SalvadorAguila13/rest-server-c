const { response } = require("express");
const User = require('../models/user')
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");

const postLogin = async(req, res = response) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email})
        // Verificar si el email existe
        if (!user) {
            return res.status(400).json({
                msg: 'El email / password es incorrecto - email'
            })
        }
        // Verificar si el usuario esta activo(state:true)
        if (!user.state) {
            return res.status(400).json({
                msg: 'El email / password es incorrecto - state'
            })
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'El email / password es incorrecto - password'
            })
        }

        // Generar JWT
        const token = await generateJWT(user.id)

        res.status(200).json({
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Internal Error'
        })
    }
}

module.exports = {
    postLogin
}