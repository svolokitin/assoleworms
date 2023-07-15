import mysql2 from 'mysql2';
import { User, DB, Password } from '../config.js';

const mysql = mysql2.createConnection({
	host: process.env.Host,
	user: User,
	database: DB,
	password: Password 
});

export default mysql;
