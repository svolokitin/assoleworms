import express from 'express';
import router from './router.js';
import connectToDB from './connectToDB.js';

const PORT = 8080;
const server = express();

//register
server.use(express.json());
server.use('/auth', router);


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
