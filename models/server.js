const express = require('express')
const  cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.usuariosPath = '/api/usuarios'

        //Middlewares
        this.middlewares();
        
        //Rutas de mi aplicación
        this.routres();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        // Lectura y Parseo del body
        this.app.use( express.json() );

        //Directorio Público
        this.app.use( express.static('public'))
    }

    routres() {
        
        this.app.use(this.usuariosPath, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        });
    }

}

module.exports = Server;
