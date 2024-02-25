import util from 'node:util';
import { exec } from 'node:child_process';

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const execPromise = util.promisify(exec);
export const run = async (command: string, options: string[] = []) => {
    const { stdout, stderr } = await execPromise(command);
    if (!options.includes('silent')) {
        console.log(stdout, stderr);
    }
};
