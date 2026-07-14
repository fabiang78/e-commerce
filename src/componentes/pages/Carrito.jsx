import { useState } from "react";
import { useCart } from "../../context/CartContext.jsx";
import { Helmet } from "react-helmet-async";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCart();

  const [codigoCupon, setCodigoCupon] = useState("");
  const [cuponAplicado, setCuponAplicado] = useState(null);
  const [mensajeCupon, setMensajeCupon] = useState("");

  const manejarVaciarCarrito = () => {
    const confirmar = window.confirm(
      "¿Está seguro de que desea vaciar el carrito?"
    );

    if (confirmar) {
      vaciarCarrito();
      setCuponAplicado(null);
      setCodigoCupon("");
      setMensajeCupon("");
    }
  };

  const aplicarCupon = async () => {
    if (!codigoCupon.trim()) {
      setMensajeCupon("Ingresá un código de cupón.");
      return;
    }

    try {
      const respuesta = await getDocs(collection(db, "cupones"));

      const cuponEncontrado = respuesta.docs
        .map((documento) => ({
          id: documento.id,
          ...documento.data(),
        }))
        .find(
          (cupon) =>
            cupon.codigo.toUpperCase() ===
            codigoCupon.trim().toUpperCase()
        );

      if (!cuponEncontrado) {
        setCuponAplicado(null);
        setMensajeCupon("El cupón ingresado no es válido.");
        return;
      }

      const productoEnCarrito = carrito.some(
        (producto) =>
          producto.id === cuponEncontrado.productoId
      );

      if (!productoEnCarrito) {
        setCuponAplicado(null);
        setMensajeCupon(
          "El cupón no corresponde a ningún producto del carrito."
        );
        return;
      }

      setCuponAplicado(cuponEncontrado);
      setMensajeCupon(
        `Cupón ${cuponEncontrado.codigo} aplicado correctamente.`
      );
    } catch (error) {
      console.error("Error al aplicar cupón:", error);
      setMensajeCupon("No se pudo verificar el cupón.");
    }
  };

  const calcularPrecioProducto = (producto) => {
    const precio = Number(producto.precio);

    if (
      cuponAplicado &&
      cuponAplicado.productoId === producto.id
    ) {
      return precio * (1 - cuponAplicado.descuento / 100);
    }

    return precio;
  };

  const totalOriginal = carrito.reduce(
    (total, producto) =>
      total + Number(producto.precio) * producto.cantidad,
    0
  );

  const totalFinal = carrito.reduce(
    (total, producto) =>
      total +
      calcularPrecioProducto(producto) * producto.cantidad,
    0
  );

  const descuentoTotal = totalOriginal - totalFinal;

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
            <section className="cupon-carrito">
              <h2>¿Tenés un cupón de descuento?</h2>

              <input
                type="text"
                placeholder="Ingresá el código"
                value={codigoCupon}
                onChange={(e) => setCodigoCupon(e.target.value)}
              />

              <button
                type="button"
                className="btn btn-primary"
                onClick={aplicarCupon}
              >
                Aplicar cupón
              </button>

              {mensajeCupon && (
                <p className="mensaje-cupon">
                  {mensajeCupon}
                </p>
              )}
            </section>

            {carrito.map((producto) => {
              const tieneDescuento =
                cuponAplicado?.productoId === producto.id;

              const precioFinal =
                calcularPrecioProducto(producto);

              return (
                <div
                  key={producto.id}
                  className="producto-carrito"
                >
                  <img
                    src={
                      producto.imagen ||
                      "https://placehold.co/150x150?text=Sin+Imagen"
                    }
                    alt={producto.nombre}
                    width="150"
                  />

                  <h2>{producto.nombre}</h2>

                  {tieneDescuento ? (
                    <>
                      <p>
                        Precio original: $
                        {Number(
                          producto.precio
                        ).toLocaleString("es-AR")}
                      </p>

                      <p>
                        Cupón aplicado:{" "}
                        <strong>
                          {cuponAplicado.codigo}
                        </strong>
                      </p>

                      <p>
                        Descuento: {cuponAplicado.descuento}%
                      </p>

                      <p>
                        Precio con descuento: $
                        {precioFinal.toLocaleString("es-AR")}
                      </p>
                    </>
                  ) : (
                    <p>
                      Precio: $
                      {Number(
                        producto.precio
                      ).toLocaleString("es-AR")}
                    </p>
                  )}

                  <p>Cantidad: {producto.cantidad}</p>

                  <button
                    className="btn btn-outline-danger"
                    onClick={() =>
                      eliminarDelCarrito(producto.id)
                    }
                    aria-label={`Eliminar ${producto.nombre} del carrito`}
                  >
                    Eliminar
                  </button>
                </div>
              );
            })}

            <section className="resumen-carrito">
              <h2>Resumen de compra</h2>

              <p>
                Total original: $
                {totalOriginal.toLocaleString("es-AR")}
              </p>

              {descuentoTotal > 0 && (
                <p>
                  Descuento: -$
                  {descuentoTotal.toLocaleString("es-AR")}
                </p>
              )}

              <h3>
                Total: $
                {totalFinal.toLocaleString("es-AR")}
              </h3>
            </section>

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