const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

function sendJSON(res, data) {
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function serveStatic(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const map = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.jsx': 'application/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml'
    };
    res.writeHead(200, { 'Content-Type': map[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url === '/' || url === '/index.html') {
    serveStatic(res, path.join(__dirname, 'public', 'index.html'));
    return;
  }
  if (url.startsWith('/api/listings')) {
    fs.readFile(path.join(__dirname, 'data', 'listings.json'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Server error');
        return;
      }
      const listings = JSON.parse(data);
      // basic filtering by type (ขาย/เช่า)
      const params = new URL('http://localhost' + req.url).searchParams;
      const type = params.get('type');
      const q = params.get('q');
      let out = listings;
      if (type) out = out.filter(l => l.type === type);
      if (q) out = out.filter(l => l.title.toLowerCase().includes(q.toLowerCase()) || l.description.toLowerCase().includes(q.toLowerCase()));
      sendJSON(res, out);
    });
    return;
  }
  // serve files under public/
  const publicPath = path.join(__dirname, 'public', url);
  fs.stat(publicPath, (err, stats) => {
    if (!err && stats.isFile()) {
      serveStatic(res, publicPath);
      return;
    }
    res.writeHead(404);
    res.end('Not found');
  });
});

server.listen(PORT, () => {
  console.log('homelink server running on http://localhost:' + PORT);
});
