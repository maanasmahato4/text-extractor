import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import * as dotenv from 'dotenv';
import routes from './routes/routes';
import { PORT } from './constants/envVariables';
import bulkDelete from './utils/bulkDeleteFiles';

dotenv.config();

setInterval(
	async () => {
		await bulkDelete();
	},
	60 * 60 * 1000,
);

const app = express();
app.use(
	cors({
		origin: ['http://localhost:3000', 'http://localhost:5173'],
	}),
);
app.use(helmet());
app.use(compression({ level: 1 }));

app.listen(PORT, () => {
	console.log(`server running at http://localhost:${PORT}`);
	app.use('/api', routes);
});
