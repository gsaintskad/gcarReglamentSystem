// src/reglament/reglament.router.ts
import { Router } from 'express';
import * as reglamentController from './reglament.controller.js'; // Note the .js extension

const reglamentRouter = Router();

reglamentRouter.post('/types', reglamentController.addReglamentTypeEndpoint);
reglamentRouter.get('/types', reglamentController.getReglamentTypesEndpoint);
reglamentRouter.post('/cars', reglamentController.assignReglamentToCarEndpoint);
export default reglamentRouter;