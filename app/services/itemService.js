import Item from '../models/itemModel.js';

class ItemService {
    async getItemByName(itemName) {
        try {
            const item = await Item.getItemByName(itemName);
            return item;
        } catch (err) {
            throw new Error('Failed to find item');
        }
    }

    async getItems() {
        try {
            const items = await Item.getItems();
            return items;
        } catch (err) {
            throw new Error('Failed to find items');
        }
    }
}

export default ItemService;