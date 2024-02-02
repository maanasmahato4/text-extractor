import * as fs from 'fs';
import path from 'path';

const SOURCE_DIR = path.join(process.cwd(), 'uploads');

async function bulkDelete(): Promise<void> {
	const files = await fs.promises.readdir(SOURCE_DIR);
	if (files.length >= 1) {
		let filesPath = files.map((file) => path.join(SOURCE_DIR, file));
		filesPath.forEach(async (filePath) => {
			await fs.promises.unlink(filePath);
		});
	}
}

export default bulkDelete;
