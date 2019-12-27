const { getUsers, createOrUpdateUser } = require('./users');
const getTsvByUser = require('./tsv');
const conf = require('./config/config');

const express = require('express');

function start() {
    const app = express();
    const port = 3001;
    app.use(express.urlencoded({
        extended: true,
      })
    );
    app.use(express.json());
    
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", conf.cors_host); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });
    
    
    
    app.get('/', (request, response) => {
        response.json({ info: 'Node.js, Express, and Postgres API' });
    })
    
    app.get('/users', getUsers);
    app.get('/tsvlist/:userid', getTsvByUser);
    app.post('/users', createOrUpdateUser)
    
    app.listen(port, () => {
        console.log(`App running on port ${port}.`);
    })
}

module.exports = start;

