import axios from 'axios';

const voidTrader = 'https://api.warframestat.us/pc/voidTrader';

const baroData = async () => {
    try {
        const response = await axios.get(voidTrader);
        return response.data;
    } catch (err) {
        throw new error ('Failed to fetch Baro data');
    }
    
}

export default baroData;