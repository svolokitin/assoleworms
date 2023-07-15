import mysql from "./connectionMYSQL.js";

function connectToDB () {
	mysql.connect( function (err) {
		if (err) console.log(err.message);
		console.log('Connected to data base successfully!');
	});
}

export default connectToDB;
