/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'equitrack-teal': '#2C5F66',
        'equitrack-green': '#1B3D1F',
        'equitrack-navy': '#1A2830',
        'equitrack-cream': '#F5F1E8',
      },
      fontFamily: {
        'jakarta': ['"Plus Jakarta Sans"', 'sans-serif'],
        'fraunces': ['"Fraunces"', 'serif'],
      },
    },
  },
  plugins: [],
}
