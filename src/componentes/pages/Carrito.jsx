import { useCart } from "../../context/CartContext.jsx";

function Carrito() {
  const { carrito, vaciarCarrito } = useCart();

  const manejarVaciarCarrito = () => {
    const confirmar = window.confirm(
      "¿Está seguro de que desea vaciar el carrito?"
    );

    if (confirmar) {
      vaciarCarrito();
    }
  };

  return (
    <div className="carrito">
      <h1>Carrito de compras</h1>

      {carrito.length === 0 ? (
        <p>No hay productos agregados todavía.</p>
      ) : (
        <>
          {carrito.map((producto) => (
            <div key={producto.id} className="producto-carrito">
              <h2>{producto.nombre}</h2>

              <p>Precio: ${producto.precio}</p>

              <p>Cantidad: {producto.cantidad}</p>
            </div>
          ))}

          <div style={{ marginTop: "20px" }}>
            <button
              className="btn btn-outline-danger"
              onClick={manejarVaciarCarrito}
              aria-label="Vaciar el carrito de compras"
            >
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;