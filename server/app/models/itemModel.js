import db from '../utils/db.js';
import 'dotenv/config';
import queries from '../utils/queries.js';

class ItemModel {
    static async getItemByName(itemName) {
        try{
            const sql = 'SELECT * FROM items WHERE name = $1';
            const params = [itemName];
            
            const result = await db(queries.findItem, params);
            return result[0] || null;
        } catch (err) {
            throw new Error(`Error retreiving item: ${err}`);
        }
    }

    static async getItems() {
        try {
            const result = await db(queries.getItems);
            return result || null;
        } catch (err) {
            throw new Error(`Error retreiving items: ${err}`);
        }
    }

    static async getNewItem() {
        try {
            const result = await db(queries.getNewItem);
            return result || null;
        } catch (err) {
            throw new Error(`Error retreiving new item: ${err}`);
        }
    }

    static async insertNewItem(itemData) {
        try {
            const result = await db(queries.insertItem, [itemData]);
        } catch (err) {
            throw new Error(`Error inserting new item: ${err}`);
        }
    }
}

export default ItemModel;