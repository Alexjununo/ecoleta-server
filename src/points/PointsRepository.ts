import db from '../database/connection';
import { Transaction } from 'knex';

class PointsRepository {
  async createPoint(point: any, transaction: Transaction) {
    let pointItems = point.items;

    delete point.items;

    const insertedIds = await transaction('points').insert(point);
    const point_id = insertedIds[0];

    pointItems = point.items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    await transaction('point_items').insert(pointItems);

    return { id: point_id, ...point };
  }

  async getPointById(id: number) {
    const point = await db('points').where('id', id).first();

    const items = await db('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return { ...point, items };
  }

  async getPoints(items_id: number[], city: String, uf: String) {
    const points = await db('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', items_id)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    return points;
  }
}

export default PointsRepository;
