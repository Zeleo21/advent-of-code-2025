import * as fs from 'node:fs';

export const fileParser = (path: string): Array<string> => {
    const fileContent = fs.readFileSync(path, 'utf-8');
    return fileContent.split('\n').map((line: string) => line.trim()).filter((line) => line.length > 0);
}