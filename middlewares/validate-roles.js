const { response } = require('express')

const isAdminRole = async(req, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin verificar el token primero'
        })
    }

    const {role, name} = req.user;
    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El usuario ${name} no esta autorizado para realizar esta petición`
        })
    }

    next()
}

const authorizedRoles = (...roles) => {
    return (req, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin verificar el token primero'
            })
        }
        const {role, name} = req.user;
        
        if (!roles.includes(role)) {
            return res.status(401).json({
                msg: `El usuario ${name} no esta autorizado para realizar esta petición, por favor asignar a un usuario con los permisos respectivos de:${roles},`
            })
        }

        next()
    }
}


module.exports = {
    isAdminRole,
    authorizedRoles
}