import { pool } from './db.js';

const server = http.createServer(async (request, response) => {

    const [rows] = await pool.query('SELECT * FROM products');

    const lines = rows.map((p) => `<tr>
                                        <td>${p.id}</td>
                                        <td>${p.name}</td>
                                        <td>R$${p.price}</td>
                                    </tr>`
    ).join('');

    const html = `
    <!DOCTYPE html> 
    <html lang="pt-br">
    <head>
    <meta charset="UTF-8">
    <title>Products</title>
    </head>
    <body>
        <h1>Products</h1>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            ${lines}
            </table>
    </body>
    </html>  `;

    response.writeHead(200, { 'Content-Type': 'text/html' }); response.end(html);
});

server.listen(3000, () => { console.log('Server running at http://localhost:3000'); });






db.js

export const pool = mysql.createPool({  
    host: 'localhost', 
    port: 3306, 
    user: 'root', 
    password: 'sua_senha_aqui', 
    database: 'api_si'
});



test-db.js

//BUSCA DENTRO DO BANCO
//const promessa = pool.query('SELECT * FROM products');
// sem await ele manda apenas o status...
//console.log("1:", promessa);
//await -> aguarda a promisse
//const [ rows ] = await promessa
//console.log("2:", rows);

---


ANOTAÇÕES

três estados:

pending
fulfilled
rejected

await -> escolhi esperar











import http from 'http';

const PORT = 3000

async function routes(req, res) {

    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Not Found - 404</h1>")
        return
    }


    if (req.url === "/products") {

        const [rows] = await pool.query('SELECT * FROM products');

        const lines = rows.map((p) => /* html */ `<tr>
                                                    <td>${p.id}</td>
                                                    <td>${p.name}</td>
                                                    <td>${p.price}</td>
                                                 </tr>`).join(" ");


        const html = /* html */ `
    <!DOCTYPE html> 
    <html lang="pt-br">
    <head>
    <meta charset="UTF-8">
    <title>Products</title>
    </head>
    <body>
        <h1>Products</h1>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            ${lines}
            </table>
    </body>
    </html>  `;

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(lines)
        return
    }

    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Not Found - 404</h1>")
}

const server = http.createServer(routes)

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})