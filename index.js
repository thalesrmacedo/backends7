const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const SECRET_KEY = 'my_secret_key';

// Usuários fictícios
const users = [
    { id: 1, username: 'user1', password: 'password1', role: 'user' },
    { id: 2, username: 'admin', password: 'adminpass', role: 'admin' }
];

// Função para gerar token JWT
function generateToken(user) {
    return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
}

// Rota de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = generateToken(user);
        res.json({ token });
    } else {
        res.sendStatus(401); // Usuário ou senha inválidos
    }
}); 

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

