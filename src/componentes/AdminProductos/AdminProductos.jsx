/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { 
  collection,
  getDocs, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc
} from "firebase/firestore";
import { Modal, Button } from "react-bootstrap";
import { db } from "../../firebase/firebase";
import FormularioProducto from "../FormularioProducto";
import { Helmet } from "react-helmet-async";

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const obtenerProductos = async () => {
    try {
      const productosRef = collection(db, "productos");
      const respuesta = await getDocs(productosRef);

      const productosFirebase = respuesta.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      }));

      setProductos(productosFirebase);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };
  
  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleFormSubmit = async (producto) => {
    setLoading(true);

    try {
      if (productoAEditar) {
        const productoRef = doc(db, "productos", productoAEditar.id);

        await updateDoc(productoRef, producto);

        alert("Producto actualizado correctamente");

        setProductoAEditar(null);
      } else {
        const productosRef = collection(db, "productos");

        await addDoc(productosRef, producto);

        alert("Producto agregado correctamente");
      }

      obtenerProductos();
    } catch (error) {
      console.error("Error al guardar producto:", error);
      alert("Ocurrió un error al guardar el producto");
    } finally {
      setLoading(false);
    }
    
    };
    
    const abrirModalEliminar = (producto) => {
  setProductoAEliminar(producto);
  setMostrarModal(true);
};

const cerrarModalEliminar = () => {
  setProductoAEliminar(null);
  setMostrarModal(false);
};

const eliminarProducto = async () => {
  if (!productoAEliminar) return;

  try {
    const productoRef = doc(
      db,
      "productos",
      productoAEliminar.id
    );

    await deleteDoc(productoRef);

    if (productoAEditar?.id === productoAEliminar.id) {
      setProductoAEditar(null);
    }

    alert("Producto eliminado correctamente");

    await obtenerProductos();
    cerrarModalEliminar();
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    alert("Ocurrió un error al eliminar el producto");
  }
};
  return (
    <>
      <Helmet>
      <title>Administrar productos | TecnoMarket</title>
      <meta
        name="description"
        content="Panel de administración de productos de TecnoMarket."
      />
    </Helmet>
    
  <main className="admin-productos">
    <section className="admin-formulario">
      <h1>Administrar productos</h1>

      <p className="admin-descripcion">
        Agregá nuevos productos o seleccioná uno de la lista para editarlo.
      </p>

      <FormularioProducto
        key={productoAEditar ? productoAEditar.id : "nuevo"}
        onSubmit={handleFormSubmit}
        loading={loading}
        productoAEditar={productoAEditar}
      />

      {productoAEditar && (
        <button
          type="button"
          className="boton-cancelar-edicion"
          onClick={() => setProductoAEditar(null)}
        >
          Cancelar edición
        </button>
      )}
    </section>

    <section className="admin-listado">
      <div className="admin-listado-encabezado">
        <div>
          <h2>Productos registrados</h2>
          <p>
            Total de productos: <strong>{productos.length}</strong>
          </p>
        </div>
      </div>

      {productos.length === 0 ? (
        <p className="admin-sin-productos">
          No hay productos registrados.
        </p>
      ) : (
        <div className="tabla-contenedor">
          <table className="tabla-productos">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>
                    ${Number(producto.precio).toLocaleString("es-AR")}
                  </td>
                  <td className="acciones-producto">
                    <button
                      type="button"
                      className="boton-editar"
                      onClick={() => setProductoAEditar(producto)}
                      aria-label={`Editar ${producto.nombre}`}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="boton-eliminar"
                      onClick={() => abrirModalEliminar(producto)}
                      aria-label={`Eliminar ${producto.nombre}`}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
    <Modal show={mostrarModal} onHide={cerrarModalEliminar} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar eliminación</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        ¿Seguro que querés eliminar el producto{" "}
        <strong>{productoAEliminar?.nombre}</strong>?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={cerrarModalEliminar}>
          Cancelar
        </Button>

        <Button variant="danger" onClick={eliminarProducto}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  </main>
  </>
);
}
export default AdminProductos;