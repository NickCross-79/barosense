import ItemService from '../../app/services/itemService.js';

const itemService = new ItemService();

describe('ItemService', () => {
    test('retrieves an item by name', async () => {
        const itemName = 'Jolt';

        const item = await itemService.getItemByName(itemName);

        expect(item).toBeDefined();
        expect(item.name).toBe(itemName);
    });

    test('returns all items', async () => {
        const items = await itemService.getItems();

        expect(items).toBeDefined();
    })
});