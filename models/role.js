const {model, Schema} = require('mongoose')


const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'El role es requerido']
    }
})

module.exports = model('Role', RoleSchema)