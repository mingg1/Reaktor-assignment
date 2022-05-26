import express from 'express';
import cors from 'cors';
import router from './routers/router.js';
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use('/upload', router);
app.listen(PORT, () => console.log(`Server listening on ${PORT} :-)`));
