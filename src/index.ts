import app from './app';
import 'dotenv/config';

const port = process.env.PORT;

const startServer = async () => {
	try {
		await app.listen(port);
		console.log(`Server running on port ${port}`);
	} catch (error) {
		console.error(error);
	}
};

startServer();
