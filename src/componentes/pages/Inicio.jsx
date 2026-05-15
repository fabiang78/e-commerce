import { useEffect, useState } from "react";
import TarjetaProducto from "../TarjetaProducto/TarjetaProducto";

const Inicio = () => {
  const [productos, setProductos] = useState([]);
    useEffect(() => {
    fetch("/data/productos.json")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProductos(datos);
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

        <div className="contenedor-productos">

          {productos.map((producto) => (
            <TarjetaProducto
              key={producto.id}
              id={producto.id}
              imagen={producto.imagen}
              nombre={producto.nombre}
              precio={producto.precio}
            />
          ))}

        </div>
      </section>
    </main>
  );
};

export default Inicio;