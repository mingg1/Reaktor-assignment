import express from 'express';
import router from './routers/router.js';
const PORT = process.env.PORT || 3001;

const app = express();
//app.use(multer);
app.use('/upload', router);
app.listen(PORT, () => console.log(`Server listening on ${PORT} :-)`));
