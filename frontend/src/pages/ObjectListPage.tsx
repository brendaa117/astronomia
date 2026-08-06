import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ObjetoAstronomico } from '../types'
import ObjetoCard from '../components/ObjectCard'
import { useObjetos } from '../hooks/useFetch'
import './ObjectListPage.css'

function ObjectListPage() {
  const navigate = useNavigate()
  const { datos: objetos, cargando, error, refetch } = useObjetos()
  const [busqueda, setBusqueda] = useState('')

  const filtrados = objetos?.filter((o) => {
    const term = busqueda.toLowerCase()
    return (
      o.nombre.toLowerCase().includes(term) ||
      o.tipo.toLowerCase().includes(term) ||
      o.constelacion.toLowerCase().includes(term)
    )
  }) ?? null

  return (
    <section>
      <div className="toolbar">
        <h1>Catálogo de objetos astronómicos</h1>
        <div className="toolbar-actions">
          <input
            type="text"
            className="input"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/objects/new')}
          >
            + Nuevo
          </button>
        </div>
      </div>

      {cargando && (
        <div className="grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card skeleton" />
          ))}
        </div>
      )}

      {error && <div className="alert alert-error">{error}</div>}

      {!cargando && !error && filtrados && filtrados.length === 0 && (
        <p className="empty-state">No se encontraron objetos.</p>
      )}

      {!cargando && filtrados && filtrados.length > 0 && (
        <div className="grid">
          {filtrados.map((objeto: ObjetoAstronomico) => (
            <ObjetoCard key={objeto.id} objeto={objeto} />
          ))}
        </div>
      )}

      {!cargando && error && (
        <button type="button" className="btn btn-outline" onClick={refetch}>
          Reintentar
        </button>
      )}
    </section>
  )
}

export default ObjectListPage
