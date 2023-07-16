import pkg from 'pg';
const { Pool } = pkg
import 'dotenv/config';

const pool = new Pool({
    user: 'postgres',
    host: 'localHost',
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASS,
    port: process.env.DATABASE_PORT,
});

export default pool;
