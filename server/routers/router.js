import express from 'express';
import multer from 'multer';
import lockParser from '../util/lockParser.js';

const router = express.Router();
const storage = multer.memoryStorage();

router.post('/', multer({ storage }).single('poetry'), lockParser);

export default router;
