require("dotenv").config();
const express = require("express");
const massive = require("massive");
let products_controller = require("./products_controller");
const pc = products_controller;

const app = express();

const { CONNECTION_STRING, SERVER_PORT } = process.env;

massive(CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
    console.log("db connected");
  })
  .catch(err => console.log(err));


app.use(express.json());

app.post("/api/products", pc.create);
app.get('/api/products', pc.getAll);
app.get('/api/products/:id', pc.getOne);
app.put('/api/products/:id', pc.update);
app.delete('/api/products/:id', pc.delete);


app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}.`);
});
