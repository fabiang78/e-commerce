import { useEffect, useState } from "react";
import ListaProductos from "../ListaProductos/ListaProductos";

const Inicio = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/productos.json")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar los productos");
        }

        return respuesta.json();
      })
      .then((datos) => {
        setProductos(datos);
        setCargando(false);
      })
      .catch((error) => {
        setError(error.message);
        setCargando(false);
      });
  }, []);

  return (
    <main className="inicio">
      <section className="inicio-hero">
        <h1>Bienvenidos a nuestra tienda</h1>

        <p>
          Descubrí productos seleccionados, ofertas especiales y novedades.
        </p>

        <button>Ver productos</button>
      </section>

      <section className="productos-destacados">
        <h2>Productos destacados</h2>

        {cargando && <p>Cargando productos...</p>}

        {error && <p>Error: {error}</p>}

        {!cargando && !error && <ListaProductos productos={productos} />}
      </section>
    </main>
  );
};

export default Inicio;