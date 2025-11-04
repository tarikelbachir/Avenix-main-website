// Shared Tailwind Config voor alle pagina's
tailwind.config = {
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        navy: {
          dark: 'hsl(217, 33%, 7%)',
          medium: 'hsl(214, 32%, 18%)',
          light: 'hsl(214, 28%, 25%)',
        },
        primary: 'hsl(45, 100%, 51%)',
        'primary-hover': 'hsl(43, 100%, 48%)',
        foreground: 'hsl(210, 40%, 98%)',
        ink: 'hsl(217, 33%, 7%)',
        soft: 'hsl(214, 32%, 18%)',
      },
    }
  }
};

