import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ObjectForm from '../components/ObjectForm'
import Loading from '../components/Loading'
import ErrorFallback from '../components/ErrorFallback'
import { useObjeto } from '../hooks/useFetch'
import { actualizarObjeto } from '../api/astronomiaApi'
import type { FormularioObjeto } from '../types'
import './FormPage.css'

function ObjectEditPage() {
  const { id } = useParams<{ id: string }>()
  const objetoId = Number(id)
  const navigate = useNavigate()
  const { datos: objeto, cargando, error, refetch } = useObjeto(objetoId)
  const [guardando, setGuardando] = useState(false)

  const handleSubmit = async (data: FormularioObjeto) => {
    setGuardando(true)
    try {
      await actualizarObjeto(objetoId, data)
      navigate(`/objects/${objetoId}`)
    } finally {
      setGuardando(false)
    }
  }

  if (cargando) return <Loading />
  if (error) return <ErrorFallback error={error} onRetry={refetch} />
  if (!objeto) return null

  const initialValues: Partial<FormularioObjeto> = {
    nombre: objeto.nombre,
    tipo: objeto.tipo,
    descripcion: objeto.descripcion,
    constelacion: objeto.constelacion,
    fecha_descubrimiento: objeto.fecha_descubrimiento.split('T')[0],
  }

  return (
    <section className="form-page">
      <h1>Editar: {objeto.nombre}</h1>
      <ObjectForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel="Guardar cambios"
        loading={guardando}
      />
    </section>
  )
}

export default ObjectEditPage
