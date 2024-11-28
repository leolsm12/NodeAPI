import { Request, Response } from 'express';
import { getRidesByCustomer } from '../services/GetRidesCuston';

export async function listRidesByCustomer(req: Request, res: Response):Promise<any> {
    const { customer_id } = req.params;
    const { driver_id } = req.query;
  
    console.log('customer_id:', customer_id); 
    console.log('driver_id:', driver_id )
  
    if (!customer_id) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'O ID do usuário é obrigatório.',
      });
    }
  
    try {

      const rides = await getRidesByCustomer(customer_id, driver_id ? Number(driver_id) : undefined);
  
      if (rides.length === 0) {
        return res.status(404).json({
          error_code: 'NO_RIDES_FOUND',
          error_description: 'Nenhum registro encontrado.',
        });
      }
  
      
      const response = {
        customer_id,
        rides: rides.map(ride => ({
          id: ride.id,
          origin: ride.origin,
          destination: ride.destination,
          data: ride.data,
          distance: ride.distance,
          duration: ride.duration,
          driver: {
            id: ride.driverId,
            name: ride.driverName,
          },
          value: ride.value,
        })),
      };
  
      return res.status(200).json(response);
    } catch (error:any) {
      if (error.message === 'INVALID_DRIVER') {
        return res.status(400).json({
          error_code: 'INVALID_DRIVER',
          error_description: 'O motorista informado é inválido.',
        });
      }
  
      return res.status(500).json({
        error_code: 'INTERNAL_SERVER_ERROR',
        error_description: 'Erro interno no servidor.',
      });
    }
  }