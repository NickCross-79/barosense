import ItemService from "../services/itemService.js";

const getItemByName = async (req, res) => {
    try {
        const itemService = new ItemService();
        const item = await itemService.getItemByName(req.params.name);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error:',err})
    }
}

export default {
    getItemByName
};