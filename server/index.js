import express from 'express';
import cors from 'cors';
import router from './routers/router.js';
import path from 'path';
import { fileURLToPath } from 'url';
const PORT = process.env.PORT || 3001;

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors());
app.use('/upload', router);

app.get('/*', (_, res) =>
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
);
app.listen(PORT, () => console.log(`Server listening on ${PORT} :-)`));
