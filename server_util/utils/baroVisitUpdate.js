import ItemModel from '../models/itemModel.js';
import Items from 'warframe-items';
import queries from './queries.js';
import db from './db.js';
import axios from 'axios';
import stringSimilarity, { compareTwoStrings } from 'string-similarity';

const wfItems = new Items();

const baroVisitUpdate = async () => {
    try {

    
        // Fetch current Baro Inventory and all items in db
        const baroData = await axios.get('https://api.warframestat.us/pc/voidTrader');
        const inventory = baroData.data.inventory;
        const allItems = await ItemModel.getItems();

        // Find new item in baro inventory
        // const newBaroItem = inventory.filter((item) => {
        //     return !allItems.find((dbItem) => {
        //         const lastIndex = dbItem.unique_name.lastIndexOf('/');
        //         const rating = Math.max(stringSimilarity.compareTwoStrings(dbItem.name,item.item),stringSimilarity.compareTwoStrings(dbItem.unique_name.substring(lastIndex + 1), item.item))
        //         if(rating > 0.45) console.log(dbItem.unique_name.substring(lastIndex + 1))
        //         return rating > 0.60;
        //     });
        // });
        //console.log('inventory:',inventory);
        //console.log(newBaroItem);    
        const newBaroItem = inventory[0]
        // Find new item in wfItems library
        const newItem = findItemData(newBaroItem.item);


        // Base64 data for image from CDN
        const newThumbnail = await axios.get(`https://cdn.warframestat.us/img/${newItem.imageName}`, {responseType: 'arraybuffer'});
        const imageDataBuffer = Buffer.from(newThumbnail.data, 'binary');
        const base64Image = imageDataBuffer.toString('base64');
        
        const currentDate = new Date().toISOString().slice(0, 10);

        //Build item to insert
        const newItemToInsert = {
            name: newItem.name,
            uniqueName: newItem.uniqueName || null,
            description: newItem.description || null,
            type: newItem.type || null,
            ducatPrice: newBaroItem.ducats,
            creditPrice: newBaroItem.credits,
            wikiLink: newItem.wikiaUrl || null,
            isTradable: newItem.tradable,
            canMaster: newItem.masterable,
            masteryReq: newItem.masteryReq || null,
            isMod: (newItem.category === 'Mods' ? true : false),
            isNew: true,
            lastDate: currentDate,
            thumbnail: base64Image,
        }

        // Store new item
        await ItemModel.replaceNewItem();
        await ItemModel.insertNewItem(newItemToInsert);

        // Store inventory
        await db(queries.dropInventoryTable);
        await db(queries.createInventoryTable);
        for(const item of inventory) {
            const itemFound = findItemData(item.item); 
            await db(queries.insertInventory, [itemFound.name, itemFound.uniqueName]);
        }

        // Update last_date field of items brought by Baro
        for(const item of inventory) {
            const itemFound = findItemData(item.item);
            await ItemModel.updateItemDate(itemFound.uniqueName, currentDate);
        }

        function findItemData(item) {
            const nameSearch = stringSimilarity.findBestMatch(item, wfItems.map(wfItem => wfItem.name))
                let itemMatched = wfItems[nameSearch.bestMatchIndex];
                
                if(nameSearch.bestMatch.rating < 1) {
                    const uniqueNameSearch = stringSimilarity.findBestMatch(item, wfItems.map((wfItem) => {
                        const lastIndex = wfItem.uniqueName.lastIndexOf('/');
                        return wfItem.uniqueName.substring(lastIndex + 1);
                    }));
                    itemMatched = wfItems[nameSearch.bestMatch.rating > uniqueNameSearch.bestMatch.rating ? nameSearch.bestMatchIndex : uniqueNameSearch.bestMatchIndex];
                }
            return itemMatched
        }
    } catch (err) {
        console.log(err)
    }
}
export default baroVisitUpdate; 