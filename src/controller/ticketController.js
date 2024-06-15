const fs = require('fs');
const path = require('path');

const TICKETS_DB = path.join(__dirname, '../database/tickets.json');

function getTicketsData() {
  if (!fs.existsSync(TICKETS_DB)) {
    return { tickets: [] };
  }
  return JSON.parse(fs.readFileSync(TICKETS_DB, 'utf-8'));
}

function saveTicketsData(data) {
  fs.writeFileSync(TICKETS_DB, JSON.stringify(data, null, 2));
}

exports.registerTicket = (req, res) => {
  const { nome, descricao, local, valor, data, tipo } = req.body;

  let ticketsData = getTicketsData();
  const id = ticketsData.tickets.length ? ticketsData.tickets[ticketsData.tickets.length - 1].id + 1 : 1;

  ticketsData.tickets.push({ id, nome, descricao, local, valor, data, tipo });
  saveTicketsData(ticketsData);

  res.send('Ingresso cadastrado com sucesso!');
};

exports.getTickets = (req, res) => {
  const ticketsData = getTicketsData();
  res.json(ticketsData.tickets);
};

exports.deleteTicket = (req, res) => {
  const { nome } = req.body;
  let ticketsData = getTicketsData();
  ticketsData.tickets = ticketsData.tickets.filter(ticket => ticket.nome !== nome);
  saveTicketsData(ticketsData);
  res.send(`Ingresso com nome ${nome} foi deletado.`);
};

exports.updateTicket = (req, res) => {
  const { nome, descricao, local, valor, data, tipo } = req.body;
  let ticketsData = getTicketsData();
  const ticketIndex = ticketsData.tickets.findIndex(ticket => ticket.nome === nome);

  if (ticketIndex === -1) {
    return res.status(400).send('Ingresso não encontrado.');
  }

  ticketsData.tickets[ticketIndex] = {
    id: ticketsData.tickets[ticketIndex].id,
    nome,
    descricao: descricao || ticketsData.tickets[ticketIndex].descricao,
    local: local || ticketsData.tickets[ticketIndex].local,
    valor: valor || ticketsData.tickets[ticketIndex].valor,
    data: data || ticketsData.tickets[ticketIndex].data,
    tipo: tipo || ticketsData.tickets[ticketIndex].tipo
  };

  saveTicketsData(ticketsData);
  res.send(`Ingresso ${nome} foi atualizado.`);
};
