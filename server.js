const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const operacoes = ['soma', 'subtracao', 'multiplicacao', 'divisao', 'potencia', 'raiz', 'mdc', 'resto', 'int'];
const defaultOperacao = '+';

app.get('/style.css', function (req, res) {
    res.type('text/css');
    res.sendFile(__dirname + './public/style/style.css');
});

// função para realizar as operações
function realizarOperacao(operacao, valor1, valor2) {
    switch (operacao) {
        case 'soma':
            return valor1 + valor2;
        case 'divisao':
            return valor1 - valor2;
        case 'multiplicacao':
            return valor1 * valor2;
        case 'divisao':
            return valor1 / valor2;
        case 'potencia':
            return Math.pow(valor1, valor2);
        case 'raiz':
            return Math.pow(valor1, 1 / valor2);
        case 'mdc':
            return mdc(valor1, valor2);
        case 'resto':
            return valor1 % valor2;
        case 'int':
            return Math.floor(valor1 / valor2);
        default:
            return null;
    }
}

// função para calcular o mdc
function mdc(a, b) {
    if (b === 0) {
        return a;
    }
    return mdc(b, a % b);
}

// middleware para servir a página index.html
app.use(express.static('public'));

// conexão estabelecida com o cliente
wss.on('connection', (ws) => {
    console.log('Nova conexão estabelecida.');

    // envio das opções de operação disponíveis para o cliente
    ws.send(JSON.stringify({ operacoes, defaultOperacao }));

    // recebimento de mensagem do cliente
    ws.on('message', (mensagem) => {
        console.log(`Mensagem recebida: ${mensagem}`);

        const { operacao, valor1, valor2 } = JSON.parse(mensagem);
        const resultado = realizarOperacao(operacao, valor1, valor2);

        // envio do resultado da operação para o cliente
        ws.send(JSON.stringify({ resultado }));
    });
});

// inicialização do servidor na porta 3000
server.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000.');
});