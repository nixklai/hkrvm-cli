import inquirer from 'inquirer';
import axios from 'axios';
import chalk from 'chalk';

async function loop() {
    // let is_finished = false;
    const answer = await inquirer.prompt({
        type: 'string',
        name: 'code',
        message: 'Scan a barcode',
    })


    const code = await answer.code.trim();

    if (code.length <= 0){
        return false;
        loop();
    }

    const response = await axios.post('https://www.hkrvm.com.hk/en/barcodeChecking/check', `barcode=${code}`);
    if(!response.data.valid){
        console.log(chalk.red(response.data.msg.title));
    }else{
        console.log(chalk.green(response.data.msg.title));
    }

    loop();
}

loop();