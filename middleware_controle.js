// COLOCAR APÓS MIDDLEWARE DE AUTENTICAÇÃO


function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.sendStatus(403); // Permissão negada
        }
        next();
    };
}
