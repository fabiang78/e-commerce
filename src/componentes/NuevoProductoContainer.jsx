import { useState } from "react";
import FormularioProducto from "./FormularioProducto";

function NuevoProductoContainer() {
  const [loading, setLoading] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);

  const handleFormSubmit = async (producto) => {
    setLoading(true);

    try {
      console.log("Producto recibido:", producto);

      // Simulamos una carga de 2 segundos
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Producto guardado correctamente");
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      alert("Ocurrió un error al guardar el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Nuevo producto</h2>

      <FormularioProducto 
        onSubmit={handleFormSubmit} 
        loading={loading} 
        productoAEditar={productoAEditar}
      />
    </div>
  );
}

export default NuevoProductoContainer;