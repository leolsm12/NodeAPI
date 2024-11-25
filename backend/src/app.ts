import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import routeDataRoutes from './routes/RouteDataRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Registrar as rotas
app.use('/api', routeDataRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

export default app;
