const {Schema, model, default: mongoose} = require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email:{
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es requerido']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state:{
        type:Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

// Quitar la visualización de la contraseña en base datos.
UserSchema.methods.toJSON = function() {
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id
    return user; 
}

module.exports = model('User', UserSchema)