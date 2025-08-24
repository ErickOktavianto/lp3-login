import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();
app.disable('x-powered-by');

// Healthcheck / debug
app.get('/', (req, res) => res.type('text/plain').send('OK'));

// ===== Helper untuk forward dengan query yang sama =====
function forward(res, base, req) {
  const q = new URLSearchParams(req.query).toString();
  res.redirect(302, base + (q ? `?${q}` : ''));
}

// ====== BRIDGE ROUTES (tidak menyentuh kredensial/sesi) ======

// URL login token → lempar ke domain resmi (token apa adanya)
app.get('/player/growid/login', (req, res) => {
  forward(res, 'https://login.growtopiagame.com/player/growid/login', req);
});

// Endpoint lain di bawah /player/growid/* → ikut dilempar
app.all('/player/growid/*', (req, res) => {
  const target = 'https://login.growtopiagame.com' + req.originalUrl;
  res.redirect(302, target);
});

// Setelah login biasanya ke /player/login/... → lempar juga
app.all('/player/login/*', (req, res) => {
  const target = 'https://login.growtopiagame.com' + req.originalUrl;
  res.redirect(302, target);
});

// Fallback 404
app.use((req, res) => res.status(404).send('<h3>404</h3>'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Bridge listening on', port));
