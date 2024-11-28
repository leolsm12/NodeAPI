import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './confirmRide.module.css';

const Confirm: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data, customer_id } = state || {};
  const BASE_API = "http://localhost:8080";

  const confirmRide = async (driverId: number, value: number, name: string) => {
    try {
      await axios.patch(`${BASE_API}/ride/confirm`, {
        customer_id: customer_id,
        origin: data.origin,
        destination: data.destination,
        distance: data.distance,
        duration: data.duration,
        driver: {
          id: driverId,
          name,
        },
        value,
      });
      
      navigate('/getRides ', { state: { data: customer_id } });      
    } catch (err: any) {
      console.error("Erro ao confirmar a viagem:", err);
      alert("Erro ao confirmar a viagem. Tente novamente.");
    }
  };


  const getStaticMapUrl = (origem: { lat: number; lng: number }, destino: { lat: number; lng: number }) => {
    const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap?';
    const originParam = `markers=${origem.lat},${origem.lng}&`;
    const destinationParam = `markers=${destino.lat},${destino.lng}&`;
    const routeParam = `path=color:0x0000ff|weight:5|${origem.lat},${origem.lng}|${destino.lat},${destino.lng}&`;
    const sizeParam = 'size=600x400';
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY; 

    return `${baseUrl}${originParam}${destinationParam}${routeParam}${sizeParam}&key=${apiKey}`;
  };

  return (
    <div className={styles.container}>
      <h3>Opções de Motoristas</h3>
      {data.options.map((driver: any) => (
        <div key={driver.id} className={styles.driverCard}>
          <h4>{driver.nome}</h4>
          <p><strong>Descrição:</strong> {driver.descricao}</p>
          <p><strong>Carro:</strong> {driver.carro}</p>
          <p><strong>Avaliação:</strong> {driver.avaliacao}</p>
          <p className={styles.value}>
            <strong>Valor da viagem:</strong> R$ {driver.value.toFixed(2)}
          </p>
          <button onClick={() => confirmRide(driver.id, driver.value, driver.nome)}>
            Escolher
          </button>
          <div>
            <h5>Rota entre os pontos:</h5>
            <img
              src={getStaticMapUrl(data.origin, data.destination)}
              alt="Mapa da rota"
              className={styles.mapImage}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Confirm;
