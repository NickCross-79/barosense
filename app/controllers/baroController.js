import baroData from '../services/baroService.js';

const data = baroData();

const getBaroData = async (req, res) => {
    try {
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({error: 'Internal server error:',err});
    }
}

const getBaroLocation = async (req, res) => {
    try {
        res.status(200).json({location: data.location});
    } catch (err) {
        res.status(500).json({error: 'Internal server error:',err});
    }
}

const getBaroCountdown = async (req, res) => {
    try {
        res.status(200).json({activation: data.activation, expiry: data.expiry, active: data.active});
    } catch (err) {
        res.status(500).json({error: 'Internal server error:',err});
    }
}

const getBaroInventory = async (req, res) => {
    try {
        res.status(200).json({inventory: data.inventory});
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