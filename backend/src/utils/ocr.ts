import { createWorker } from 'tesseract.js';

async function extractText(filePath: string): Promise<string> {
	try {
		const worker = await createWorker('eng');
		const ret = await worker.recognize(filePath);
		return ret.data.text;
	} catch (error: unknown) {
		console.error(error);
		if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw 'error during text extraction';
		}
	}
}

export default extractText;