import axios from 'axios';

const voidTrader = 'https://api.warframestat.us/pc/voidTrader';

const getLocation = async () => {
    const response = await axios.get(voidTrader);
    return response.data.location;
}

const getInventory = async () => {
    const response = await axios.get(voidTrader);
    return response.data.inventory;
}

export {
    getLocation,
    getInventory
};