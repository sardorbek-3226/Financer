/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // React fayllarni tekshiradi
    ],
    theme: { extend: {} },
    plugins: [require("daisyui")],
  }
  