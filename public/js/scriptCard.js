document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');

    fetch('http://localhost:3001/tickets')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta do servidor');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos do servidor:', data);  
            if (!Array.isArray(data)) {
                throw new Error('Formato de dados inválido');
            }

            data.forEach(ticket => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.style.cursor = 'pointer'; 
                const cardContent = `
                    <h1 class="titulo">${ticket.nome}</h1>
                    <p class="descricao"><strong>Descrição:</strong> ${ticket.descricao}</p>
                    <p class="local"><strong>Local:</strong> ${ticket.local}</p>
                    <p class="valor"><strong>Valor:</strong> R$${ticket.valor}</p>
                    <p class="data"><strong>Data:</strong> ${ticket.data}</p>
                    <p class="tipo"><strong>Tipo:</strong> ${ticket.tipo}</p>
                `;

                card.innerHTML = cardContent;

                card.addEventListener('click', () => {
                    
                    const userEmail = prompt('Digite seu email:');
                    fetch('http://localhost:3001/addTicketToPedidos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ userEmail, ticketId: ticket.id })
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro ao adicionar o ingresso aos pedidos');
                        }
                        return response.json();
                    })
                    .then(data => {
                        alert('Ingresso adicionado aos pedidos com sucesso');
                        console.log(data);
                    })
                    .catch(error => console.error('Erro ao adicionar o ingresso aos pedidos:', error));
                });

                cardContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Erro ao buscar os dados:', error));
});
