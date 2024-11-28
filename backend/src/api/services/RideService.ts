import { Ride } from '../models/Ride';
import { Driver, Drivers } from '../models/Drivers';
import { mockDatabase } from './mockDatabase';


export function validateDriverOption(driver: Driver, distance: number): boolean {
  const foundDriver = Drivers.find(d => d.id === driver.id);
  if (!foundDriver) return false;


  return distance >= foundDriver.kmMinimo;
}


export async function saveRideToMockDatabase(rideData: Partial<Ride>): Promise<Ride> {
  const newRide: Ride = {
    id: mockDatabase.rides.length + 1,
    ...rideData,
  } as Ride;

  mockDatabase.rides.push(newRide); 
  return newRide;
}

