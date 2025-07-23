// src/reglament/reglament.router.ts
import { Router } from 'express';
import * as reglamentController from './reglament.controller.js'; // Note the .js extension

const reglamentRouter = Router();

reglamentRouter.post('/add-type', reglamentController.addReglamentTypeEndpoint);

export default reglamentRouter;