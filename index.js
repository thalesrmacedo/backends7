const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const SECRET_KEY = 'my_secret_key'; // Chave para assinar tokens

const users = [
    { id: 1, username: 'user1', password: 'password1', role: 'user' },
    { id: 2, username: 'admin', password: 'adminpass', role: 'admin' }
];

function generateToken(user) {
    return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.sendStatus(403);
        }
        next();
    };
}

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = generateToken(user);
        res.json({ token });
    } else {
        res.sendStatus(401);
    }
});

app.get('/tasks', authenticateToken, (req, res) => {
    res.json({ tasks: ['Tarefa 1', 'Tarefa 2'] });
});

app.post('/admin/users', authenticateToken, authorizeRole('admin'), (req, res) => {
    res.send('Usuário criado com sucesso.');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
