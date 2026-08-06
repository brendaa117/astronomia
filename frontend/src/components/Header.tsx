import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">Astronomía</div>
        <nav className="nav">
          <NavLink to="/" className="nav-link" end>
            Catálogo
          </NavLink>
          <NavLink to="/objects/new" className="nav-link">
            Nuevo
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
