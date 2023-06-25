const mysql = require('mysql2');

const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "assoleworms",
	password: "fynjyikzgbr35000!BOO"
});

conn.connect( function (err) {
	if (err) {
		return console.error("Не получилось, не фартануло " + err.message);
	}
	else {
		console.log("Connection to MySQL server successfuly...");
	}
});

conn.execute('SELECT * FROM members_band;', function (err, result) {
	console.log(err);
	console.log(result);
});
