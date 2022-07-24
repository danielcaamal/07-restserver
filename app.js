// External imports
require('dotenv').config();

// Internal imports
const Server = require('./models/server');

const server = new Server();

server.start();