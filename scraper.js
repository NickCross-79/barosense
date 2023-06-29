import puppeteer from "puppeteer";

const warframeWiki = "https://warframe.fandom.com/wiki/Baro_Ki%27Teer/Trades";

const main = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(warframeWiki);

    await page.$('thead th:last-child').then(async button => {
        await button.click(); 
        await button.click();
    });

    const allItems = await page.evaluate(() => {
        const table = document.querySelector('#mw-content-text table');
        const names = table.querySelectorAll('tr > td:first-child > a:last-child');
        const thumbnails = table.querySelectorAll('tbody tr td:first-child a:first-child img');
        const prices = table.querySelectorAll('tr td:nth-child(3)');
        const lastDates = table.querySelectorAll('tr td:last-child');
        const namesArr = Array.from(names).map(name => name.innerText);
        const thumbnailsArr = Array.from(thumbnails).map(thumbnail => thumbnail.getAttribute('data-src'));
        const pricesArr = Array.from(prices).map(price => price.innerText.split("+"))
        const lastDatesArr = Array.from(lastDates).map(lastDate => {
            date = lastDate.innerText.substr(lastDate.innerText.length - 10)
            if(date == ' (PC only)')
                return lastDate.innerText.substr(lastDate.innerText.length - 20)
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

    console.log(allItems.filter(item => item.name == "Pedestal Prime"));
    await browser.close();
}

main();
