import axios from 'axios';

const voidTrader = 'https://api.warframestat.us/pc/voidTrader';

const getInventory = async () => {
    const response = await axios.get(voidTrader);
    console.log(response.data.inventory);
}

getInventory();