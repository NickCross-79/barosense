import Items from 'warframe-items';
import axios from 'axios';
import stringSimilarity, {compareTwoStrings} from 'string-similarity'

const items = new Items();
try {
    const item = items.find(item => item.name == `Hood Duviri Operator`);
    const image = await axios.get(`https://cdn.warframestat.us/img/${item.imageName}`, {responseType: 'arraybuffer'});
    const imageDataBuffer = Buffer.from(image.data);
    const ohma = items.find((item) => {
        return item.uniqueName.includes("Crp Prisma Tonfa".replace(/ /gi,'')) || item.name == 'Prisma Ohma'
    });
    console.log(Object.keys(item));
    console.log(item.name)
    console.log(item.uniqueName);
    console.log(item.category)
    console.log(item.type)
    console.log(item.tradable)
    //fs.writeFileSync('item.png', imageDataBuffer);
} catch (err) {
    console.log('Error:'+err);
}
