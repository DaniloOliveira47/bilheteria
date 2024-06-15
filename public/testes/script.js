document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('eventoForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const local = document.getElementById('local').value;
    const valor = document.getElementById('valor').value;
    const data = document.getElementById('data').value;
    const tipo = document.getElementById('tipo').value;

    
    const ticket = {
      nome,
      descricao,
      local,
      valor,
      data,
      tipo
    };

    
    fetch('http://localhost:3001/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticket)
    })
    .then(response => response.text())
    .then(data => {
      console.log(data); 
      alert('Dados enviados com sucesso!');
    })
    .catch(error => {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao enviar dados. Verifique o console para mais informações.');
    });
  });
});
