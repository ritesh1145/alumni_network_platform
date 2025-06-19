module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',  // blue-600
          light: '#3b82f6',    // blue-500
          dark: '#1d4ed8'      // blue-700
        },
        secondary: {
          DEFAULT: '#4f46e5',  // indigo-600
          light: '#6366f1',    // indigo-500
          dark: '#4338ca'      // indigo-700
        }
      },
    },
  },
  plugins: [],
}