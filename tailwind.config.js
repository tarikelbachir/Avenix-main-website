/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./diensten/*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Zwart & Geel kleurenschema (Optie 1)
        navy: {
          dark: 'hsl(217, 33%, 7%)',    // Donkerblauw-grijs (was pure zwart)
          medium: 'hsl(217, 32%, 12%)', // Iets lichter (was 8%)
          light: 'hsl(217, 28%, 18%)',  // Medium grijs (was 15%)
        },
        primary: 'hsl(45, 100%, 51%)',     // Geel (blijft hetzelfde)
        'primary-hover': 'hsl(43, 100%, 48%)', // Geel hover (blijft hetzelfde)
        foreground: 'hsl(0, 0%, 98%)',  // Bijna wit (was: hsl(210, 40%, 98%))
        ink: 'hsl(0, 0%, 0%)',          // Zwart (was: hsl(217, 33%, 7%))
        soft: 'hsl(0, 0%, 20%)',        // Grijs (was: hsl(214, 32%, 18%))
      },
      dropShadow: {
        glow: '0 0 24px rgba(255, 204, 3, 0.35)'
      },
      backgroundImage: {
        // Aangepaste grid met donkerblauw-grijze tinten
        grid: 'radial-gradient(ellipse at 20% 10%, rgba(255,204,3,.08), transparent 40%), radial-gradient(ellipse at 80% 30%, rgba(255,255,255,.06), transparent 40%), linear-gradient(180deg, hsl(217, 33%, 7%) 0%, hsl(217, 32%, 12%) 100%)',
      },
    }
  },
  plugins: [],
}

