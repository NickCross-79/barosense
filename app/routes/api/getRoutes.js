import express from 'express';
import ItemController from '../../controllers/itemController.js';
const router = express.Router();
router.use(express.json());

// GET item by name
router.get('/items/:name', ItemController.getItemByName);

// GET all items
router.get('/items', ItemController.getItems);

export default router;
