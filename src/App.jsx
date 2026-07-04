import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
//import { AuthProvider } from "./context/AuthContext";

import Layout from "./componentes/layout/Layout";
import Inicio from "./componentes/pages/Inicio";
import Productos from "./componentes/pages/Productos";
import DetalleProducto from "./componentes/pages/DetalleProducto";
import Carrito from "./componentes/pages/Carrito";
import AdminProductos from "./componentes/AdminProductos/AdminProductos";

function App() {
  return (
    //<AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/producto/:id" element={<DetalleProducto />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/admin-productos" element={<AdminProductos />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    //</AuthProvider>
  );
}

export default App;