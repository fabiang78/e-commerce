import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function NavBar() {
  const { cantidadTotal } = useCart();

  return (
    <nav className="navbar">

      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "activo" : "")}
      >
        Inicio
      </NavLink>

      <NavLink
        to="/productos"
        className={({ isActive }) => (isActive ? "activo" : "")}
      >
        Productos
      </NavLink>
      <NavLink
        to="/admin-productos"
        className={({ isActive }) => (isActive ? "activo" : "")}
      >
      Admin
      </NavLink>

      <NavLink
        to="/carrito"
        className={({ isActive }) => (isActive ? "activo" : "")}
      >
        Carrito ({cantidadTotal})
      </NavLink>

    </nav>
  );
}

export default NavBar;