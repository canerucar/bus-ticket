module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'white': '#ffffff',
      'branding-blue': '#2F4EB4',
      'branding-blue-100': '#192289',
      'branding-blue-200': '#3640B1',
      'branding-gray': '#5D686E',
      'branding-gray-100': '#083145',
      'branding-gray-200': '#F8F8F8',
      'branding-gray-300': '#9D9D9C',
      'branding-gray-400': '#F3F3F3',
      'branding-gray-500': '#B4B4B4',
      'branding-red': '#D23B38',
    },
    fontFamily: {
      'sans-regular': ['Open Sans', 'Regular', 'Arial', 'sans-serif'],
      'sans-semibold': ['Open Sans', 'SemiBold', 'Arial', 'sans-serif'],
      'roboto-regular': ['Roboto', 'Regular', 'Arial', 'sans-serif'],
      'roboto-medium': ['Roboto', 'Medium', 'Arial', 'sans-serif'],
    }
  },
  plugins: [],
}
