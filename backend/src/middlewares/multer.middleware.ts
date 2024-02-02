import multer, { FileFilterCallback } from 'multer';
let nanoid: any;

import('nanoid').then((module) => {
 nanoid = module.nanoid;
});
import { Request } from 'express';
import * as fs from 'fs';
import path from 'path';
import { FILE_SIZE_LIMIT } from '../constants/envVariables';

if (!fs.existsSync('uploads')) {
	fs.mkdirSync('uploads');
}

const diskStorage = multer.diskStorage({
	destination: (req: Request, file, cb) => {
		cb(null, './uploads');
	},
	filename: (req: Request, file, cb) => {
		const extName = path.extname(file.originalname);
		const uniqueName = `${nanoid()}${Date.now()}${extName}`;
		cb(null, uniqueName);
	},
});

const fileFilter = (req: Request, file: any, cb: FileFilterCallback) => {
	const allowedExt = ['.png', '.jpg', '.jpeg'];
	const extName = path.extname(file.originalname);
	const mimeType = file.mimetype;

	if (!allowedExt.includes(extName) || !mimeType.startsWith('image/')) {
		cb(new Error('file type not supported'));
	}
	if (file.size > FILE_SIZE_LIMIT) {
		cb(new Error('file size limit reached'));
	}
	cb(null, true);
};

const upload = multer({ storage: diskStorage, fileFilter });

export default upload;
