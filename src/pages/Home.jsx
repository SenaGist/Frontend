import React, { useEffect, useState } from 'react';
import '../styles/Home.css';

const Home = () => {
  const [usuariosCount, setUsuariosCount] = useState(0);
  const [equiposCount, setEquiposCount] = useState(0);
  const [infoGeneral, setInfoGeneral] = useState('');
  const [novedades, setNovedades] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosRes = await fetch('/api/usuarios/count');
        const usuariosData = await usuariosRes.json();
        setUsuariosCount(usuariosData.total);

        const equiposRes = await fetch('/api/equipos/count');
        const equiposData = await equiposRes.json();
        setEquiposCount(equiposData.total);

        const infoRes = await fetch('/api/info/general');
        const infoData = await infoRes.json();
        setInfoGeneral(infoData.descripcion);

        const novedadesRes = await fetch('/api/novedades/ultimas');
        const novedadesData = await novedadesRes.json();
        setNovedades(novedadesData.texto);
      } catch (error) {
        console.error('Error al obtener datos del dashboard:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-home">
      <div className="dashboard-header">
        <h2>Panel Principal</h2>
        <div className="user-info">
          <div className="user-avatar"></div>
          <span>Usuario</span>
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Usuarios</h3>
          <p className="card-number">{usuariosCount}</p>
        </div>

        <div className="card">
          <h3>Equipos</h3>
          <p className="card-number">{equiposCount}</p>
        </div>

        <div className="card">
          <h3>Información</h3>
          <p className="card-text">{infoGeneral}</p>
        </div>

        <div className="card">
          <h3>Novedades</h3>
          <p className="card-text">{novedades}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
