/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0056b3", // Azul Claro
        secondary: "#c9a02b", // Dourado
        background: "#e0e0e0", // Cinza Claro
        surface: "#ffffff", // Branco
        error: "#b00020", // Vermelho para erros (padrão)
        textPrimary: "#002147", // Azul Escuro para textos principais
        textSecondary: "#757575", // Cinza para textos secundários

        // Discipline colors
        disciplineHistoriaBrasil: "#FF6B6B",
        disciplineHistoriaMundial: "#4ECDC4",
        disciplineGeografia: "#1A535C",
        disciplinePoliticaInternacional: "#FFE66D",
        disciplineEconomia: "#6C5B7B",
        disciplineDireito: "#F7B801",
        disciplinePortugues: "#F67280",
        disciplineIngles: "#355C7D"
      }
    },
  },
  plugins: [],
}
