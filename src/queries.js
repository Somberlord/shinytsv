const Pool = require('pg').Pool
const pool = new Pool({
  user: 'dev',
  host: '192.168.56.104',
  database: 'shinytsv',
  password: 'dev',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const createUser = (request, response) => {
    const { name, site, friendcode, note } = request.body.values;
  
    pool.query('INSERT INTO users (name, site, nbwhip, nbwarning, friendcode, note) VALUES ($1, $2, 0, 0, $3, $4)', [name, site, friendcode, note], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added`)
    })
  }

  module.exports = {
    getUsers,
    createUser
  }