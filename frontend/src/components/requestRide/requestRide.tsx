import React, { useState } from "react";
import axios from "axios";
import styles from './requestRide.module.css'
import { useNavigate } from "react-router-dom";

const BASE_API = "http://localhost:8080";

const RequestRide: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_API}/ride/estimate`, {
        customer_id: userId,
        origin,
        destination,
      });
      navigate('/confirm ', { state: { data: response.data, customer_id: userId } });
      console.log("Resposta da API:", response.data);
    } catch (err: any) {
      console.error("Erro completo:", err); 
      alert("Erro ao estimar a viagem. Tente novamente.");
    }

  };

  return (
    <div className={styles.container}>
      <h1>Contato</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">ID do Cliente:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="origin">Origem:</label>
          <input
            type="text"
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="destination">Destino:</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default RequestRide;
