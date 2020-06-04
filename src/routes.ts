import express from 'express';
import itemsController from './items/ItemsController';
import pointsController from './points/PointsController';

const routes = express.Router();

/* Items */
routes.get('/items', itemsController.getItems);

/* Points */
routes.post('/points', pointsController.createPoint);
routes.get('/points', pointsController.getPoints);
routes.get('/points/:id', pointsController.getPointById);
export default routes;
