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
    },
    plugins: [require('@tailwindcss/typography')],
} satisfies Config;
