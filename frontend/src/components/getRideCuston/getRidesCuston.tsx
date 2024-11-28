import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from'./getRidesCuston.module.css';

const BASE_API = "http://localhost:8080";

const RideList: React.FC = () => {
  const { state } = useLocation(); 
  const [customerId, setCustomerId] = useState<string>(state.data);
  const [driverId, setDriverId] = useState<string>('');
  const [rides, setRides] = useState<any[]>([]);

  const getRidesCuston = async (customerIdToSearch: string, driverIdToSearch?: string) => {
    try {
      const response = await axios.get(
        `${BASE_API}/ride/${customerIdToSearch}?driver_id=${driverIdToSearch || " "}`
      );
      setRides(response.data.rides); 
    } catch (err: any) {
      console.error("Erro ao obter histórico de viagens:", err);
      setRides([]);
    }
  };
  
  useEffect(() => {
   {  
    getRidesCuston(state.data);
    }
  }, [state]);

  return (
    <div className={styles.container}>
      <h1>Histórico de Viagens</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getRidesCuston(customerId, driverId);
        }}
        className={styles.form}
      >
        <div>
          <label>
            Customer ID (obrigatório):
            <input
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Driver ID (opcional):
            <select
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
            >
              <option value="">Selecione um motorista</option>
              <option value="1">Homer Simpson</option>
              <option value="2">Dominic Toretto</option>
              <option value="3">James Bond</option>
            </select>
          </label>
        </div>
        <button type="submit">Buscar Viagens</button>
      </form>
      <div className={styles.results}>
        <h2>Resultados:</h2>
        {rides.length > 0 ? (
          <ul>
            {rides.map((ride) => (
              <li key={ride.id}>
                <strong>Data e hora:</strong> {ride.data}
                <br />
                <strong>Nome do motorista:</strong> {ride.driver.name}
                <br />
                <strong>Origem:</strong> {ride.origin.latitude}, {ride.origin.longitude}
                <br />
                <strong>Destino:</strong> {ride.destination.latitude}, {ride.destination.longitude}
                <br />
                <strong>Distância:</strong>{' '}
                {ride.distance.toLocaleString('pt-BR', {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}{' '}
                Km
                <br />
                <strong>Tempo:</strong> {ride.duration}
                <br />
                <strong>Valor:</strong> R$ {ride.value.toFixed(2)}
                <br />
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma viagem encontrada.</p>
        )}
      </div>
    </div>
  );
};
export default RideList;
