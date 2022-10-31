const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
  user: "",
  host: "",
  password: "",
  database: ""
});

connection.connect(onConnectHandler);

function onConnectHandler(error) {
  if (error) {
    console.error(`MySQL connection error: ${error.message}`);
    return;
  }
  console.log(`Connected to MySQL (id=${connection.threadId})`);
}

module.exports = connection;