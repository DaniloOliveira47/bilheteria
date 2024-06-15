const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const router = require('./src/router/router');
const routerU = require('./src/router/users');
const routerCombined = require('./src/router/combined');


const app = express();
const porta = 3001;
const DATABASE = path.join(__dirname, '/src/database/users.json');
const DATABASE2 = path.join(__dirname, '/src/database/tickets.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'seuSegredoAqui',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use(express.static("public"));
app.use("/", router);
app.use("/", routerU);
app.use("/", routerCombined);

app.set('view engine', 'ejs');
app.set('views', 'src/view/');


function initDb() {
  if (!fs.existsSync(DATABASE)) {
    fs.writeFileSync(DATABASE, JSON.stringify({ users: [] }, null, 8));
  }
}

function initDb2() {
  if (!fs.existsSync(DATABASE2)) {
    fs.writeFileSync(DATABASE2, JSON.stringify({ tickets: [] }, null, 5));
  }
}

app.listen(porta, () => {
  initDb();
  initDb2();
  console.log(`Serviço executado na porta ${porta} http://localhost:${porta}/log`);
});
