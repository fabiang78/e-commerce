import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function DetalleProducto() {
  const { id } = useParams();
  const { agregarAlCarrito } = useCart();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch("/data/productos.json")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        const productoEncontrado = datos.find(
          (prod) => prod.id === Number(id)
        );

        setProducto(productoEncontrado);
      });
  }, [id]);

  if (!producto) {
    return <h2>Cargando producto...</h2>;
  }

  return (
    <main className="detalle-producto">
      <img
        src={producto.imagen}
        alt={producto.nombre}
      />

      <h1>{producto.nombre}</h1>

      <p className="detalle-precio">
        ${producto.precio}
      </p>

      <p>{producto.descripcion}</p>

      <button className="boton-accion boton-carrito"
      onClick={() => agregarAlCarrito(producto)}>
        Añadir al carrito
      </button>

      <Link to="/" className="boton-accion boton-volver">
        Volver al inicio
      </Link>
    </main>
  );
}

export default DetalleProducto;