const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true,
      default: 'Usuario no asignado',
      trim: true,
      lowercase: true
     
    },
    precio: { type: Number, required: true, min: 18, max: 130},
    marca: { type: String, require: true, max: 30},
    isTouch: { type:String}
})

const Tablet = mongoose.model('tablet', userSchema)

module.exports = Tablet
