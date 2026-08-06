import axios from 'axios'
import type { ObjetoAstronomico, NuevoObjeto } from '../types'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    console.error('[API Error]', error)
    return Promise.reject(error)
  },
)

export const fetchObjetos = async (): Promise<ObjetoAstronomico[]> => {
  const { data } = await api.get<ObjetoAstronomico[]>('/objects/')
  return data
}

export const fetchObjeto = async (id: number): Promise<ObjetoAstronomico> => {
  const { data } = await api.get<ObjetoAstronomico>(`/objects/${id}/`)
  return data
}

export const crearObjeto = async (
  objeto: NuevoObjeto,
): Promise<ObjetoAstronomico> => {
  const { data } = await api.post<ObjetoAstronomico>('/objects/', objeto)
  return data
}

export const actualizarObjeto = async (
  id: number,
  objeto: NuevoObjeto,
): Promise<ObjetoAstronomico> => {
  const { data } = await api.put<ObjetoAstronomico>(`/objects/${id}/`, objeto)
  return data
}

export const eliminarObjeto = async (id: number): Promise<void> => {
  await api.delete(`/objects/${id}/`)
}
