import express from 'express';
import router from './routes/router.js';
import connectToDB from './dataBase/connectToDB.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { CLIENT_URL } from './config.js';

const PORT = 8080;
const server = express();

//register
server.use(express.json());
server.use(cookieParser());
server.use(cors({
	credentials: true,
	origin: CLIENT_URL
}));

server.use('/api', router);

async function startServer() {
	try {
		//connect to DB
		connectToDB();
		server.listen(PORT, () => console.log('SERVER WORKING ON localhost:' + PORT));
	} catch (err) {
		console.log(err.message);
	}
}

startServer();
