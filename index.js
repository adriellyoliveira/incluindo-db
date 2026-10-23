import http from 'http';
import { pool } from './db.js';

const server = http.createServer(async (request, response) => {
  const [rows] = await pool.query('SELECT * FROM products');

  const lines = rows
    .map((p) => `<tr><td>${p.id}</td><td>${p.name}</td><td>R$ ${p.price}</td></tr>`)
    .join('');

  const html = `
    <!DOCTYPE html>
    <html lang="pt-br">
      <head><meta charset="UTF-8"><title>Products</title></head>
      <body>
        <h1>Products</h1>
        <table>
          <tr><th>ID</th><th>Name</th><th>Price</th></tr>
          ${lines}
        </table>
      </body>
    </html>
  `;

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.end(html);
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});