const mysql = require('mysql2');

const sql = 'INSERT INTO members_band VALUE(?,?,?,?)';
const member_band = [4, 1, 'Jorik_Shtuk', ''];

const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "assoleworms",
	password: "fynjyikzgbr35000!BOO"
});

//connect to data base
conn.connect( function (err) {
	if (err) {
		return console.error("Не получилось, не фартануло " + err.message);
	}
	else {
		console.log("Connection to MySQL server successfuly...");
	}
});

//added data to table
conn.execute(sql, member_band, function (err, result) {
	if (err) {
		console.log(err)
	}
	else {
		console.log('Member band added');
	}
});

//show data from table
conn.execute('SELECT * FROM members_band;', function (err, result) {
	console.log(err);
	console.log(result);
});

