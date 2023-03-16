import express, { Application, Router } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { connectDB } from './layers/data-access-layer/acces-data';


dotenv.config({ path: './config/config.env' });

const app: Application = express();
const api: Router = Router();

app.use(bodyParser.json());
connectDB();

api.use('/products', require('./router/product.router'));
api.use('/category', require('./router/category.router'))
app.use('/api', api);

app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('entro', error);
  const status = res.statusCode || 500;
  const message = error.message || 'Error interno del servidor';
  res.status(status).json({ code: status, message: message });
});

app.listen(3000, () => {
  console.log('SERVER ON, LETS GO!');
});

