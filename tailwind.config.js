/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {colors: {
      primary: "#0056b3", // Azul Claro
      secondary: "#c9a02b", // Dourado
      background: "#e0e0e0", // Cinza Claro
      surface: "#ffffff", // Branco
      error: "#b00020", // Vermelho para erros (padrão)
      textPrimary: "#002147", // Azul Escuro para textos principais
      textSecondary: "#757575" // Cinza para textos secundários
    }},
  },
  plugins: [],
}
