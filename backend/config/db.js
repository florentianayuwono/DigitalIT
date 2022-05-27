const Pool = require("pg").Pool;

//skeleton
const pool = new Pool({
    user: process.env.dbUser,
    password: process.env.dbPass,
    host: process.env.dbHost,
    port: process.env.dbPort,
    database: process.env.database
});

module.exports = pool;