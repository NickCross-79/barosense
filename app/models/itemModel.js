import db from '../utils/db.js';
import pkg from 'pg';
import 'dotenv/config';
const { Pool } = pkg

class ItemModel {
    static async getItemByName(itemName) {
        try{
            const sql = 'SELECT * FROM items WHERE name = $1';
            const params = [itemName];
            
            const result = await db(sql, params);
            return result[0] || null;
        } catch (err) {
            throw new Error(`Error retreiving item: ${err}`);
        }
    }
}

export default ItemModel;