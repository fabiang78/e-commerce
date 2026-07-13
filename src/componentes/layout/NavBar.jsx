import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/useAuth";

function NavBar() {
  const { cantidadTotal } = useCart();
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const manejarCerrarSesion = async () => {
  await cerrarSesion();
  navigate("/");
};

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

    {usuario && (
      <NavLink to="/admin-productos" className={claseActiva}>
        Admin
      </NavLink>
    )}

    <NavLink to="/carrito" className={claseActiva}>
      Carrito ({cantidadTotal})
    </NavLink>

    {!usuario ? (
      <>
        <NavLink to="/login" className={claseActiva}>
          Login
        </NavLink>

        <NavLink to="/registro" className={claseActiva}>
          Registro
        </NavLink>
      </>
    ) : (
      <>
        <span className="usuario-logueado">
          {usuario.email}
        </span>

        <button
          className="btn-logout"
          onClick={manejarCerrarSesion}
        >
          Salir
        </button>
      </>
    )}
  </nav>
);
  
}

export default NavBar;