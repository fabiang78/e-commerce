function Footer() {
  return (
    <footer className="footer">

      <div className="footer-info">
        <h3>Mi Tienda React</h3>
        <p>
          Proyecto realizado para la pre-entrega de Talento Tech.
        </p>
      </div>

      <div className="footer-equipo">

        <div className="card-persona">
          <h4>Ana</h4>
          <p>Diseño UI</p>
        </div>

        <div className="card-persona">
          <h4>Lucas</h4>
          <p>Frontend React</p>
        </div>

        <div className="card-persona">
          <h4>Sofía</h4>
          <p>Testing</p>
        </div>

      </div>

    </footer>
  );
}

export default Footer;