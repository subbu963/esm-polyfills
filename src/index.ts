import getCallerFile from 'get-caller-file';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

if ('document' in global) {
    throw new Error('ESM polyfills not supported in browser environment');
}
declare global {
    type __dirname = string;
    type __filename = string;
}

function getFileNameFromUrl(url: string): string {
    return fileURLToPath(url);
}
export function getFileName(): string {
    const url = getCallerFile();
    return getFileNameFromUrl(url);
}
export function getDirName(): string {
    const url = getCallerFile();
    return dirname(getFileNameFromUrl(url));
}
export function _createRequireForFile() {
    const url = getCallerFile();
    return createRequire(url);
}
export function getRequire(modulePath: string) {
    const _require = _createRequireForFile();
    return _require(modulePath);
}
Object.defineProperty(getRequire, 'resolve', {
    get: () => (modulePath: string) => {
        const _require = _createRequireForFile();
        return _require.resolve(modulePath);
    },
});
if (process.env.ESM_POLYFILLS_GLOBAL !== 'false') {
    Object.defineProperty(globalThis, '__filename', {
        get: getFileName,
    });
    Object.defineProperty(globalThis, '__dirname', {
        get: getDirName,
    });
    Object.defineProperty(globalThis, 'require', {
        get: () => getRequire,
    });
}
