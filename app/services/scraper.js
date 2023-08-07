import axios from 'axios';
import puppeteer from "puppeteer";
import https from 'https';
import concurrencyLimit from 'p-limit';

const warframeWiki = "https://warframe.fandom.com/wiki/Baro_Ki%27Teer/Trades";

const scraper = async () => {
    const browser = await puppeteer.launch({/*headless: false*/});
    const page = await browser.newPage();

    await page.goto(warframeWiki, {timeout: 60000});

    await page.$('thead th:last-child').then(async button => {
        await button.click(); 
        await button.click();
    });

    await page.waitForSelector('tbody tr td:first-child a:first-child img');

    const allItems = await page.evaluate(() => {
        const table = document.querySelector('#mw-content-text');
        const names = table.querySelectorAll('tr > td:first-child > a:last-child');
        const thumbnails = table.querySelectorAll('tbody tr td:first-child a:first-child img');
        const prices = table.querySelectorAll('tr td:nth-child(3)');
        const lastDates = table.querySelectorAll('tr td:last-child');
        const namesArr = Array.from(names).map(name => name.innerText);
        const thumbnailsArr = Array.from(thumbnails).map((thumbnail) => {
            const urlCheck = thumbnail.getAttribute('src').substring(0,5);
            if(urlCheck == 'https') {
                return thumbnail.getAttribute('src');
            } else {
                return thumbnail.getAttribute('data-src');
            }
        });   
        const pricesArr = Array.from(prices).map(price => price.innerText.split(" + "))
        const lastDatesArr = Array.from(lastDates).map(lastDate => {
            const date = lastDate.innerText.substr(lastDate.innerText.length - 10)
            if(date == ' (PC only)')
                return lastDate.innerText.substr(lastDate.innerText.length - 20).replace(" (PC only)", "")
            else if(date.length == 0)
                return null
            else
                return lastDate.innerText.substr(lastDate.innerText.length - 10)
        });
        
        return namesArr.map((item,index) => ({
                name: item,
                thumbnail: thumbnailsArr[index],
                ducatPrice: pricesArr[index][1] ?? '0',
                creditPrice: pricesArr[index][0] ?? '0',
                lastDate: lastDatesArr[index]
        }));
    })
    await browser.close();

    const agent = new https.Agent({
        keepAlive: true,
        maxSockets: 10,
    });

    const updateField = async (item) => {
        try {
            const response = await axios.get(item.thumbnail, {responseType: 'arraybuffer', httpsAgent: agent});
            const imageBuffer = Buffer.from(response.data, 'binary');
            const base64Image = imageBuffer.toString('base64');
            item.thumbnail = base64Image;
        } catch (err) {
            console.log(err);
        }
    }

    const convertImagesToBase64 = async () => {
        for(const item of allItems) {
            await updateField(item);
        }
    }

    await convertImagesToBase64();

    return allItems;
}

export default scraper
