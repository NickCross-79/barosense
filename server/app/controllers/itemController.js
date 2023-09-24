import ItemService from "../services/itemService.js";

const itemService = new ItemService();

const getItemByName = async (req, res) => {
    try {
        const item = await itemService.getItemByName(req.params.name);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error:',err});
    }
}

const getItems = async (req, res) => {
    try {
        const items = await itemService.getItems();
        res.status(200).json({items: items});
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error:',err });
    }
}

const getNewItem = async (req, res) => {
    try {
        const newItem = await itemService.getNewItem();
        res.status(200).json(newItem[0]);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error:',err });
    }
}

export default {
    getItemByName,
    getItems,
    getNewItem,
};