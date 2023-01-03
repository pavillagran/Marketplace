 
const { response }  = require('express');   // se recarga pero no en la memoria, es opcional para  recuperar vs inteligencia
const { validationResult } = require('express-validator');
const User = require('../models/User');  // importando el userschema
const crypto = require('crypto');
const { generarJWT } = require('../helpers/jwt');


/* CREAR USUARIO */ 

const crearUsuario = async (req, res ) => {
    
    //Manejo de errores de auth recibiendo de validationResult
    const errors = validationResult( req );

    if (!errors.isEmpty()) {
        return res.status(400).json ({
            ok: false,
            errors: errors.mapped()
        })
    }


    try {
       // ANTES DE GUARDAR EN LA BD - BUSCAR REGISTRO DUPLICADO
            let user = await User.findOne({correo:req.body.correo})  /* findOne - si encuentra uno o mas */
            if (user){   /* si el usuario no esta vacio */
           return  res.status(400).json({
            ok: false,
            errors: 'El correo electronico esta en uso.'
            });
            } 
        // ENCRIPTAR CLAVE 
      const salt = crypto.randomBytes(16).toString('hex')       // console.log(salt)
      const hash = crypto.pbkdf2Sync(req.body.password, salt, 10000, 512, 'sha512').toString('hex')
    
      const newUser = new User({ ...req.body, password: hash, salt, salt})
      //console.log(newUser)
     
      //generar JWT
      const token = generarJWT(newUser._id, newUser.nombre)
    
            newUser.token = token
            //console.log(token)
        await newUser.save()
      
        res.status(201).json({ 
            sucess: true,
            message: 'Usuario creado.',
            id: newUser._id, 
            name: newUser.nombre,
            token
            })
            console.log(newUser)
     
            //console.log(token)
       } catch (error){
        res.status(400).json({ 
        sucess: false, message: 'No se creo el usuario.' })
    }
  }

/* LOGIN DE USUARIO */ 
    const loginUsuario = async (req, res ) => {        
        const { correo, password} = req.body    // destructurando,, usando partes de req.body

        //Manejo de errores de auth recibiendo de validationResult
        const errors = validationResult( req );

        if (!errors.isEmpty()) {
            return res.status(400).json ({
                ok: false,
                errors: errors.mapped()
            })
        }

        try {
            const user = await User.findOne({correo:req.body.correo})  
            if ( !user ) {   
                return  res.status(400).json({
                ok: false,
                errors: 'El usuario no existe con ese correo.'
                });
            } 

            const hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex')    

            if(user.password != hash) {
            return res.status(400).json({
            ok: false,
            errors: 'Las claves no coinciden.'
            });
            }  
            //GENERAR JWT  login
            //generar JWT
            const token = generarJWT(user._id, user.nombre)
               

            res.status(201).json({
                ok:true,
                msg: 'Usuario logeado.',
                correo,
                password,
                token
            });


        } catch (error) {
            console.log(error)
                res.status(500).json({
                    ok: false,
                    msg: 'Contacte al administrador.'
                });
            }


}

// REVALIDANDO TOKEN
const revalidarToken = async (req, res = response) => {        
    const uid = req.uid;
    const name = req.name; 
    const token = await generarJWT(uid, name)
    res.json({
        ok:true,
        //uid,
       // name,
        token,
        msg: 'Revalidado el token.'
        
    });
}



module.exports =  { crearUsuario, loginUsuario, revalidarToken };