const express = require('express');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT_NUMBER;
        this.middlewares();
        this.routes();
        this.conectDB();
    }

    middlewares() {

    }

    startServer() {
        this.app.listen(this.port, () => {
            console.log("-> SERVER <-");
        });
    }

    routes() {

    }

    async conectDB() {

    }
}

module.exports = Server;