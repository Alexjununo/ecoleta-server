import { Request, Response } from 'express';
import knex from '../database/connection';
import pointsRepository from './PointsRepository';

class PointsController {
  async createPoint(req: Request, res: Response) {
    const transaction = await knex.transaction();

    const point = {
      image: 'image-fake',
      ...req.body,
    };

    await transaction.commit();

    const result = await pointsRepository.createPoint(point, transaction);

    return res.json(result);
  }

  async getPointById(req: Request, res: Response) {
    const { id } = req.params;

    const point = await pointsRepository.getPointById(Number(id));

    if (!point) return res.status(404).json({ message: 'Point not found' });

    return res.json(point);
  }

  async getPoints(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()));

    const points = await pointsRepository.getPoints(
      parsedItems,
      String(city),
      String(uf)
    );

    return res.json(points);
  }
}

export default new PointsController();
