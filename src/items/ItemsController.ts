import { Request, Response } from 'express';
import itemsRepository from './ItemsRepository';

class ItemsController {
  async getItems(req: Request, res: Response) {
    const items = await itemsRepository.getItems();

    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        name: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`,
      };
    });

    return res.json(serializedItems);
  }
}

export default new ItemsController();
