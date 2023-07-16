import ItemService from '../../app/services/itemService.js';

describe('ItemService', () => {
    test('retrieves an item by name', async () => {
        const itemName = 'Jolt';
        const itemService = new ItemService();

        const item = await itemService.getItemByName(itemName);
        expect(item).toBeDefined();
        expect(item.name).toBe(itemName);
    });
});