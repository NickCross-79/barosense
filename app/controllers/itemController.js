import ItemService from "../models/itemModel.js";

const getItemByName = async (req, res) => {
    try {
        const item = await ItemService.getItemByName(req.params.name);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error:',err})
    }
}

export default {
    getItemByName
};