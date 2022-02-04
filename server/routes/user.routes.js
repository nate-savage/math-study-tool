const UserController = require('../controllers/user.controller');

module.exports = (app) => {
    //can use the same URL becasue type of request is different
    app.get("/api", (req, res) => {
        res.json({ message: "Hello World" });
    });
    app.get('/api/users', UserController.findAllUsers);
    app.get('/api/users/:id', UserController.findOneSingleUser);
    app.put('/api/users/:id', UserController.updateExistingUser);
    //dont really need this route
    app.post('/api/users',UserController.createNewUser)
    app.post('/api/login', UserController.login);
    app.post('/api/register', UserController.register);
    app.get('/api/logout',UserController.logout)
    app.delete('/api/users/:id', UserController.deleteAnExistingUser);
}