import { Request, Response } from 'express';
import { getRouteData } from '../services/RouterDataService';

export async function getRouteDataController(req: Request, res: Response): Promise<any> {
  try {
    const { origin, destination } = req.body;

    if (!origin || !destination) {
      return res.status(400).json({ error: 'Origem e destino são obrigatórios.' });
      
    }

    const routeData = await getRouteData(origin as string, destination as string);

    if (!routeData) {
      return res.status(500).json({ error: 'Erro ao calcular a rota.' });
    }

    return res.status(200).json(routeData);
  } catch (error: any) {
    console.error('Erro no controlador:', error.message);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}
