import { exec } from 'node:child_process';
import util from 'node:util';

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const execPromise = util.promisify(exec);
export const run = async (command: string, options: string[] = []) => {
    const { stdout, stderr } = await execPromise(command);
    if (!options.includes('silent')) {
        console.log(stdout, stderr);
    }
};
export const formatDateToRFC822 = (date: Date): string =>
    new Date(date.setUTCHours(18, 10)).toUTCString();
export const formatDateYMD = (date: Date): string => date.toISOString().slice(0, 10);
