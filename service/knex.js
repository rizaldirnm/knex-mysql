const keys = require("../config/keys");
module.exports = {
  client: "mysql2",
  connection: {
    host: keys.dbHost,
    user: keys.dbUser,
    password: keys.dbPassword,
    database: keys.dbName
  },
  pool: { min: 0, max: 20 },
  acquireConnectionTimeout: 10000
};
