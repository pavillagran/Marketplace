const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();  // variable de entorno  - port express  -  datos db mongo
const cors = require('cors')


// Creando server de express
const app = express()

// Conexión a la DB de mongo
connectDB()

// DIRECTORIO PUBLIC
app.use(express.static('public'))   // index 

// Habilitar CORS
app.use(cors())

// midleware: LECTURA DE BODY Y PARSER
app.use(express.json());

//RUTAS
app.use('/api/auth', require('./routes/auth') );  //todo lo exportado en routes/app lo habilitara en url /api/auth


// RUTA DE AGREGAR USERS
//app.use('/api', require('./routes/index'));



//heroku
/*
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
    })
  }
*/

//escuchar peticiones
app.listen( process.env.PORT,()=> {
console.log('servidor corriendo en port 4001')})