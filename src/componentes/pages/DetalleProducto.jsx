import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useCart } from "../../context/CartContext";
import { Helmet } from "react-helmet-async";
import Spinner from "react-bootstrap/Spinner";

function DetalleProducto() {
  const { id } = useParams();
  const { agregarAlCarrito } = useCart();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const productoRef = doc(db, "productos", id);
        const respuesta = await getDoc(productoRef);

        if (respuesta.exists()) {
          setProducto({
            id: respuesta.id,
            ...respuesta.data(),
          });
        } else {
          setError("El producto no existe.");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        setError("No se pudo cargar el producto.");
      } finally {
        setCargando(false);
      }
    };

    obtenerProducto();
  }, [id]);

  if (cargando) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">
            Cargando producto...
          </span>
        </Spinner>

        <p className="mt-2">Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <main className="detalle-producto">
        <h2>{error}</h2>

        <Link to="/productos" className="boton-accion boton-volver">
          Volver a productos
        </Link>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>{producto.nombre} | TecnoMarket</title>

        <meta
          name="description"
          content={
            producto.descripcion ||
            `Conocé ${producto.nombre} en TecnoMarket.`
          }
        />
      </Helmet>

      <main className="detalle-producto">
        <img
          src={
            producto.imagen ||
            "https://placehold.co/500x500?text=Sin+Imagen"
          }
          alt={producto.nombre}
        />

        <h1>{producto.nombre}</h1>

        <p className="detalle-precio">
          ${Number(producto.precio).toLocaleString("es-AR")}
        </p>

        <p>{producto.descripcion}</p>

        <button
          className="boton-accion boton-carrito"
          onClick={() => agregarAlCarrito(producto)}
        >
          Añadir al carrito
        </button>

        <Link
          to="/productos"
          className="boton-accion boton-volver"
        >
          Volver a productos
        </Link>
      </main>
    </>
  );
}

export default DetalleProducto;