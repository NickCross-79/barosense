import pool from '../../config/database.js';

const db = async (sql, params) => {
    try {
        const client = await pool.connect();
        const result = await client.query(sql,params);
        client.release();
        return result.rows;
    } catch (err) {
        throw new Error(`Error executing query: ${err}`);
    }
};

export default db;
