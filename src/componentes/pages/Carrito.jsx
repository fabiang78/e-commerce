import { useCart } from "../../context/CartContext.jsx";
import { Helmet } from "react-helmet-async";

function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCart();

  const manejarVaciarCarrito = () => {
    const confirmar = window.confirm(
      "¿Está seguro de que desea vaciar el carrito?"
    );

    if (confirmar) {
      vaciarCarrito();
    }
  };

  return (
    <>
      <Helmet>
        <title>Carrito | TecnoMarket</title>
        <meta
          name="description"
          content="Revisá los productos agregados a tu carrito en TecnoMarket."
        />
      </Helmet>

      <main className="carrito">
        <h1>Carrito de compras</h1>

        {carrito.length === 0 ? (
          <p>No hay productos agregados todavía.</p>
        ) : (
          <>
            {carrito.map((producto) => (
              <div key={producto.id} className="producto-carrito">
                <h2>{producto.nombre}</h2>

                <p>
                  Precio: $
                  {Number(producto.precio).toLocaleString("es-AR")}
                </p>

                <p>Cantidad: {producto.cantidad}</p>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => eliminarDelCarrito(producto.id)}
                  aria-label={`Eliminar ${producto.nombre} del carrito`}
                >
                  Eliminar
                </button>
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
      </main>
    </>
  );
}

export default Carrito;