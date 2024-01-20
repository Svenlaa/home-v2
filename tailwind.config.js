import { violet, slate } from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export const content = ['**/*.html'];
export const theme = {
  extend: {
    colors: {
      prime: violet,
      neutral: slate,
    },
  },
};
export const plugins = [];
