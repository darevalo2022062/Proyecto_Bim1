'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan'
import { dbConnection } from "./mongo.js";

import categoryPath from '../src/categories/category.routes.js';
import productPath from '../src/products/product.routes.js';
import userPath from '../src/users/user.routes.js';
import authPath from '../src/auth/auth.routes.js';
import cartPath from '../src/obejctsTaken/objectTaken.routes.js';
import purchasePath from '../src/sales/sale.routes.js';
import billPath from '../src/bills/bill.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT_NUMBER;
        this.categoryPath = '/shopKinal/v1/category';
        this.productPath = '/shopKinal/v1/product';
        this.userPath = '/shopKinal/v1/user';
        this.authPath = '/shopKinal/v1/auth';
        this.cartPath = '/shopKinal/v1/cart';
        this.purchasePath = '/shopKinal/v1/purchase';
        this.billPath = '/shopKinal/v1/bill';
        this.middlewares();
        this.routes();
        this.conectDB();
        global.loginID = null;
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
        this.app.use(this.productPath, productPath);
        this.app.use(this.userPath, userPath);
        this.app.use(this.authPath, authPath);
        this.app.use(this.cartPath, cartPath);
        this.app.use(this.purchasePath, purchasePath);
        this.app.use(this.billPath, billPath);
    }

    async conectDB() {
        await dbConnection();
    }
}

export default Server;