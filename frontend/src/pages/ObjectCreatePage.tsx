import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ObjectForm from '../components/ObjectForm'
import type { FormularioObjeto } from '../types'
import { crearObjeto } from '../api/astronomiaApi'
import './FormPage.css'

function ObjectCreatePage() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [guardando, setGuardando] = useState(false)

  const handleSubmit = async (data: FormularioObjeto) => {
    setGuardando(true)
    setError(null)
    try {
      await crearObjeto({
        nombre: data.nombre,
        tipo: data.tipo,
        descripcion: data.descripcion,
        constelacion: data.constelacion,
        fecha_descubrimiento: data.fecha_descubrimiento,
      })
      navigate('/')
    } catch (e) {
      setError('No se pudo crear el objeto. Intentalo de nuevo.')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <section className="form-page">
      <h1>Nuevo objeto astronómico</h1>
      {error && <div className="alert alert-error">{error}</div>}
      <ObjectForm
        onSubmit={handleSubmit}
        submitLabel="Crear"
        loading={guardando}
      />
    </section>
  )
}

export default ObjectCreatePage
