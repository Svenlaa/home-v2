import { slate, violet } from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export const content = ['static/**/*.html', 'src/**/*.tsx'];
export const theme = {
    extend: {
        colors: {
            prime: violet,
            neutral: slate,
        },
    },
};
export const plugins = [];
