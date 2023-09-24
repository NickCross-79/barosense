import readline from 'readline';
import repopulateDB from './utils/seedDB.js'
import baroVisitUpdate from './utils/baroVisitUpdate.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function serverMenu() {
    console.log(process.env.DATABASE_NAME)
    rl.question(`
    _________________________
    SERVER CONFIGURATION MENU
    _________________________

    1.  Baro Ki'Teer Visit Update
    2.  Reseed Database
    3.  Exit
    `, async (userInput) => {
        console.log('SELECT OPTION:',userInput);

        switch(userInput) {
            case '1':
                await baroVisitUpdate();
                serverMenu();
                break;
            case '2':
                await repopulateDB();
                serverMenu();
                break;
            case '3':
                rl.close();
                break;
            default:
                serverMenu();
        }
    });
}

serverMenu();