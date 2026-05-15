import "./App.css";
import Layout from "./componentes/layout/Layout";
import Productos from "./componentes/pages/Productos";
import Carrito from "./componentes/pages/Carrito";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetalleProducto from "./componentes/pages/DetalleProducto";
import Inicio from "./componentes/pages/Inicio";

function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
        <Layout>
          <Inicio />
        </Layout>
        }
      />

      <Route
          path="/producto/:id"
          element={
        <Layout>
          <DetalleProducto />
        </Layout>
        }
      />
      <Route
          path="/productos"
          element={
          <Layout>
            <Productos />
          </Layout>
         }
      />

      <Route
          path="/carrito"
          element={
          <Layout>
            <Carrito />
          </Layout>
  }
/>
    </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
