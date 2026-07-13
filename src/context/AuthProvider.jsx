import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargandoAuth, setCargandoAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      setUsuario(usuarioFirebase);
      setCargandoAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const cerrarSesion = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargandoAuth,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;