import type { ObjetoAstronomico } from '../types'
import { TIPO_CHOICES } from '../types'
import './ObjectCard.css'

const tipoLabels: Record<string, string> = Object.fromEntries(
  TIPO_CHOICES.map((t) => [t.value, t.label]),
)

function getTipoLabel(value: string): string {
  return tipoLabels[value] ?? value
}

interface ObjectCardProps {
  objeto: ObjetoAstronomico
}

function ObjectCard({ objeto }: ObjectCardProps) {
  return (
    <article className="card">
      <header className="card-header">
        <h2 className="card-title">{objeto.nombre}</h2>
        <span className="card-badge">{getTipoLabel(objeto.tipo)}</span>
      </header>
      <div className="card-body">
        <p className="card-description">{objeto.descripcion}</p>
        <div className="card-meta">
          <span>Constelación: {objeto.constelacion}</span>
          <span>Descubierto: {new Date(objeto.fecha_descubrimiento).toLocaleDateString()}</span>
        </div>
      </div>
      <footer className="card-footer">
        <a href={`/objects/${objeto.id}`} className="btn btn-text">
          Ver más
        </a>
      </footer>
    </article>
  )
}

export default ObjectCard
