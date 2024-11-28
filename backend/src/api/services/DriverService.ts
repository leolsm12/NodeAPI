import { Drivers, Driver } from '../models/Drivers'; 


export function calculateTravelCost(driver: Driver, distance: number): number {
  return driver.taxaKm * distance;
}


export async function getAvailableDrivers(distance: number): Promise<Driver[]> {
    const driversWithinRange = Drivers.filter(d => d.kmMinimo <= distance);
    return driversWithinRange
}
