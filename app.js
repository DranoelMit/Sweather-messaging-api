const express = require('express');
const app = express();
const configRoutes = require('./routes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

configRoutes(app);

app.listen(process.env.PORT || 3000);
