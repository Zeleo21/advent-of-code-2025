import path from "node:path";
import {fileParser} from "../lib/file-parser.js";



const fillIndexArray = (bank: string): [Array<number>, Array<number>] => {
    const first_index = new Array(10).fill(-1);
    const last_index = new Array(10).fill(-1);
    for (let i = 0; i < bank.length; i++) {
        const currentNumber = parseInt(bank[i]);
        if (first_index[currentNumber] === -1) {
            first_index[currentNumber] = i;
        }
        last_index[currentNumber] = i;
    }
    return [first_index, last_index];
}

const processBank = (bank: string): number => {
    const [first_index, last_index] = fillIndexArray(bank);
    let max_voltage = 0;
    for (let j = 0 ; j < 10; j++){
        for (let k = 0; k < 10; k++){
            if(first_index[j] !== -1 && last_index[k] !== -1){
                if(first_index[j] < last_index[k]){
                    max_voltage = Math.max(max_voltage, j * 10 + k);
                }
            }
        }
    }
    return max_voltage;
}

const processInput = (lines: Array<string>): number => {
    let max_voltage = 0;
    lines.forEach((bank) => {
        max_voltage += processBank(bank);
    })
    return max_voltage;
}

const main = () => {
    const absolutePath = path.resolve('src', 'day3', 'input.txt');
    const lines = fileParser(absolutePath);
    const max_voltage = processInput(lines);
    console.log('Max voltage is : ', max_voltage);
}

main();