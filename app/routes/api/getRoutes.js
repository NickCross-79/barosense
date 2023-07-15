import express from 'express';
import ItemController from '../../controllers/itemController.js';
const router = express.Router();
router.use(express.json());

// GET item by name
router.get('/item/:name', ItemController.getItemByName);

export default router;
