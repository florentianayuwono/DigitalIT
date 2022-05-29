const Pool = require("pg").Pool;

/*const pool = new Pool({
    user: process.env.dbUser,
    password: process.env.dbPass,
    host: process.env.dbHost,
    port: process.env.dbPort,
    database: process.env.database,
    ssl: {
        rejectUnauthorized: false
  }
});*/

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;