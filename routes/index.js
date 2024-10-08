const usersRouter = require('./usersRouter');
const recognizedRouter = require('./recognizedRouter');
const experimentalRouter = require('./experimentalRouter');

function routerAPI(app){
    // Endpoints
    app.use('/api/users', usersRouter);

    app.use('/api/recognized', recognizedRouter);

    app.use('/api/experimental', experimentalRouter);
};

module.exports = routerAPI;