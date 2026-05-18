import { useCart } from "../../context/CartContext.jsx";

function Carrito() {
  const { carrito } = useCart();

  return (
    <div className="carrito">
      <h1>Carrito de compras</h1>

      {carrito.length === 0 ? (
        <p>No hay productos agregados todavía.</p>
      ) : (
        carrito.map((producto) => (
          <div key={producto.id} className="producto-carrito">
            <h2>{producto.nombre}</h2>

            <p>Precio: ${producto.precio}</p>

            <p>Cantidad: {producto.cantidad}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Carrito;