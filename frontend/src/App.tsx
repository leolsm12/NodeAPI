import React, { useState } from "react";
import axios from "axios";

const SolicitarViagem = () => {
  const [userId, setUserId] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [rideData, setRideData] = useState<any | null>(null);
  const googleMapsApiKey = process.env.GOOGLE_API_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/ride/estimate", {
        customer_id: userId,
        origin,
        destination,
      });

      console.log("Resposta da API:", response.data);
      setRideData(response.data); // Armazena os dados da estimativa
      console.log("rideData", rideData);
      setError(null); // Limpar qualquer erro anterior
    } catch (err: any) {
      console.error("Erro completo:", err); // Log do erro
      setError("Erro ao estimar a viagem. Tente novamente.");
    }
  };

  const confirmRide = async (driverId: number, value:number, name: string, ) => {
    try {
      await axios.patch("http://localhost:8080/ride/confirm", {
      customer_id: userId,
      origin,
      destination,
      distance:rideData.distance , 
      duration: rideData.duration,  
      driver: {
        id: driverId,
        name 
      },
      value 
      });
      
      alert("Viagem confirmada com sucesso!");
      // Redirecionar para a tela de histórico (implemente a lógica do histórico aqui)
    } catch (err: any) {
      console.error("Erro ao confirmar a viagem:", err);
      alert("Erro ao confirmar a viagem. Tente novamente.");
      console.log(rideData.options.driver.value);
    }
    
  };
  console.log("rideData2",rideData)
  return (
    <div>
      <h2>Solicitar Viagem</h2>
      {!rideData ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID do Usuário</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div>
            <label>Origem</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>
          <div>
            <label>Destino</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <button type="submit">Estimar Valor</button>
        </form>
      ) : (
        <div>
          <h3>Rota Estimada</h3>
          <div>
            <p>
              Origem: {rideData.origin.latitude}, {rideData.origin.longitude}
            </p>
            <p>
              Destino: {rideData.destination.latitude},{" "}
              {rideData.destination.longitude}
            </p>
            <p>Distância: {rideData.distance} km</p>
            <p>Duração: {rideData.duration}</p>
          </div>
          {/* Mapa estático da rota */}
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=enc:encoded-polyline-here&markers=${rideData.origin.latitude},${rideData.origin.longitude}&markers=${rideData.destination.latitude},${rideData.destination.longitude}&path=color:0x0000ff|weight:3|${rideData.origin.latitude},${rideData.origin.longitude}|${rideData.destination.latitude},${rideData.destination.longitude}&key=AIzaSyB7lhmpxcqcUao5KiHViWCBnF7NavPyZUo`}
            alt="Mapa da rota"
          />
          <h3>Opções de Motoristas</h3>
          {rideData.options.map((driver: any) => (
            <div key={driver.id}>
              <h4>{driver.nome}</h4>
              <p>Descrição: {driver.descricao}</p>
              <p>Carro: {driver.carro}</p>
              <p>Avaliação: {driver.avaliacao}</p>
              <p>Valor: R$ {driver.value.toFixed(2)}</p>
              <button onClick={() => confirmRide(driver.id, driver.value,driver.nome)}>Escolher</button>
            </div>
          ))}
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default SolicitarViagem;

