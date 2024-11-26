import React, { useState, useEffect } from "react";
import axios from "axios";

const SolicitarViagem = () => {
  const [userId, setUserId] = useState(""); // ID do usuário (cliente)
  const [origin, setOrigin] = useState(""); // Origem da viagem
  const [destination, setDestination] = useState(""); // Destino da viagem
  const [error, setError] = useState<string | null>(null); // Erro de requisição
  const [rideData, setRideData] = useState<any | null>(null); // Dados da estimativa da viagem
  const [historicoViagens, setHistoricoViagens] = useState<any[]>([]); // Histórico de viagens
  const googleMapsApiKey = process.env.GOOGLE_API_KEY;

  // Função para solicitar a estimativa da viagem
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Requisição para estimar a viagem
      const response = await axios.post("http://localhost:8080/ride/estimate", {
        customer_id: userId,
        origin,
        destination,
      });

      setRideData(response.data); // Armazenar dados da estimativa
      setError(null); // Limpar erros
    } catch (err: any) {
      setError("Erro ao estimar a viagem. Tente novamente.");
    }
  };

  // Função para confirmar a viagem
  const confirmRide = async (driverId: number, value: number, name: string) => {
    try {
      // Requisição para confirmar a viagem
      const response = await axios.patch("http://localhost:8080/ride/confirm", {
        customer_id: userId,
        origin,
        destination,
        distance: rideData.distance,
        duration: rideData.duration,
        driver: {
          id: driverId,
          name,
        },
        value,
      });

      alert("Viagem confirmada com sucesso!");

      // Adicionar a viagem confirmada ao histórico
      const viagemConfirmada = {
        dataHora: new Date().toLocaleString(),
        motorista: name,
        origem: `${rideData.origin.latitude}, ${rideData.origin.longitude}`,
        destino: `${rideData.destination.latitude}, ${rideData.destination.longitude}`,
        distancia: rideData.distance,
        tempo: rideData.duration,
        valor: value.toFixed(2),
      };

      setHistoricoViagens([...historicoViagens, viagemConfirmada]); // Atualiza o histórico
      setRideData(null); // Limpa a estimativa atual
    } catch (err: any) {
      alert("Erro ao confirmar a viagem. Tente novamente.");
    }
  };

  return (
    <div>
      <h2>Solicitar Viagem</h2>

      {/* Formulário para solicitar a viagem */}
      {!rideData && !historicoViagens.length ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID do Usuário:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div>
            <label>Origem:</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>
          <div>
            <label>Destino:</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <button type="submit">Estimar Valor</button>
        </form>
      ) : null}

      {/* Exibe os dados da viagem estimada */}
      {rideData && !historicoViagens.length ? (
        <div>
          <h3>Rota Estimada</h3>
          <p>Origem: {rideData.origin.latitude}, {rideData.origin.longitude}</p>
          <p>Destino: {rideData.destination.latitude}, {rideData.destination.longitude}</p>
          <p>Distância: {rideData.distance} km</p>
          <p>Duração: {rideData.duration} minutos</p>
          
          <h3>Opções de Motoristas</h3>
          {rideData.options.map((driver: any) => (
            <div key={driver.id}>
              <h4>{driver.nome}</h4>
              <p>Descrição: {driver.descricao}</p>
              <p>Carro: {driver.carro}</p>
              <p>Avaliação: {driver.avaliacao}</p>
              <p>Valor: R$ {driver.value.toFixed(2)}</p>
              <button
                onClick={() =>
                  confirmRide(driver.id, driver.value, driver.nome)
                }
              >
                Escolher
              </button>
            </div>
          ))}
        </div>
      ) : null}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default SolicitarViagem;
