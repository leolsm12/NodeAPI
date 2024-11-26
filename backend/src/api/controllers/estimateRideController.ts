import { Request, Response } from 'express';
import axios from 'axios'; // Usando axios para acessar seu endpoint do Google Maps
import { Drivers, Driver } from '../models/Drivers'; // Modelo de motoristas
import { calculateTravelCost, getAvailableDrivers } from '../services/DriverService'; // Funções de negócio

export async function estimateRide(req: Request, res: Response): Promise<any> {
  const { customer_id, origin, destination } = req.body;

  // Validações
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
    // Chama o endpoint que você já criou para obter os dados de rota do Google
    const routeData = await axios.post('http://localhost:8080/api/route', { origin:origin, destination:destination });
    console.log(routeData)
   // Verificando se o retorno da API foi bem-sucedido
    if (!routeData || !routeData.data) {
      return res.status(500).json({
        error_code: 'GOOGLE_API_ERROR',
        error_description: 'Erro ao buscar dados de rota da API do Google.',
      });
    }
  
   const { origin: originCoordinates, destination: destinationCoordinates, distance, duration } = routeData.data;
   
    // Pegando os motoristas disponíveis com base na distância
    const availableDrivers = await getAvailableDrivers(distance);
  
   // Calculando o valor da viagem para cada motorista
    const driversWithPrices = availableDrivers.map(driver => ({
      ...driver,
      value: calculateTravelCost(driver, distance),
    }));
  
   // Ordenando motoristas do mais barato para o mais caro
    const sortedDrivers = driversWithPrices.sort((a, b) => a.value - b.value);
  
   // Retornando a resposta conforme o esperado
    return res.status(200).json({
      origin: originCoordinates,
      destination: destinationCoordinates,
      distance,
      duration,
      options: sortedDrivers,
      routeResponse: routeData.data, // Inclui a resposta completa da API do Google
    });
  } catch (error:any) {
    console.error('Erro ao processar a requisição:', error.message);
    return res.status(500).json({
      error_code: 'SERVER_ERROR',
      error_description: 'Ocorreu um erro ao processar a solicitação.',
    });
  }
  
}

