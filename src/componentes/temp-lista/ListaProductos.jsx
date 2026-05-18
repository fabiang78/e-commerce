import TarjetaProducto from "../TarjetaProducto/TarjetaProducto";

function ListaProductos({ productos }) {
  return (
    <div className="contenedor-productos">
      {productos.map((producto) => (
        <TarjetaProducto
          key={producto.id}
          id={producto.id}
          imagen={producto.imagen}
          nombre={producto.nombre}
          precio={producto.precio}
        />
      ))}
    </div>
  );
}

export default ListaProductos;