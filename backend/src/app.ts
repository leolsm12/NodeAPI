import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import routeDataRoutes from './apiData/routes/RouteDataRoutes';
import  estimateRide  from './api/routes/ApiRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Registrar as rotas
app.use('/api', routeDataRoutes);
app.use('/POST/ride/estimate', estimateRide);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

export default app;
