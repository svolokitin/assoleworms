import {User, Host, DB, Password} from './config.js';
import mysql2 from 'mysql2';

const mysql = mysql2.createConnection({
	host: Host,
	user: User,
	database: DB,
	password: Password 
});

function connectToDB () {
	mysql.connect( function (err) {
		if (err) console.log(err.message);
		console.log('Connected to data base successfully!');
	});
}

export default connectToDB;
