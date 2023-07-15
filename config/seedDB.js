import database from './database.js';
import express from 'express';
import {getInventory, getLocation} from '../app/services/baroChecker.js'

const app = express();
app.use(express.json());

// Update 
await database.dropTable();
await database.createTable();
await database.populateTable();

// Get Location
const location = await getLocation();
console.log(location);

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