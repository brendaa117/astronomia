export const TIPO_CHOICES = [
  { value: 'ESTRELLA', label: 'Estrella' },
  { value: 'PLANETA', label: 'Planeta' },
  { value: 'GALAXIA', label: 'Galaxia' },
  { value: 'NEBULOSA', label: 'Nebulosa' },
  { value: 'ASTEROIDE', label: 'Asteroide' },
  { value: 'COMETA', label: 'Cometa' },
] as const

export type TipoObjeto = (typeof TIPO_CHOICES)[number]['value']

export interface ObjetoAstronomico {
  id: number
  nombre: string
  tipo: TipoObjeto
  descripcion: string
  constelacion: string
  fecha_descubrimiento: string
  creado_en: string
  actualizado_en: string
}

export type NuevoObjeto = Omit<ObjetoAstronomico, 'id' | 'creado_en' | 'actualizado_en'>

export type FormularioObjeto = Omit<ObjetoAstronomico, 'id' | 'creado_en' | 'actualizado_en'>

export interface ApiError {
  detail?: string
  [key: string]: unknown
}
