import {Host, User, DB, Password} from "./config.js";
import mysql2 from 'mysql2'

const sql = 'INSERT INTO members_band VALUE(?,?,?,?)';
const member_band = [3, 1, 'Dasha_Pika', 'dashusex@gmail.com'];

const conn = mysql2.createConnection({
	host: Host,
	user: User,
	database: DB,
	password: Password
});

//connect to data base
connection.connect( function (err) {
	if (err) {
		return console.error("Не получилось, не фартануло " + err.message);
	}
	else {
		console.log("Connection to MySQL server successfuly...");
	}
});

//added data to table
/*conn.execute(sql, member_band, function (err, result) {
	if (err) {
		console.log(err)
	}
	else {
		console.log('Member band added');
	}
});*/

//show data from table
connection.execute('SELECT * FROM members_band;', function (err, result) {
	console.log(err);
	console.log(result);
});

