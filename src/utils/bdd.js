const Pool = require('pg').Pool
const conf = require('../config/config')
const pool = new Pool({
  user: conf.db_user,
  host: conf.db_host,
  database: conf.db_database,
  password: conf.db_pwd,
  port: conf.db_port,
})

module.exports = pool;