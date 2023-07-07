import database from './database/database.js';
import {getInventory, getLocation} from './baroChecker.js'

// Update 
// await database.dropTable();
// await database.createTable();
// await database.populateTable();

// Get Location
const location = await getLocation();
console.log(location);

// Get new item
//const inventory = await getInventory();
//console.log(inventory);
// for(const item of inventory){
//     if(await database.findItem(item.item) == -1)
//         console.log("The new item this week is: ",item);
//         break;
// }

// Find item
//await database.findItem("Volcanic");