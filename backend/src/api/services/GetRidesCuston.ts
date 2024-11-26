import { Drivers } from "../models/Drivers";
import { Ride } from "../models/Ride";
import { mockDatabase } from "./mockDatabase";

// Lista todas as viagens no mock-database
export async function getRidesByCustomer(customer_id: string, driver_id?: number): Promise<Ride[]> {
    // Filtra as viagens pelo `customer_id`
    let rides = mockDatabase.rides.filter(ride => ride.customer_id === customer_id);
  
    // Se `driver_id` for informado, valida e filtra pelo motorista
    if (driver_id) {
      const driverExists = Drivers.some(driver => driver.id === driver_id);
      if (!driverExists) {
        throw new Error('INVALID_DRIVER');
      }
      rides = rides.filter(ride => ride.driverId === driver_id);
    }
  
    // Ordena as viagens da mais recente para a mais antiga (assumindo que a data está presente)
    rides.sort((a, b) => (b.id || 0) - (a.id || 0)); // Ajuste baseado no ID como proxy de data
  
    return rides;
  }
