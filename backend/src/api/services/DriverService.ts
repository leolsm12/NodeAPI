import { Drivers, Driver } from '../models/Drivers'; // Modelo de motoristas

// Função que calcula o valor da viagem com base na distância
export function calculateTravelCost(driver: Driver, distance: number): number {
  return driver.taxaKm * distance;
}

// Função para pegar motoristas disponíveis com base na distância
export async function getAvailableDrivers(distance: number): Promise<Driver[]> {
    const driversWithinRange = Drivers.filter(d => d.kmMinimo <= distance);
    return driversWithinRange
}
