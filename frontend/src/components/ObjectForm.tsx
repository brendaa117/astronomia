import { useForm, type SubmitHandler } from 'react-hook-form'
import { TIPO_CHOICES, type FormularioObjeto } from '../types'
import './ObjectForm.css'

interface ObjectFormProps {
  initialValues?: Partial<FormularioObjeto>
  onSubmit: (data: FormularioObjeto) => Promise<void>
  submitLabel?: string
  loading?: boolean
}

function ObjectForm({
  initialValues,
  onSubmit,
  submitLabel = 'Guardar',
  loading = false,
}: ObjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormularioObjeto>({
    defaultValues: initialValues,
  })

  const handleFormSubmit: SubmitHandler<FormularioObjeto> = async (data) => {
    await onSubmit(data)
  }

  return (
    <form className="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            maxLength={100}
            className={errors.nombre ? 'input error' : 'input'}
            {...register('nombre', {
              required: 'El nombre es obligatorio',
              maxLength: {
                value: 100,
                message: 'Máximo 100 caracteres',
              },
            })}
          />
          {errors.nombre && (
            <span className="error-text">{errors.nombre.message}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="tipo">Tipo</label>
          <select
            id="tipo"
            className={errors.tipo ? 'input error' : 'input'}
            {...register('tipo', { required: 'Seleccioná un tipo' })}
          >
            <option value="">Seleccioná un tipo</option>
            {TIPO_CHOICES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {errors.tipo && (
            <span className="error-text">{errors.tipo.message}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="constelacion">Constelación</label>
          <input
            id="constelacion"
            type="text"
            maxLength={100}
            className={errors.constelacion ? 'input error' : 'input'}
            {...register('constelacion', {
              required: 'La constelación es obligatoria',
              maxLength: {
                value: 100,
                message: 'Máximo 100 caracteres',
              },
            })}
          />
          {errors.constelacion && (
            <span className="error-text">{errors.constelacion.message}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="fecha_descubrimiento">
            Fecha de descubrimiento
          </label>
          <input
            id="fecha_descubrimiento"
            type="date"
            className={
              errors.fecha_descubrimiento ? 'input error' : 'input'
            }
            {...register('fecha_descubrimiento', {
              required: 'La fecha es obligatoria',
            })}
          />
          {errors.fecha_descubrimiento && (
            <span className="error-text">
              {errors.fecha_descubrimiento.message}
            </span>
          )}
        </div>

        <div className="form-field full">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            maxLength={200}
            rows={3}
            className={errors.descripcion ? 'input error' : 'input'}
            {...register('descripcion', {
              required: 'La descripción es obligatoria',
              maxLength: {
                value: 200,
                message: 'Máximo 200 caracteres',
              },
            })}
          />
          {errors.descripcion && (
            <span className="error-text">{errors.descripcion.message}</span>
          )}
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Guardando...' : submitLabel}
      </button>
    </form>
  )
}

export default ObjectForm
