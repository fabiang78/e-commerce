import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function NavBar() {
  const { cantidadTotal } = useCart();

  const claseActiva = ({ isActive }) =>
    isActive ? "activo" : "";

  return (
    <nav className="navbar">
      <NavLink to="/" className={claseActiva}>
        Inicio
      </NavLink>

      <NavLink to="/productos" className={claseActiva}>
        Productos
      </NavLink>

      <NavLink to="/admin-productos" className={claseActiva}>
        Admin
      </NavLink>

      <NavLink to="/carrito" className={claseActiva}>
        Carrito ({cantidadTotal})
      </NavLink>
    </nav>
  );
}

export default NavBar;