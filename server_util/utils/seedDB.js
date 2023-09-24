import db from './db.js'
import queries from './queries.js';
import scraper from './scraper.js';
import WarframeItems from 'warframe-items';
import stringSimilarity from 'string-similarity';
import axios from 'axios';

const wfItems = new WarframeItems();

const repopulateDB = async () => {
    try {
        const allItems = await scraper();
        const inventory = await axios.get('https://api.warframestat.us/pc/voidTrader');
        
        for(const item of allItems){
            const nameSearch = stringSimilarity.findBestMatch(item.name, wfItems.map(wfItem => wfItem.name))
            let itemMatched = wfItems[nameSearch.bestMatchIndex];
            
            if(nameSearch.bestMatch.rating < 1) {
                const uniqueNameSearch = stringSimilarity.findBestMatch(item.name, wfItems.map((wfItem) => {
                    const lastIndex = wfItem.uniqueName.lastIndexOf('/');
                    return wfItem.uniqueName.substring(lastIndex + 1);
                }));
                itemMatched = wfItems[nameSearch.bestMatch.rating > uniqueNameSearch.bestMatch.rating ? nameSearch.bestMatchIndex : uniqueNameSearch.bestMatchIndex];
            }
            item.description = itemMatched.description || null;
            item.uniqueName = itemMatched.uniqueName || null;
            item.type = itemMatched.type || null;
            item.wikiLink = itemMatched.wikiaUrl || null;
            item.isTradable = itemMatched.tradable || itemMatched.type === 'Relic' ? true : false;
            item.canMaster = itemMatched.masterable;
            item.masteryReq = itemMatched.masterable ? itemMatched.masteryReq : null;
            item.isMod = (itemMatched.category === 'Mods' ? true : false);
            item.isNew = false;
            if(allItems.findIndex(i => i.name === itemMatched.name) === 0){
                item.isNew = true;
            }
        }

        await db(queries.dropItemsTable);
        //await db(queries.dropInventoryTable);
        await db(queries.createItemsTable);
        //await db(queries.createInventoryTable);

        //TODO: Add fields: mod stat fields..., weapon stat fields...
        for (const item of allItems.reverse()){
            const res = await db(queries.insertItem,[
                item.name,
                item.uniqueName,
                item.description,
                item.type,
                item.ducatPrice,
                item.creditPrice,
                item.wikiLink,
                item.isTradable,
                item.canMaster,
                item.masteryReq,
                item.isMod,
                item.isNew,
                item.lastDate,
                item.thumbnail,
            ]);
        }
        // for (const item of inventory.data.inventory) {
        //     const insert = await db(queries.insertInventory, [item.item]);
        // }
        console.log('DB seeded');
    } catch (err) {
        console.log("Error seeding DB:",err);
    }
}

export default repopulateDB