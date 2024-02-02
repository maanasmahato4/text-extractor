import { Request, Response } from 'express';
import extractText from '../utils/ocr';

export async function ExtractTextFromImage(req: Request, res: Response) {
	try {
		const file = req.file;
		if (!file) {
			return res.status(404).json({ error: 'file not found' });
		}
		const text = await extractText(file?.path);
		return res.status(200).json({ text });
	} catch (error) {
		return res.status(500).json(error);
	}
}
