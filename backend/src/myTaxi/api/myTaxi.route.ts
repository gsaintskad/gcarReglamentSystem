// src/myTaxi/myTaxi.router.ts
import { Router } from 'express';
import * as myTaxiController from './myTaxi.controller.js'; // Note the .js extension

const myTaxiRouter = Router();

myTaxiRouter.get('/cars', myTaxiController.getCars);

export default myTaxiRouter;