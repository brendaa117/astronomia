import http from 'http'

const TIPOS = ['ESTRELLA', 'PLANETA', 'GALAXIA', 'NEBULOSA', 'ASTEROIDE', 'COMETA']
const CONSTELACIONES = [
  'Orión',
  'Cisne',
  'Águila',
  'Cáncer',
  'Tauro',
  'Lyra',
  'Acuario',
  'Escorpio',
]

let nextId = 4
const objetos = [
  {
    id: 1,
    nombre: 'Sol',
    tipo: 'ESTRELLA',
    descripcion: 'Estrella del sistema solar.',
    constelacion: 'Infierno',
    fecha_descubrimiento: '1950-01-01',
    creado_en: '2024-01-01T10:00:00Z',
    actualizado_en: '2024-01-01T10:00:00Z',
  },
  {
    id: 2,
    nombre: 'Júpiter',
    tipo: 'PLANETA',
    descripcion: 'Gigante gaseoso, el planeta más grande del sistema solar.',
    constelacion: 'Aquario',
    fecha_descubrimiento: '1610-01-01',
    creado_en: '2024-01-02T10:00:00Z',
    actualizado_en: '2024-01-02T10:00:00Z',
  },
  {
    id: 3,
    nombre: 'Nebulosa de Órion',
    tipo: 'NEBULOSA',
    descripcion: 'Nebulosa difusa en la constelación de Orión.',
    constelacion: 'Orión',
    fecha_descubrimiento: '1610-11-26',
    creado_en: '2024-01-03T10:00:00Z',
    actualizado_en: '2024-01-03T10:00:00Z',
  },
]

function nowISO() {
  return new Date().toISOString()
}

function send(res, code, body) {
  const json = JSON.stringify(body)
  res.writeHead(code, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(json)
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost')
  const parts = url.pathname.split('/').filter(Boolean)

  if (req.method === 'OPTIONS') {
    send(res, 200, {})
    return
  }

  if (parts[0] !== 'api' || parts[1] !== 'objects') {
    send(res, 404, { detail: 'Not found' })
    return
  }

  const hasId = parts[2] !== undefined
  const id = hasId ? Number(parts[2]) : null

  if (req.method === 'GET' && !hasId) {
    return send(res, 200, objetos)
  }

  if (req.method === 'GET' && hasId) {
    const obj = objetos.find((o) => o.id === id)
    if (!obj) return send(res, 404, { detail: 'Not found.' })
    return send(res, 200, obj)
  }

  if (req.method === 'POST') {
    let body = ''
    req.on('data', (c) => (body += c))
    req.on('end', () => {
      let payload
      try {
        payload = JSON.parse(body || '{}')
      } catch {
        return send(res, 400, { detail: 'Invalid JSON.' })
      }
      const nuevo = {
        id: nextId++,
        nombre: payload.nombre,
        tipo: payload.tipo,
        descripcion: payload.descripcion,
        constelacion: payload.constelacion,
        fecha_descubrimiento: payload.fecha_descubrimiento,
        creado_en: nowISO(),
        actualizado_en: nowISO(),
      }
      objetos.push(nuevo)
      return send(res, 201, nuevo)
    })
    return
  }

  if (req.method === 'PUT' && hasId) {
    let body = ''
    req.on('data', (c) => (body += c))
    req.on('end', () => {
      let payload
      try {
        payload = JSON.parse(body || '{}')
      } catch {
        return send(res, 400, { detail: 'Invalid JSON.' })
      }
      const idx = objetos.findIndex((o) => o.id === id)
      if (idx === -1) return send(res, 404, { detail: 'Not found.' })
      const actualizado = { ...objetos[idx], ...payload, actualizado_en: nowISO() }
      objetos[idx] = actualizado
      return send(res, 200, actualizado)
    })
    return
  }

  if (req.method === 'DELETE' && hasId) {
    const idx = objetos.findIndex((o) => o.id === id)
    if (idx === -1) return send(res, 404, { detail: 'Not found.' })
    objetos.splice(idx, 1)
    return send(res, 204, null)
  }

  send(res, 405, { detail: 'Method not allowed.' })
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Mock API (DRF-like) running at http://127.0.0.1:8000/api/')
})
