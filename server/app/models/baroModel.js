import db from '../utils/db.js';
import 'dotenv/config';
import queries from '../utils/queries.js';

class BaroModel {
    static async getNewItem() {
        try {
            const result = await db(queries.getNewItem);
            return result || null;
        } catch (err) {
            throw new Error(`Error retreiving new item: ${err}`);
        }
    }

    static async getInventory() {
        try {
            const result = await db(queries.getInventory);
            return result || null;
        } catch (err) {
            throw new Error(`Error retreiving new item: ${err}`);
        }
    }
}

export default BaroModel;