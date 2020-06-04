import db from '../database/connection';

class ItemsRepository {
  async getItems() {
    return db('items').select('*');
  }
}

export default ItemsRepository;
