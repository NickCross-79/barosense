import pg from 'pg';
import pkg from 'pg';
const { Pool } = pkg
import queries from '../app/utils/queries.js';
import 'dotenv/config';
import scraper from '../app/services/scraper.js';

const pool = new Pool({
    user: 'postgres',
    host: 'localHost',
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASS,
    port: process.env.DATABASE_PORT,
});

export default pool;
