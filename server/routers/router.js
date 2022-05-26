import express from 'express';
import multer from 'multer';
import { parsePoetry } from '../controller/uploadController.js';

const router = express.Router();
const storage = multer.memoryStorage();

router.post('/', multer({ storage }).single('poetry'), parsePoetry);

export default router;
