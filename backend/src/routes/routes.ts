import {Router} from 'express';
import { ExtractTextFromImage } from '../controllers/index';
import upload from '../middlewares/multer.middleware';


const router = Router();

router.post("/", upload.single('image'), ExtractTextFromImage);


export default router;