const User = require('../models/User')
const crypto = require('crypto')

const crearUsuario = async (req, res) => {
  try {
    //guardar la info en BD
    const user = await User.findOne({correo:req.body.correo})  /* si encuentra uno o mas */
    if (user){   /* el usuario no esta vacio */
      throw new Error ('Email en uso')
    } 
 

    const { nombre, apellido, correo, password, edad, direccion } = req.body
    const newUser = new User({ ...req.body })
    
    const hash = newUser.hashPassword(req.body.password)
    
    await newUser.save()
    
    res.json({ sucess: true, message: 'usuario creado', id: newUser._id })
  } catch (error){
    res.json({ sucess: false, message: 'no se creo' })
  }
}
const obtenerUsuarios = async (req, res) => {
  try {
    const users = await User.find().populate('favProducts')

    res.json({ success: true, users })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params
    //
    //
    const resultado = await User.findByIdAndDelete(id)
    if (!resultado) {
      throw new Error('El elemento que intentas borrar, no existe')
    }

    res.json({ success: true, response: 'Elemento borrado' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

const editarUsuario = async (req, res) => {
  try {
    const { id } = req.params
    const resultado = await User.findByIdAndUpdate(id, req.body, { new: true })
    if (!resultado) {
      throw new Error('El elemento que intentas editar no existe')
    }
    res.json({ success: true })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { correo, password } = req.body

    const user = await User.findOne({correo})
    if (!user)
    {
      throw new Error('la cuenta no existe')
    }

    const hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex')    

if(user.password != hash) {
  throw new Error('las claves no coinciden')
}  

res.json({sucess: true, mensaje: 'llegue al login'})
   } catch(error){
    res.json({sucess: false, error: error.message })
   }
  }

module.exports = { crearUsuario, obtenerUsuarios, eliminarUsuario, editarUsuario, login }
