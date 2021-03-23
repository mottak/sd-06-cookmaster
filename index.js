const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const status404 = 404;

const usersRouter = require('./controllers/routeUsers');

const port3000 = 3000;
const port = parseInt(process.env.PORT, 10) || port3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
//----------------------------------------------------------

app.use('/users', usersRouter);

app.all('*', (_req, res) => {
  res.status(status404).json({ 
  message: 'Rota não Encontrada' });
});

app.listen(port, () => console.log(`Example app listening on ${port}!`));
