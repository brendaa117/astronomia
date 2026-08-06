import { useEffect, useState, useCallback } from 'react'
import type { ObjetoAstronomico } from '../types'
import { fetchObjetos, fetchObjeto } from '../api/astronomiaApi'

export function useObjetos() {
  const [datos, setDatos] = useState<ObjetoAstronomico[] | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setCargando(true)
    setError(null)
    try {
      const data = await fetchObjetos()
      setDatos(data)
    } catch {
      setError('No se pudieron cargar los objetos.')
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { datos, cargando, error, refetch }
}

export function useObjeto(id: number) {
  const [datos, setDatos] = useState<ObjetoAstronomico | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setCargando(true)
    setError(null)
    try {
      const data = await fetchObjeto(id)
      setDatos(data)
    } catch {
      setError('No se pudo cargar el objeto.')
    } finally {
      setCargando(false)
    }
  }, [id])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { datos, cargando, error, refetch }
}
