import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'from-blue-500', 'to-cyan-400', 'text-blue-400', 'border-blue-500/30', 'bg-blue-500/10', 'hover:border-blue-500/60', 'shadow-blue-500/20',
    'from-emerald-500', 'to-teal-400', 'text-emerald-400', 'border-emerald-500/30', 'bg-emerald-500/10', 'hover:border-emerald-500/60', 'shadow-emerald-500/20',
    'from-indigo-500', 'to-purple-400', 'text-indigo-400', 'border-indigo-500/30', 'bg-indigo-500/10', 'hover:border-indigo-500/60', 'shadow-indigo-500/20',
    'from-red-500', 'to-rose-400', 'text-red-400', 'border-red-500/30', 'bg-red-500/10', 'hover:border-red-500/60', 'shadow-red-500/20',
    'from-orange-500', 'to-amber-400', 'text-orange-400', 'border-orange-500/30', 'bg-orange-500/10', 'hover:border-orange-500/60', 'shadow-orange-500/20',
    'from-teal-500', 'to-emerald-400', 'text-teal-400', 'border-teal-500/30', 'bg-teal-500/10', 'hover:border-teal-500/60', 'shadow-teal-500/20',
    'from-cyan-500', 'to-blue-400', 'text-cyan-400', 'border-cyan-500/30', 'bg-cyan-500/10', 'hover:border-cyan-500/60', 'shadow-cyan-500/20',
    'from-sky-500', 'to-indigo-400', 'text-sky-400', 'border-sky-500/30', 'bg-sky-500/10', 'hover:border-sky-500/60', 'shadow-sky-500/20',
    'from-green-500', 'to-lime-400', 'text-green-400', 'border-green-500/30', 'bg-green-500/10', 'hover:border-green-500/60', 'shadow-green-500/20',
    'from-violet-500', 'to-fuchsia-400', 'text-violet-400', 'border-violet-500/30', 'bg-violet-500/10', 'hover:border-violet-500/60', 'shadow-violet-500/20',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'glass-glow': 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.12), transparent 70%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
