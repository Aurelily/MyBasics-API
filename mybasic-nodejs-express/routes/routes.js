const users = require('./users.routes');

module.exports.router = (app) => {
    app.use("/users", users);
}