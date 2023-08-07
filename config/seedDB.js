import db from '../app/utils/db.js'
import queries from '../app/utils/queries.js';
import scraper from '../app/services/scraper.js';

const repopulateItemsTable = async () => {
    const allItems = await scraper();
    await db(queries.dropTable);
    await db(queries.createTable);
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

await repopulateItemsTable().then(() => {
    console.log('DB seeded');
});