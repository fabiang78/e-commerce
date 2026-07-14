function FormularioProducto({ onSubmit, loading, productoAEditar }) {
  const manejarEnvio = async (e) => {
    e.preventDefault();

    const formulario = e.currentTarget;

    const nombre = formulario.nombre.value;
    const precio = formulario.precio.value;
    const imagen = formulario.imagen.value;
    const descripcion = formulario.descripcion.value;

    if (nombre.trim() === "") {
      alert("El nombre es obligatorio");
      return;
    }

    if (Number(precio) <= 0) {
      alert("El precio debe ser mayor que cero");
      return;
    }

    const producto = {
      nombre: nombre.trim(),
      precio: Number(precio),
      imagen: imagen.trim(),
      descripcion: descripcion.trim(),
    };

    await onSubmit(producto);

    formulario.reset();
  };

  return (
    <form className="formulario-producto" onSubmit={manejarEnvio}>
      <h2>
        {productoAEditar ? "Editar producto" : "Agregar producto"}
      </h2>

      <div className="formulario-grid">
        <div className="campo-formulario">
          <label htmlFor="nombre">Nombre del producto</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Ejemplo: Smart TV 50 pulgadas"
            defaultValue={productoAEditar?.nombre || ""}
            required
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="precio">Precio</label>
          <input
            id="precio"
            name="precio"
            type="number"
            min="1"
            step="0.01"
            placeholder="Ejemplo: 250000"
            defaultValue={productoAEditar?.precio || ""}
            required
          />
        </div>

        <div className="campo-formulario campo-completo">
          <label htmlFor="imagen">URL de la imagen</label>
          <input
            id="imagen"
            name="imagen"
            type="text"
            placeholder="Ruta o imagen del producto"
            defaultValue={productoAEditar?.imagen || ""}
          />
        </div>

        <div className="campo-formulario campo-completo">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows="5"
            placeholder="Escribí una descripción breve del producto"
            defaultValue={productoAEditar?.descripcion || ""}
          />
        </div>
      </div>

      <button
        className="boton-guardar-producto"
        type="submit"
        disabled={loading}
      >
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