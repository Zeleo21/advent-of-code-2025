import path from "node:path";
import {fileParser} from "../lib/file-parser.js";


const isRepeatingPattern = (val: string): boolean => {
    const midPart = val.length / 2;
    const firstPart = val.slice(0, midPart);
    const secondPart = val.slice(midPart, val.length);
    return firstPart === secondPart;
}

const isRepeatingPatternV2 = (val: string): boolean => {
    if(val.length < 2) return false;
    const midPart = val.length / 2;
    let foundPattern = false;
    for(let i = 0 ; i < midPart; i++) {
        const charactersToCheck = val.slice(0, i + 1);
        foundPattern = true;
        for(let j = i + 1; j < val.length; j += charactersToCheck.length) {
            const currentCharacters = val.slice(j, j + charactersToCheck.length);
            if(currentCharacters !== charactersToCheck) {
                foundPattern = false;
                break;
            }
        }
        if(foundPattern === true) return true;
    }
    return false;
}


const processRange = (range: string): number => {
    const [leftInterval, rightInterval] = range.split('-');
    const leftIntervalNbr = parseInt(leftInterval);
    const rightIntervalNbr = parseInt(rightInterval);
    const diff = rightIntervalNbr - leftIntervalNbr;
    let res = 0;
    for(let i = leftIntervalNbr; i < leftIntervalNbr + diff + 1; i++) {
       res += isRepeatingPatternV2(i.toString()) ? i : 0;
    }
    return res
}


const processRanges = (input: string): number => {
    const ranges = input.split(',');
    let res = 0;
    ranges.forEach((range) => {
        res += processRange(range);
    })
    return res;
}

const main = () => {
    const absolutePath = path.resolve('src', 'day2', 'input.txt');
    const input = fileParser(absolutePath);
    const res = processRanges(input[0]);
    console.log('The result is : ', res);
}


main()