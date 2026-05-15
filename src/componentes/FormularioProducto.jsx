function FormularioProducto({ onSubmit, loading }) {
  const manejarEnvio = (e) => {
    e.preventDefault();

    const producto = {
      nombre: e.target.nombre.value,
      precio: e.target.precio.value,
    };

    onSubmit(producto);
  };

  return (
    <form onSubmit={manejarEnvio}>
      <input name="nombre" placeholder="Nombre del producto" />
      <input name="precio" placeholder="Precio" />

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Agregar producto"}
      </button>
    </form>
  );
}

export default FormularioProducto;