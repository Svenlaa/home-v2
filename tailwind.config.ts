import type { Config } from 'tailwindcss';
import { slate, violet } from 'tailwindcss/colors.js';

export default {
    content: ['static/**/*.html', 'src/**/**/*.tsx'],
    theme: {
        extend: {
            colors: {
                prime: violet,
                neutral: slate,
            },
        },
        fontFamily: {
            sans: [
                'Inter',
                'ui-sans-serif',
                'system-ui',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
                'Noto Color Emoji',
            ],
        },
    },
    plugins: [require('@tailwindcss/typography')],
} satisfies Config;
