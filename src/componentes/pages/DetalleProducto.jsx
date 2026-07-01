import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useCart } from "../../context/CartContext";

function DetalleProducto() {
  const { id } = useParams();
  const { agregarAlCarrito } = useCart();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const obtenerProducto = async () => {
      const productoRef = doc(db, "productos", id);
      const respuesta = await getDoc(productoRef);

      if (respuesta.exists()) {
        setProducto({
          id: respuesta.id,
          ...respuesta.data(),
        });
      }
    };

    obtenerProducto();
  }, [id]);

  if (!producto) {
    return <h2>Cargando producto...</h2>;
  }

  return (
    <main className="detalle-producto">
      <img src={producto.imagen ||"https://placehold.co/500x500?text=Sin+Imagen"} alt={producto.nombre} />

      <h1>{producto.nombre}</h1>

      <p className="detalle-precio">${producto.precio}</p>

      <p>{producto.descripcion}</p>

      <button
        className="boton-accion boton-carrito"
        onClick={() => agregarAlCarrito(producto)}
      >
        Añadir al carrito
      </button>

      <Link to="/" className="boton-accion boton-volver">
        Volver al inicio
      </Link>
    </main>
  );
}

export default DetalleProducto;