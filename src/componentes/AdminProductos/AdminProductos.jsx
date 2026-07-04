/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import FormularioProducto from "../FormularioProducto";

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);

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
    const eliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Seguro que querés eliminar este producto?");

        if (!confirmar) return;

        try {
            const productoRef = doc(db, "productos", id);

            await deleteDoc(productoRef);
            if (productoAEditar?.id === id) {
            setProductoAEditar(null);
            }

            alert("Producto eliminado correctamente");

            obtenerProductos();
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            alert("Ocurrió un error al eliminar el producto");
        }
  };

  return (
    <main>
      
      <h1>Administrar productos</h1>

      <FormularioProducto
        key={productoAEditar ? productoAEditar.id : "nuevo"}
        onSubmit={handleFormSubmit}
        loading={loading}
        productoAEditar={productoAEditar}
      />

      <hr />

      <h2>Productos registrados</h2>

      {productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <table>
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
                <td>${producto.precio}</td>
                <td>
                <button onClick={() => setProductoAEditar(producto)}
                   aria-label={`Editar ${producto.nombre}`}
                   >
                     Editar
                </button>

                <button onClick={() => eliminarProducto(producto.id)}
                  aria-label={`Eliminar ${producto.nombre}`}
                  >
                    Eliminar
                </button>
                </td>
                </tr>
                ))}
            </tbody>
        </table>
      )}
    </main>
  );
}

export default AdminProductos;