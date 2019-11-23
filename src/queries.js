const Pool = require('pg').Pool
const conf = require('./config/config')
const pool = new Pool({
  user: conf.db_user,
  host: conf.db_host,
  database: conf.db_database,
  password: conf.db_pwd,
  port: conf.db_port,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const createOrUpdateUser = (request, response) => {
    let { name, site, nbwhip, nbwarning, friendcode, note, id } = request.body.values;

    if(id === undefined) {
      pool.query('INSERT INTO users (name, site, nbwhip, nbwarning, friendcode, note) VALUES ($1, $2, 0, 0, $3, $4)', [name, site, friendcode, note], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`User added`)
      })  
    } else {
      nbwhip = Number.isInteger(nbwhip) ? nbwhip : 0;
      nbwarning = Number.isInteger(nbwarning) ? nbwhip : 0;
      pool.query('UPDATE users set name=$2, site=$3, friendcode=$4, note=$5, nbwhip=$6, nbwarning=$7 where id=$1', 
                  [id, name, site, friendcode, note, nbwhip, nbwarning], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`User updated`)
      })  
    }
    
  }

  module.exports = {
    getUsers,
    createOrUpdateUser
  }