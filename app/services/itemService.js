import Item from '../models/itemModel.js';

class ItemService {
    async getItemByName(itemName) {
        try {
            const item = await Item.getItemByName(itemName);
            console.log(item)
            return item;
        } catch (err) {
            throw new Error('Failed to find item');
        }
    }
}

export default ItemService;