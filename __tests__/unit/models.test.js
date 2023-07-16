import ItemModel from '../../app/models/itemModel.js'

describe('ItemModel', () => {
    test('fetches an item', async () => {
        const item = await ItemModel.getItemByName('Jolt');

        expect(item.name).toEqual('Jolt');
    });

    test('fetches all items', async () => {
        const item = await ItemModel.getItems();

        expect(item).toBeDefined();
    })
});