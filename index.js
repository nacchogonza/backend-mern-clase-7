import express from 'express';
import fs from 'fs';

const app = express();

let visitasItems = 0;
let visitasItemRandom = 0;

app.get('/items', (req, res) => {
  visitasItems++;
  const data = fs.readFileSync('./productos.txt', 'utf-8', (error) => {
    if (error) {
      console.log(`Error: ${error.message}`)
    }
  });
  const dataJson = JSON.parse(data);
  res.json({
    items: dataJson,
    cantidad: dataJson.length
  });
})

app.get('/item-random', (req, res) => {
  visitasItemRandom++;
  const data = fs.readFileSync('./productos.txt', 'utf-8', (error, contenido) => {
    if (error) {
      console.log(`Error: ${error.message}`)
    }
  });
  const dataJson = JSON.parse(data);
  const largo = dataJson.length
  res.json({item: dataJson[parseInt(Math.random()*largo)]})
})

app.get('/visitas', (req, res) => {
  res.json({visitas: { items: visitasItems, item: visitasItemRandom }})
})
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`servidor inicializado en ${server.address().port}`)
})

server.on("error", error => console.log(`error en el servidor: ${error.message}`))