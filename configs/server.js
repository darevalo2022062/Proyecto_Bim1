'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan'
import { dbConnection } from "./mongo.js";

import categoryPath from '../src/categories/category.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT_NUMBER;
        this.categoryPath = '/shopKinal/v1/category'
        this.middlewares();
        this.routes();
        this.conectDB();
        global.existenciaPrevia = '';
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    startServer() {
        this.app.listen(this.port, () => {
            console.log("-> SERVER <-");
        });
    }

    routes() {
        this.app.use(this.categoryPath, categoryPath);
    }

    async conectDB() {
        await dbConnection();
    }
}

export default Server;