import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const registrarUsuario = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/admin-productos");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
  <>
    <Helmet>
      <title>Registro | TecnoMarket</title>
      <meta
        name="description"
        content="Creá una cuenta en TecnoMarket para acceder a las funciones de administración."
      />
    </Helmet>

    <main className="auth-container">
      <h1>Crear cuenta</h1>

      <form onSubmit={registrarUsuario} className="auth-form">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Ingresá tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit">Registrarse</button>
      </form>

      <p className="auth-enlace">
        ¿Ya tenés una cuenta? <Link to="/login">Iniciá sesión</Link>
      </p>
    </main>
  </>
);
};

export default Registro;