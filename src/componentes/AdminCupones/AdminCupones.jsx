/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Helmet } from "react-helmet-async";

function AdminCupones() {
  const [cupones, setCupones] = useState([]);
  const [productos, setProductos] = useState([]);
  const [codigo, setCodigo] = useState("");
  const [descuento, setDescuento] = useState("");
  const [productoId, setProductoId] = useState("");
  const [loading, setLoading] = useState(false);

  const obtenerDatos = async () => {
    try {
      const respuestaCupones = await getDocs(
        collection(db, "cupones")
      );

      const cuponesFirebase = respuestaCupones.docs.map(
        (documento) => ({
          id: documento.id,
          ...documento.data(),
        })
      );

      const respuestaProductos = await getDocs(
        collection(db, "productos")
      );

      const productosFirebase = respuestaProductos.docs.map(
        (documento) => ({
          id: documento.id,
          ...documento.data(),
        })
      );

      setCupones(cuponesFirebase);
      setProductos(productosFirebase);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  const crearCupon = async (e) => {
    e.preventDefault();

    if (!codigo.trim()) {
      alert("El código del cupón es obligatorio");
      return;
    }

    if (Number(descuento) <= 0 || Number(descuento) > 100) {
      alert("El descuento debe estar entre 1 y 100");
      return;
    }

    if (!productoId) {
      alert("Seleccioná un producto");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "cupones"), {
        codigo: codigo.trim().toUpperCase(),
        descuento: Number(descuento),
        productoId,
      });

      alert("Cupón creado correctamente");

      setCodigo("");
      setDescuento("");
      setProductoId("");

      await obtenerDatos();
    } catch (error) {
      console.error("Error al crear cupón:", error);
      alert("No se pudo crear el cupón");
    } finally {
      setLoading(false);
    }
  };

  const eliminarCupon = async (id) => {
    try {
      await deleteDoc(doc(db, "cupones", id));

      alert("Cupón eliminado correctamente");

      await obtenerDatos();
    } catch (error) {
      console.error("Error al eliminar cupón:", error);
      alert("No se pudo eliminar el cupón");
    }
  };

  const productoSeleccionado = productos.find(
    (producto) => producto.id === productoId
  );

  const obtenerProducto = (id) =>
    productos.find((producto) => producto.id === id);

  return (
    <>
      <Helmet>
        <title>Administrar cupones | TecnoMarket</title>
        <meta
          name="description"
          content="Administración de cupones de descuento de TecnoMarket."
        />
      </Helmet>

      <main className="admin-productos">
        <section className="admin-formulario">
          <h1>Administrar cupones</h1>

          <p className="admin-descripcion">
            Creá cupones de descuento asociados a productos.
          </p>

          <form onSubmit={crearCupon} className="auth-form">
            <label htmlFor="codigo">Código del cupón</label>
            <input
              id="codigo"
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Ejemplo: TECNO10"
            />

            <label htmlFor="descuento">Descuento (%)</label>
            <input
              id="descuento"
              type="number"
              value={descuento}
              onChange={(e) => setDescuento(e.target.value)}
              placeholder="10"
              min="1"
              max="100"
            />

            <label htmlFor="producto">Producto</label>
            <select
              id="producto"
              value={productoId}
              onChange={(e) => setProductoId(e.target.value)}
            >
              <option value="">Seleccionar producto</option>

              {productos.map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre}
                </option>
              ))}
            </select>

            {productoSeleccionado && (
              <div className="cupon-producto-preview">
                <img
                  src={
                    productoSeleccionado.imagen ||
                    "https://placehold.co/300x200?text=Sin+Imagen"
                  }
                  alt={productoSeleccionado.nombre}
                />

                <p>{productoSeleccionado.nombre}</p>
              </div>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Creando..." : "Crear cupón"}
            </button>
          </form>
        </section>

        <section className="admin-listado">
          <h2>Cupones registrados</h2>

          {cupones.length === 0 ? (
            <p>No hay cupones registrados.</p>
          ) : (
            <div className="tabla-contenedor">
              <table className="tabla-productos">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Código</th>
                    <th>Descuento</th>
                    <th>Producto</th>
                    <th>Acción</th>
                  </tr>
                </thead>

                <tbody>
                  {cupones.map((cupon) => {
                    const producto = obtenerProducto(cupon.productoId);

                    return (
                      <tr key={cupon.id}>
                        <td>
                          <img
                            src={
                              producto?.imagen ||
                              "https://placehold.co/80x80?text=Sin+Imagen"
                            }
                            alt={producto?.nombre || "Producto"}
                            width="70"
                          />
                        </td>

                        <td>{cupon.codigo}</td>

                        <td>{cupon.descuento}%</td>

                        <td>{producto?.nombre || "Producto no encontrado"}</td>

                        <td>
                          <button
                            type="button"
                            className="boton-eliminar"
                            onClick={() => eliminarCupon(cupon.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default AdminCupones;