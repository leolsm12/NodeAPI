import { Request, Response } from 'express';
import axios from 'axios'; 
import { Drivers, Driver } from '../models/Drivers'; 
import { calculateTravelCost, getAvailableDrivers } from '../services/DriverService'; 

export async function estimateRide(req: Request, res: Response): Promise<any> {
  const { customer_id, origin, destination } = req.body;

 
  if (!customer_id || !origin || !destination) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Customer ID, origem e destino são obrigatórios.',
    });
  }

  if (origin === destination) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Origem e destino não podem ser os mesmos.',
    });
  }

  try {
    
    const routeData = await axios.post('http://localhost:8080/api/route', { origin:origin, destination:destination });
    console.log(routeData)
 
    if (!routeData || !routeData.data) {
      return res.status(500).json({
        error_code: 'GOOGLE_API_ERROR',
        error_description: 'Erro ao buscar dados de rota da API do Google.',
      });
    }
  
   const { origin: originCoordinates, destination: destinationCoordinates, distance, duration } = routeData.data;
   
   
    const availableDrivers = await getAvailableDrivers(distance);

    const driversWithPrices = availableDrivers.map(driver => ({
      ...driver,
      value: calculateTravelCost(driver, distance),
    }));
  
   
    const sortedDrivers = driversWithPrices.sort((a, b) => a.value - b.value);
  
  
    return res.status(200).json({
      origin: originCoordinates,
      destination: destinationCoordinates,
      distance,
      duration,
      options: sortedDrivers,
      routeResponse: routeData.data, 
    });
  } catch (error:any) {
    console.error('Erro ao processar a requisição:', error.message);
    return res.status(500).json({
      error_code: 'SERVER_ERROR',
      error_description: 'Ocorreu um erro ao processar a solicitação.',
    });
  }
  
}

