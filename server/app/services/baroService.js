import axios from 'axios';
import InventoryModel from '../models/baroModel.js';
import ItemModel from '../models/itemModel.js';

const voidTrader = 'https://api.warframestat.us/pc/voidTrader';

const baroData = async () => {
    try {
        const response = await axios.get(voidTrader);
        return response.data;
    } catch (err) {
        throw new Error('Failed to fetch Baro data');
    }
    
}

const getInventory = async () => {
    try {
        const inventory = await InventoryModel.getInventory();
        return inventory;
    } catch (err) {
        throw new Error('Failed to fetch inventory data');
    }
}

const getNewItem = async () => {
    try {
        const newItem = await ItemModel.getNewItem();
        return newItem;
    } catch (err) {
        throw new Error('Failed to find new item');
    }
} 

export default {
    baroData,
    getInventory,
    getNewItem
}