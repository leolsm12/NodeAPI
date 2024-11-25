import { Client } from '@googlemaps/google-maps-services-js';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client();

export async function getRouteData(origin: string, destination: string) {
  try {
    const response = await client.directions({
      params: {
        origin,
        destination,
        key: process.env.GOOGLE_API_KEY || '',
      },
    });

    if (response.status === 200 && response.data.status === 'OK') {
      const route = response.data.routes[0];
      const leg = route.legs[0];

      return {
        origin: {
          latitude: leg.start_location.lat,
          longitude: leg.start_location.lng,
        },
        destination: {
          latitude: leg.end_location.lat,
          longitude: leg.end_location.lng,
        },
        distance: leg.distance.value / 1000, // Distância em km
        duration: leg.duration.text,
      };
    } else {
      throw new Error(`API Error: ${response.data.status}`);
    }
  } catch (error: any) {
    console.error('Erro ao buscar rota:', error.message);
    throw error;
  }
}
