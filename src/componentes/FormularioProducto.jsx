function FormularioProducto({ onSubmit, loading, productoAEditar }) {
  const manejarEnvio = (e) => {
    e.preventDefault();

    const nombre = e.target.nombre.value;
    const precio = e.target.precio.value;
    const imagen = e.target.imagen.value;
    const descripcion = e.target.descripcion.value;
    
    if (nombre.trim() === "") {
      alert("El nombre es obligatorio");
      return;
    }

    if (Number(precio) <= 0) {
      alert("El precio debe ser mayor que cero");
      return;
    }

    const producto = {
      nombre,
      precio: Number(precio),
      imagen,
      descripcion,
    };

    onSubmit(producto);

    e.target.reset();
  };

  return (
    <form onSubmit={manejarEnvio}>
      <h2>{productoAEditar ? "Editar producto" : "Agregar producto"}</h2>

      <input
        name="nombre"
        placeholder="Nombre del producto"
        defaultValue={productoAEditar ? productoAEditar.nombre : ""}
      />

      <input
        name="precio"
        placeholder="Precio"
        type="number"
        defaultValue={productoAEditar ? productoAEditar.precio : ""}
      />
      <input
        name="imagen"
        placeholder="URL de la imagen"
        defaultValue={productoAEditar ? productoAEditar.imagen : ""}
      />
      
      <textarea
        name="descripcion"
        placeholder="Descripción del producto"
        defaultValue={productoAEditar ? productoAEditar.descripcion : ""}
      />

      <button type="submit" disabled={loading}>
        {loading
          ? "Guardando..."
          : productoAEditar
          ? "Actualizar producto"
          : "Agregar producto"}
      </button>
    </form>
  );
}

export default FormularioProducto;