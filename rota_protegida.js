//COLOCAR APÓS ROTA DE LOGIN


// Rota protegida - acesso para todos os usuários autenticados
app.get('/tasks', authenticateToken, (req, res) => {
    res.json({ tasks: ['Tarefa 1', 'Tarefa 2'] });
});
