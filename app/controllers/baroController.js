import baroData from '../services/baroService.js';

const data = baroData();

const getBaroData = async (req, res) => {
    try {
        const response = await baroData();
        res.status(200).json({location: response.location, activation: response.activation, expiry: response.expiry, active: response.active, inventory: response.inventory});
    } catch (err) {
        res.status(500).json({error: 'Internal server error:',err});
    }
}

const getBaroLocation = async (req, res) => {
    try {
        const response = await baroData();
        res.status(200).json({location: response.location});
    } catch (err) {
        res.status(500).json({error: 'Internal server error:',err});
    }
}

const getBaroCountdown = async (req, res) => {
    try {
        const response = await baroData();
        res.status(200).json({activation: response.activation, expiry: response.expiry, active: response.active});
    } catch (err) {
        res.status(500).json({error: 'Internal server error:',err});
    }
}

const getBaroInventory = async (req, res) => {
    try {
        const response = await baroData();
        res.status(200).json({inventory: response.inventory});
    } catch (err) {
        res.status(500).json({error: 'Internal server error:',err});
    }
}

export default {
    getBaroData,
    getBaroLocation,
    getBaroCountdown,
    getBaroInventory,
}