import {fileParser} from "../lib/file-parser.js";
import * as path from 'node:path'


enum Direction {
    LEFT = 'L',
    RIGHT = 'R'
}

const getDirection = (char: string): Direction => {
    return char === 'L' ? Direction.LEFT : Direction.RIGHT;
}

const getRotationNumber = (line: string): number => {
    return parseInt(line.slice(1).trim(), 10);
}

const processLine = (line: string): number => {
    return getRotationNumber(line);
}

const main = () => {
    const absolutePath = path.resolve('src', 'day1', 'input.txt');
    const input = fileParser(absolutePath);
    let dialPoint = 50;
    let totalZeroHits = 0;
    input.forEach((line) => {
        const change = processLine(line);
        for (let i = 0; i < change; i++) {
            if (getDirection(line[0]) === Direction.LEFT) {
                dialPoint = (dialPoint - 1 + 100) % 100;
            } else {
                dialPoint = (dialPoint + 1) % 100;
            }

            if (dialPoint === 0) {
                totalZeroHits++;
            }
        }
    })
    console.log('Number of times the dial point was zero : ', totalZeroHits);
}

main()