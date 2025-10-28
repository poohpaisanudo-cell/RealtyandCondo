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
      '.css': 'text/css; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.svg': 'image/svg+xml',
    };

    res.writeHead(200, { 'Content-Type': map[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  // ถ้าเปิด / ให้ส่ง condo.html กลับไป
  let filePath = '';
  if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(__dirname, 'public', 'condo.html');
  } else {
    // อื่น ๆ ดึงไฟล์จากโฟลเดอร์ public
    filePath = path.join(__dirname, 'public', req.url);
  }

  serveStatic(res, filePath);
});

server.listen(PORT, () => {
  console.log(`Homelink server running on http://localhost:${PORT}`);
});
