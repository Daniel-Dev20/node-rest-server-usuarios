const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} no es un rol valido'

}

const usuarioSchema = new Schema({
    nombre:{
        type:String,
        required: [true, 'El nombre es obligatorio']
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'El email es obligatorio']
    },
    password:{
        type: String,
        required: [true, 'El password es obligatorio']
    }, 
    role:{
        type:String,
        default: 'USER_ROLE',
        enum: rolesValidos
    }, 
    google:{
        type: Boolean, 
        default: false
    },
    estado:{
        type:Boolean,
        default: true
    }
});
usuarioSchema.methods.toJSON =  function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

mongoose.plugin(uniqueValidator, {message:'{PATH} Debe ser único'});

module.exports = mongoose.model('Usuario', usuarioSchema);