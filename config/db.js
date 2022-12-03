
const mongoose = require('mongoose');


const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("Base de datos conectada")

    } catch (error) {
        throw new Error('Error al iniciar la conexion a la BD')
     console.log(error)
     

    }

}

module.exports = connectDB