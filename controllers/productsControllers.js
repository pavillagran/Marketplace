const { response, request } = require("express")
const { v4: uuidv4 } = require('uuid');

let productos = []  

const agregarProducto = (request, response) => {

    try {
        const {nombre, precio, marca, isTouch} = request.body
       
        const nuevoProducto = {
            
            id: uuidv4(),
            nombre,
            precio,
            marca,
            isTouch
        }
    
        productos.push(nuevoProducto)
        response.json({
        sucess: true,
        response: 'Productos agregado correctamente'
        })
} catch(error){
    response.json({
        sucess: false,
        response: 'Productos no  agregados fail'
    })
}
    console.log(request.body)

}

const leerProducto = (request, response) => {
    response.json({
        sucess: true,
        response: productos
    })
    console.log('Leyendo producto')
}

const eliminarProducto = (request, response) => {
  try {  const id = request.params.id
    productos = productos.filter((producto)=> producto.id !== id)
    response.json({sucess:true, response: productos})
    } catch (error){
    response.json({sucess:false, response: productos})
    }
}

const editarProducto = (request, response) => {
    const id = request.params.id
   

    const productoEnEdicion = {
        id: id,
        nombre,
        precio,
        marca,
        isTouch
    }
    console.log(productoEnEdicion)
}

module.exports = { agregarProducto, leerProducto, eliminarProducto, editarProducto}