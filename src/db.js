const mysql = require("mysql2");
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "2.steam",
	password: "Escola2012?"
});

connection.connect((err) => {
	if(err) {
		console.log("DEU ERRO! " + err.stack);
		return;
	}
	console.log("CONECTOU! " + connection.threadId);
});

module.exports = { connection };