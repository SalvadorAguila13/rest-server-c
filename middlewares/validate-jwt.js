const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = async(req = request, res = response, next) => {
    // Validar que el token nos llegue en los headers y como debe ser llamado (x-token)
    const token = req.header('x-token')

    // Validar que el Token si llegue, en caso contrario enviar un error 'No hay token en la petición'
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    // Validar que el Token que es envia, sea un token valido de JWT, en caso contrario, enviar un error ("Token no valido")
    try {
                // token, secretOrPublicKey
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        // Leer el modelo del usuario que corresponde al UID
        const user = await User.findById(uid)
        // Verificar que el usuario exista 
        if (!user) {
            return res.status(401).json({
                msg: "El usuario no existe en DB"
            })
        }

        // Verificar que el usuario este activo o su estado este en true
        if (!user.state) {
            return res.status(401).json({
                msg: "El usuario no esta activo"
            })
        }
        
        req.user = user;
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'token no valido'
        })
    }
}

module.exports = { 
    validateJWT
}