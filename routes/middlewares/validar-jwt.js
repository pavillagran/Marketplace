const { response } = require('express')  // para tener el tipado en code
const jwt = require('jsonwebtoken')
const validarJWT = (req, res = response, next) => { 

    const token = req.header('x-token');
    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'NO hay token en la peticion.'});
    }

    try {
        const { uid, name  } = jwt.verify(
            token,
            process.env.SECRET_JWT
            );

            req.uid = uid;
            req.name = name; 
            //console.log(payload)
            console.log(token)   // mostrar el token
            
           
        
        }catch (error) {
            return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
            });
        }
    
        next();
 }

module.exports = {validarJWT}