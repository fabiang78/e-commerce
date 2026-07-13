import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin-productos");
    } catch {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
  <>
    <Helmet>
      <title>Iniciar sesión | TecnoMarket</title>
      <meta
        name="description"
        content="Iniciá sesión en TecnoMarket para acceder al panel de administración."
      />
    </Helmet>

    <main className="auth-container">
      <h1>Iniciar sesión</h1>

      <form onSubmit={iniciarSesion} className="auth-form">
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          placeholder="Ingresá tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="Ingresá tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit">Ingresar</button>
      </form>

      <p className="auth-enlace">
        ¿No tenés una cuenta? <Link to="/registro">Registrate</Link>
      </p>
    </main>
  </>
);
};

export default Login;