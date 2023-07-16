//import database from './database.js';
import db from '../app/utils/db.js'
import queries from '../app/utils/queries.js';
import scraper from '../app/services/scraper.js';
import express from 'express';
import {getInventory, getLocation} from '../app/services/baroChecker.js'

const repopulateItemsTable = async () => {
    await db(queries.dropTable);
    await db(queries.createTable);
    const allItems = await scraper();
    for (const item of allItems){
        const res = await db(queries.insertItem,[
            item.name,
            item.thumbnail,
            item.ducatPrice,
            item.creditPrice,
            item.lastDate
        ]);
    }
}

await repopulateItemsTable();

// Get Location
// const location = await getLocation();
// console.log(location);

// Get new item
// const inventory = await getInventory();
// console.log(inventory);
// for(const item of inventory){
//     if(await database.findItem(item.item) == -1)
//         console.log("The new item this week is: ",item);
//         break;
// }

// Find item
//await database.findItem("Volcanic");