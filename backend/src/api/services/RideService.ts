// src/services/rideService.ts
import { Ride } from '../models/Ride';
import { Driver, Drivers } from '../models/Drivers';
import { mockDatabase } from './mockDatabase';

// Valida se o motorista é uma opção válida para a quilometragem informada
export function validateDriverOption(driver: Driver, distance: number): boolean {
  const foundDriver = Drivers.find(d => d.id === driver.id);
  if (!foundDriver) return false;

  // Verifica se a distância está dentro do limite do motorista
  return distance >= foundDriver.kmMinimo;
}

// Salva os dados da viagem no mock-database
export async function saveRideToMockDatabase(rideData: Partial<Ride>): Promise<Ride> {
  const newRide: Ride = {
    id: mockDatabase.rides.length + 1, // Simula ID autoincremental
    ...rideData,
  } as Ride;

  mockDatabase.rides.push(newRide); // Salva no mock
  return newRide;
}

