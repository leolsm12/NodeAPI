import { Request, Response } from 'express';
import { saveRideToMockDatabase, validateDriverOption,   } from '../services/RideService';
import { Ride } from '../models/Ride';



export async function confirmRide(req: Request, res: Response): Promise<any> {
  const { customer_id, origin, destination, distance, duration, driver, value } = req.body;

  if (!customer_id || !origin || !destination || !driver || !value) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Customer ID, origem, destino, motorista e valor são obrigatórios.',
    });
  }

  if (origin === destination) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Origem e destino não podem ser o mesmo endereço.',
    });
  }


  const isDriverValid = validateDriverOption(driver, distance);
  if (!isDriverValid) {
    return res.status(400).json({
      error_code: 'INVALID_DRIVER',
      error_description: 'Motorista informado não é válido para a quilometragem especificada.',
    });
  }

  try {

    const rideData: Omit<Ride, 'id'> = {
      customer_id: customer_id,
      origin: origin,
      destination: destination,
      distance: distance, 
      data: new Date(), 
      duration: duration, 
      driverName: driver.name, 
      driverId: driver.id, 
      value: value, 
    };

   
    const savedRide = await saveRideToMockDatabase(rideData);

    return res.status(200).json({
      message: 'Viagem confirmada e salva no histórico com sucesso.',
      ride: savedRide,
    });
  } catch (error: any) {
    console.error('Erro ao confirmar a viagem:', error.message);
    return res.status(500).json({
      error_code: 'SERVER_ERROR',
      error_description: 'Ocorreu um erro ao confirmar a viagem.',
    });
  }
  
}
