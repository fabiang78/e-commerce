import { useState } from "react";
import styles from "./TarjetaProducto.module.css";
import { Link } from "react-router-dom";

function TarjetaProducto({ id, imagen, nombre, precio }) {
  const [esFavorito, setEsFavorito] = useState(false);

  const toggleFavorito = () => {
    setEsFavorito(!esFavorito);
  };

  return (
    <div className={styles.tarjeta}>
      <img className={styles.imagen} src={imagen} alt={nombre} />

      <div className={styles.encabezado}>
        <h3 className={styles.nombre}>{nombre}</h3>
        <button className={styles.botonFavorito} onClick={toggleFavorito}>
          {esFavorito ? "⭐" : "☆"}
        </button>
      </div>

      <p className={styles.precio}>${precio}</p>

      <button className={styles.botonComprar}>Añadir producto</button>
      <Link to={`/producto/${id}`}>
      <button className={styles.botonDetalle}>
          Ver detalle
      </button>
</Link>
    </div>
  );
}

export default TarjetaProducto;