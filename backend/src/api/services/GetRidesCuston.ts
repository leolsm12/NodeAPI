import { Drivers } from "../models/Drivers";
import { Ride } from "../models/Ride";
import { mockDatabase } from "./mockDatabase";


export async function getRidesByCustomer(customer_id: string, driver_id?: number): Promise<Ride[]> {
   
    let rides = mockDatabase.rides.filter(ride => ride.customer_id === customer_id);
  
   
    if (driver_id) {
      const driverExists = Drivers.some(driver => driver.id === driver_id);
      if (!driverExists) {
        throw new Error('INVALID_DRIVER');
      }
      rides = rides.filter(ride => ride.driverId === driver_id);
    }
  
    
    rides.sort((a, b) => (b.id || 0) - (a.id || 0)); 
  
    return rides;
  }
