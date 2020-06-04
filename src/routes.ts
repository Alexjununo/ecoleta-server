import express from 'express';
import ItemsController from './items/ItemsController';
import PointsController from './points/PointsController';

const itemsHandler = new ItemsController();
const pointsHandler = new PointsController();

const routes = express.Router();

/* Items */
routes.get('/items', itemsHandler.getItems);

/* Points */
routes.post('/points', pointsHandler.createPoint);
routes.get('/points', pointsHandler.getPoints);
routes.get('/points/:id', pointsHandler.getPointById);
export default routes;
