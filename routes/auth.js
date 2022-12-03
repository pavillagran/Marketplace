
const { Router }  = require('express');
const { check } = require ('express-validator')

const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth');
const { validarJWT} = require('./middlewares/validar-jwt')
const router = Router();

/* rutas de usuario / auth 
host + /api/auth
*/

/*const { Router } = require('express');
const router = Router();*/ 


router.post(
    '/new',
    [ // entre llaves, coleccion de midlewares
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligatorio').isEmail(),
        check('direccion', 'La direccion es obligatoria').not().isEmpty().isLength({min:5, max:30}),
        check('password', 'La clave es obligatoria y  debe ser minimo de 6 digitos').isLength({min:6, max:8}),
        check('edad', 'La edad es obligatoria y  debe ser mayor de edad').not().isEmpty().isNumeric({min:18})
    ], 
    crearUsuario); 


router.get('/renew', validarJWT , revalidarToken);   // agregar  validarJWT despues de renew , 

router.post(
    '/',
    [
        check('correo', 'El correo es obligatorio').isEmail(), 
        check('password', 'La clave es obligatoria y  debe ser de 6 digitos').isLength({min:6, max:8})  // clave min 7 y max 8
  
    ],
    loginUsuario);




module.exports = router;


