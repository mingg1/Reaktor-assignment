import express from 'express';
import cors from 'cors';
import router from './routers/router.js';
import path from 'path';
import { fileURLToPath } from 'url';
const PORT = process.env.PORT || 3001;

const app = express();
const __filename = fileURLToPath(import.meta.url);
app.use(
  express.static(
    path.resolve(path.dirname(__filename), '../client/build', 'index.html')
  )
);
app.use(cors());
app.use('/upload', router);
app.listen(PORT, () => console.log(`Server listening on ${PORT} :-)`));
