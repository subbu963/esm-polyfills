// const getCallerFile = require('get-caller-file');
// const { dirname } = require('node:path');
// const { fileURLToPath } = require('node:url');
import getCallerFile from 'get-caller-file'
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

declare global {
    type __dirname = string;
    type __filename = string;
}

function getFileName(url: string) {
    return fileURLToPath(url);
}

Object.defineProperty(globalThis, '__filename', {
    get: () => {
        const url = getCallerFile();
        return getFileName(url);
    },
    set: () => void 0
});
Object.defineProperty(globalThis, '__dirname', {
    get: () => {
        const url = getCallerFile();
        return dirname(getFileName(url));
    },
    set: () => void 0
});