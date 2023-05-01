// Criando uma conexão WebSocket com o servidor
const socket = new WebSocket('ws://localhost:3000');

// Lidando com a abertura da conexão
socket.addEventListener('open', (event) => {
    console.log('Conexão estabelecida');
});

// Lidando com a recepção de mensagens do servidor
socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);

    // Exibindo o resultado do cálculo na interface do usuário
    const valor1 = document.getElementById('value1').value;
    const valor2 = document.getElementById('value2').value;
    const operacao = document.getElementById('operacao').value;
    const resultDiv = document.getElementById('resultado');

    resultDiv.innerHTML = `Resultado: ${valor1} ${operacao} ${valor2} é ${data.resultado}`;

});

// Lidando com o envio dos valores informados pelo usuário
const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const valor1 = Number(document.getElementById('value1').value);
    const valor2 = Number(document.getElementById('value2').value);
    const operacao = document.getElementById('operacao').value;

    if (isNaN(valor1) || isNaN(valor2)) {
        alert('Informe dois valores numéricos');
        return;
    }

    // Enviando os valores para o servidor
    const mensagem = {
        valor1,
        valor2,
        operacao
    };

    socket.send(JSON.stringify(mensagem));
});
