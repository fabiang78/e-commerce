import { useEffect, useState } from "react";
import ListaProductos from "../ListaProductos/ListaProductos";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import {
  Hero,
  HeroTitulo,
  HeroTexto,
  HeroButton
} from "../styled/HeroStyles";

const Inicio = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 4;

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
    
  const productosFiltrados = productos.filter((producto) =>
  producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
);
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;

  const productosPaginados = productosFiltrados.slice(
        indicePrimerProducto,
        indiceUltimoProducto
);

  const totalPaginas = Math.ceil(
        productosFiltrados.length / productosPorPagina
);
  
    return (
      <>
       <Helmet>
    <title>Inicio | TecnoMarket</title>
    <meta
      name="description"
      content="TecnoMarket - Tienda online desarrollada con React y Firebase."
    />
  </Helmet>
    <main className="inicio">
      <Hero>

        <HeroTitulo>
            Bienvenidos a TecnoMarket
        </HeroTitulo>

        <HeroTexto>
            Encontrá los mejores electrodomésticos y productos tecnológicos para equipar tu hogar.
        </HeroTexto>

        <Link to="/productos">
            <HeroButton aria-label="Ver todos los productos">
               Ver productos
            </HeroButton>
        </Link>

</Hero>

      <section className="productos-destacados">
        <h2>Productos destacados</h2>
        

        <div className="input-group mb-4 buscador-productos">
          <span className="input-group-text">
            <FaSearch />
          </span>

          <input
            type="text"
              className="form-control"
              placeholder="Buscar productos por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              aria-label="Buscar productos por nombre"
          />
        </div>

        {cargando && <p>Cargando productos...</p>}

        {error && <p>Error: {error}</p>}

        {!cargando && !error && productos.length === 0 && (
         <p>No hay productos disponibles.</p>
        )}

        {!cargando && !error && productosFiltrados.length === 0 && (
          <p>No se encontraron productos con ese nombre.</p>
        )}

        {!cargando && !error && productosFiltrados.length > 0 && (
          <ListaProductos productos={productosPaginados} />
        )}
        {totalPaginas > 1 && (
        <div className="paginacion mt-4">
          {Array.from({ length: totalPaginas }, (_, index) => (
            <button
               key={index + 1}
               className={`btn mx-1 ${
               paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"
              }`}
                onClick={() => setPaginaActual(index + 1)}
        >
          {index + 1}
            </button>
          ))}
          </div>
)}
      </section>
    </main>
    </>
  );
};

export default Inicio;