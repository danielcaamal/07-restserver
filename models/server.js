// External Imports
const express = require('express');

// Middlewares
const cors = require('cors');

// Internal imports

class Server {
    constructor () {
        this.app = express();
        this.port = process.env.PORT || 3000;

        // Paths
        this.userPath = '/api/user';

        // Middleware
        this.middlewares();

        // Routes
        this.routes();
    }

    middlewares () {
        // CORS
        this.app.use( cors() );

        // Body Parser
        this.app.use( express.json() );
        
        // Public Directory
        this.app.use( express.static( 'public' ) );
    }

    routes () {
        // User Routes
        this.app.use(this.userPath, require('../routes/user'));
    }

    start () {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${ this.port }`);
        });
    }
}

module.exports = Server;