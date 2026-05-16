# SLIM Subsidie Advies — App

## Projectstructuur
```
slim-app/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx       ← de volledige app
│   └── index.js      ← React entry point
├── package.json
├── vercel.json
└── README.md
```

## Deployen via Vercel
1. Upload deze hele map naar GitHub
2. Koppel de repository aan Vercel (vercel.com)
3. Vercel herkent automatisch dat het een React app is
4. Koppel je domein slimsubsidieadvies.nl in Vercel → Domains

## Lokaal testen
```bash
npm install
npm start
```
