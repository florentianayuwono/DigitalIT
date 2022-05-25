const Pool = require("pg").Pool;

//skeleton
const pool = new Pool({
    user: "",
    password: "",
    host: "",
    port: 1234,
    database: ""
});

module.exports = pool;