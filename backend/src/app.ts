import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
    res.send('API funcionando!');
});

export default app;
