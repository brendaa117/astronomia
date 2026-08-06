import { useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom'
import { useObjeto } from '../hooks/useFetch'
import { eliminarObjeto } from '../api/astronomiaApi'
import Loading from '../components/Loading'
import ErrorFallback from '../components/ErrorFallback'
import { TIPO_CHOICES } from '../types'
import './ObjectDetailPage.css'

function getTipoLabel(value: string): string {
  return TIPO_CHOICES.find((t) => t.value === value)?.label ?? value
}

function ObjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const objetoId = Number(id)

  const { datos: objeto, cargando, error, refetch } = useObjeto(objetoId)
  const [eliminando, setEliminando] = useState(false)

  const handleEliminar = async () => {
    const confirmado = window.confirm(
      `¿Estás seguro de eliminar "${objeto?.nombre}"?`,
    )
    if (!confirmado) return

    setEliminando(true)
    try {
      await eliminarObjeto(objetoId)
      navigate('/')
    } finally {
      setEliminando(false)
    }
  }

  if (cargando) return <Loading />
  if (error) return <ErrorFallback error={error} onRetry={refetch} />
  if (!objeto) return null

  return (
    <article className="detail">
      <div className="detail-header">
        <div>
          <span className="detail-badge">{getTipoLabel(objeto.tipo)}</span>
          <h1 className="detail-title">{objeto.nombre}</h1>
        </div>
        <div className="detail-actions">
          <NavLink
            to={`/objects/${objeto.id}/edit`}
            className="btn btn-outline"
          >
            Editar
          </NavLink>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleEliminar}
            disabled={eliminando}
          >
            {eliminando ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>

      <div className="detail-body">
        <p className="detail-description">{objeto.descripcion}</p>
        <dl className="detail-grid">
          <div className="detail-item">
            <dt>Tipo</dt>
            <dd>{getTipoLabel(objeto.tipo)}</dd>
          </div>
          <div className="detail-item">
            <dt>Constelación</dt>
            <dd>{objeto.constelacion}</dd>
          </div>
          <div className="detail-item">
            <dt>Fecha de descubrimiento</dt>
            <dd>
              {new Date(objeto.fecha_descubrimiento).toLocaleDateString()}
            </dd>
          </div>
          <div className="detail-item">
            <dt>Creado</dt>
            <dd>{new Date(objeto.creado_en).toLocaleDateString()}</dd>
          </div>
          <div className="detail-item">
            <dt>Actualizado</dt>
            <dd>{new Date(objeto.actualizado_en).toLocaleDateString()}</dd>
          </div>
        </dl>
      </div>

      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => navigate(-1)}
      >
        Volver
      </button>
    </article>
  )
}

export default ObjectDetailPage
