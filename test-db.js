import { pool } from './db.js';

const [ inserir ] = await pool.query("INSERT INTO  products(name, price) VALUES (?, ?)",
    ["Headset", 250]
)
console.log(result)