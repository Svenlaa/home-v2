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
export const formatDateToRFC822 = (date: Date): string => {
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC', // Adjust timeZone as needed
    } as const;

    const d = new Date(date.setUTCHours(18, 10));

    return new Intl.DateTimeFormat('en-US', options).format(d);
};
