const getUsers = require('./users');
const getTsvByUser = require('./tsv');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
})

app.get('/users', getUsers);
app.get('/tsvlist/:userid', getTsvByUser);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
})