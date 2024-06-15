const express = require('express');

const ticketController = require('../controller/ticketController');


const router = express.Router();
 
const cors = require('cors');
router.use(cors());

const path = require('path');

router.get('/inicio', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/paginaInicial.html'));
});

router.get('/log', (req, res) => {
  res.render('login');
});

router.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

router.get('/logado',(req, res) =>{
  res.render('paginaLogada')
});

router.get('/pedidos',(req, res) =>{
  res.render('pedidos')
});

router.get('/cadEmpresa',(req, res) =>{
  res.render('cadAdm')
});

router.get('/opPagamento/',(req, res) =>{

  res.render('opcaoPagamento')
});

router.get('/dinheiro',(req, res) =>{

  res.render('dinheiro')
});

router.get('/opPagamento/',(req, res) =>{

  res.render('opcaoPagamento')
});

router.get('/finalPagamento',(req, res) =>{

  res.render('finalPagamento')
});

router.get('/cartao',(req, res) =>{

  res.render('cartao')
});

router.get('/pix',(req, res) =>{

  res.render('pix')
});

router.get('/perfil', (req, res) =>{
  res.render('perfil')
})





router.post('/tickets', ticketController.registerTicket);
router.get('/tickets', ticketController.getTickets);
router.delete('/tickets', ticketController.deleteTicket);
router.put('/tickets', ticketController.updateTicket);



module.exports = router;



