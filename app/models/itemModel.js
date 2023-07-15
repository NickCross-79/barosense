import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg

const pool = new Pool({
    user: 'postgres',
    host: 'localHost',
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASS,
    port: process.env.DATABASE_PORT,
});

class ItemModel {
    static async getItemByName(itemName) {
        try{
            const query = 'SELECT * FROM items WHERE name = $1';
            const values = [itemName];
            
            const result = await pool.query(query, values);
            return result.rows[0] || null;
        } catch (err) {
            console.log("error in db",err)
            throw new Error(`Error retreiving item: ${err}`);
        }
    }
}

export default ItemModel;