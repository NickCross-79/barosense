import pg from 'pg';
import queries from './queries.js';
import 'dotenv/config';
import scraper from '../scraper.js';

const createClient = () => {
    return new pg.Client({
        user: 'postgres',
        host: 'localHost',
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASS,
        port: process.env.DATABASE_PORT,
    });
}

const dropTable = async () => {
    const client = createClient();
    try{
        await client.connect();
        const res = await client.query(queries.dropTable)
        console.log(res.command);
    } catch (err) {
        console.log("Failed to drop table", err);
    } finally {
        await client.end();
    }
}

const createTable = async () => {
    const client = createClient();
    try{
        await client.connect();
        const res = await client.query(queries.createTable)
        console.log(res.command);
    } catch (err) {
        console.log("Failed to create table", err);
    } finally {
        await client.end();
    }
}

const populateTable = async () => {
    const client = createClient();
    try{
        const allItems = await scraper();
        await client.connect();
        for (const item of allItems){
            const res = await client.query(queries.insertItem,[
                item.name,
                item.thumbnail,
                item.ducatPrice,
                item.creditPrice,
                item.lastDate
            ]);
            console.log(res.command);
        }
    } catch (err) {
        console.log("Failed to insert item",err);
    } finally {
        await client.end();
    }
}

const findItem = async (itemName) => {
    const client = createClient();
    try {
        await client.connect();
        const res = await client.query(queries.findItem, [itemName]);
        if(res.rows == 0)
            return -1;
        else
            return res.rowCount;
    } catch (err) {
        console.log("Failed to search for item", err);
    } finally {
        client.end();
    }
}

export default {
    dropTable,
    createTable,
    populateTable,
    findItem
};