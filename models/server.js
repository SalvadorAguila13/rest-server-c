const express = require('express')
const cors = require('cors')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 4001
        // todo: Middlewares
        this.middlewares()
        // todo: Rutas de la aplicación
        this.routes()
    }

    middlewares() {
        // Cors
        this.app.use(cors())
        
        // Parse y lectura del body
        this.app.use(express.json())

        // Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use('/api/users', require('../routes/users.routes'))

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`ejecutando en http://localhost:${this.port}`)
        })
    }
}

module.exports = Server