import { useEffect, useState } from "react";
import ListaProductos from "../ListaProductos/ListaProductos";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Inicio = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const productosRef = collection(db, "productos");
        const respuesta = await getDocs(productosRef);

        const productosFirebase = respuesta.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProductos(productosFirebase);
      } catch {
        setError("No se pudieron cargar los productos");
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
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