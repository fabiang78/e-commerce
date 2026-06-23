import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

function Footer() {
  const [equipo, setEquipo] = useState([]);

  useEffect(() => {
    const obtenerEquipo = async () => {
      const equipoRef = collection(db, "equipo");
      const respuesta = await getDocs(equipoRef);

      const integrantes = respuesta.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setEquipo(integrantes);
    };

    obtenerEquipo();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-info">
        <h3>Mi Tienda React</h3>
        <p>Proyecto realizado para la pre-entrega de Talento Tech.</p>
      </div>

      <div className="footer-equipo">
        {equipo.map((persona) => (
          <div className="card-persona" key={persona.id}>
            <img src={persona.fotoURL} alt={persona.nombre} />
            <h4>{persona.nombre}</h4>
            <p>{persona.rol}</p>
            <a href={persona.linkedinURL} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        ))}
      </div>
    </footer>
  );
}

export default Footer;