const express = require('express');

const bodyParser = require('body-parser');

const usersController = require('./controllers/usersController');

const checkRequestBody = require('./middlewares/checkRequestBody');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/users', checkRequestBody, usersController);

app.listen(3000, () => console.log('Server has been started'));
