# Futuro - Mercados de Previsão

## Overview
A Brazilian prediction markets platform built with React, Vite, and TypeScript. Users can browse and trade on various prediction markets across categories like Economy, Politics, Technology, Sports, and more.

## Project Architecture
- **Frontend**: React 19 with Vite bundler
- **Styling**: Tailwind CSS (CDN-based)
- **UI Components**: Custom components with Lucide React icons
- **Charts**: Recharts library
- **AI Integration**: Google Gemini API for AI insights

## Key Files
- `index.html` - Entry point with Tailwind configuration
- `index.tsx` - React app bootstrap
- `App.tsx` - Main application component
- `components/` - React components (Navbar, MarketCard, MarketChart, TradePanel, AIInsight)
- `services/geminiService.ts` - Gemini AI service
- `constants.ts` - Mock markets and initial user data
- `types.ts` - TypeScript type definitions

## Development
The app runs on port 5000 with Vite dev server:
```bash
npm run dev
```

## Environment Variables
- `GEMINI_API_KEY` - Required for AI insights feature

## Deployment
Static deployment with Vite build:
- Build: `npm run build`
- Output: `dist/` directory
