const messageRoutes = require('./messages');

const constructorMethod = (app) => {
    app.use('/api/message', messageRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({error: 'Not found'});
    });
};

module.exports = constructorMethod;
