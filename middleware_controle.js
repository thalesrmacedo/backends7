// COLOCAR APÓS MIDDLEWARE DE AUTENTICAÇÃO


// Middleware de controle de papéis
function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.sendStatus(403); // Permissão negada
        }
        next();
    };
}
