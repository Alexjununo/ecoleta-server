import express from 'express';
import ItemsController from './controllers/ItemsController';
import PointsController from './controllers/PointsController';

const itemsHandler = new ItemsController();
const pointsHandler = new PointsController();

const routes = express.Router();

routes.get('/items', itemsHandler.getItems);

routes.post('/points', pointsHandler.createPoint);
routes.get('/points', pointsHandler.getPoints);
routes.get('/points/:id', pointsHandler.getPointById);
export default routes;
