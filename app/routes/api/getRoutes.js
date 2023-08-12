import express from 'express';
import ItemController from '../../controllers/itemController.js';
import BaroController from '../../controllers/baroController.js';

const router = express.Router();
router.use(express.json());

// GET Baro data
router.get('/baro', BaroController.getBaroData);

// GET Baro location
router.get('/baro/location', BaroController.getBaroLocation);

// GET Baro countdown
router.get('/baro/countdown', BaroController.getBaroCountdown);

// GET Baro inventory
router.get('/baro/inventory', BaroController.getBaroInventory);

// GET newest item
router.get('/baro/inventory/newItem', ItemController.getNewItem);

// GET item by name
router.get('/items/:name', ItemController.getItemByName);

// GET all items
router.get('/items', ItemController.getItems);

export default router;
