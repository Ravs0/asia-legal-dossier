# Asia Legal Dossier - AI-Powered Legal Intelligence

Interactive pitch-deck style intelligence dashboard mapping 13 booming legal systems across Asia and the Middle East, powered by DeepSeek AI.

## Features

### 🤖 AI Legal Intelligence
- DeepSeek AI-powered search and analysis
- Ask questions about any jurisdiction, firm, or arbitrage opportunity
- Quick queries for market timing, talent insights, and competitive landscape

### 🗺️ Geographic Visualization
- Interactive Asia-Pacific map with clickable countries
- Color-coded by legal momentum (1-10 scale)
- Zoom, pan, and pulse markers for high-momentum markets

### 📊 Pitch Intelligence Data
- **Deal Flow**: Annual deal values, top sectors, active PE firms
- **Insider Intel**: Winning/losing firms, hidden opportunities, red flags, market timing
- **Competitive Landscape**: Tier 1/2 firms, boutiques, new entrants
- **Arbitrage Opportunities**: Risk-rated plays with expected returns
- **Partner Intel**: Partner counts, growth, lateral movement, years to partner
- **Client Intel**: Key clients, spending trends, procurement changes

## Stack
- React + TypeScript + Vite
- TailwindCSS with dark Gotham theme
- DeepSeek AI API integration
- react-simple-maps for geographic visualization
- Vercel serverless functions for AI proxy

## Data Coverage (13 Jurisdictions)
Saudi Arabia, UAE, China, Hong Kong, Singapore, Vietnam, Indonesia, Philippines, Japan, South Korea, India, Malaysia, Thailand, Australia

## Run locally
```bash
npm install
npm run dev
```

## Environment Variables
Create `.env.local`:
```
DEEPSEEK_API_KEY=your_deepseek_api_key
```

## Deploy to Vercel
1. Connect GitHub repo to Vercel
2. Add `DEEPSEEK_API_KEY` to Environment Variables in Vercel Dashboard
3. Deploy!

## GitHub Repo
https://github.com/Ravs0/asia-legal-dossier
