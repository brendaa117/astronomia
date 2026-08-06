# Backend - API REST Astronomía

## Descripción General

Backend construido con **Django 6.0.7** y **Django REST Framework 3.17.1** que expone una API REST para gestionar objetos astronómicos (estrellas, planetas, galaxias, nebulosas, asteroides y cometas). Usa **PostgreSQL** como base de datos y **python-dotenv** para la gestión de variables de entorno.

## Stack Tecnológico

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| Django | 6.0.7 | Framework web |
| djangorestframework | 3.17.1 | API REST |
| django-cors-headers | 4.9.0 | CORS para frontend |
| psycopg2-binary | 2.9.12 | Conector PostgreSQL |
| python-dotenv | 1.2.2 | Variables de entorno |

## Estructura del Proyecto

```
backend/
├── config/
│   ├── settings.py       # Configuración general de Django
│   └── urls.py           # URL principal del proyecto
├── astronomia/
│   ├── models.py         # Modelo de datos
│   ├── serializers.py    # Serializadores DRF
│   ├── views.py          # ViewSets
│   ├── urls.py           # Rutas de la app
│   ├── admin.py          # Admin de Django
│   ├── migrations/       # Migraciones de BD
│   └── apps.py           # Configuración de la app
├── manage.py
├── requirements.txt
└── .env
```

## Modelo de Datos

Archivo: `astronomia/models.py`

El modelo central es `ObjetoAstronomico` con los siguientes campos:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `nombre` | CharField (100) | Nombre del objeto |
| `tipo` | CharField (20) | Tipo con choices: ESTRELLA, PLANETA, GALAXIA, NEBULOSA, ASTEROIDE, COMETA |
| `descripcion` | CharField (200) | Descripción corta |
| `constelacion` | CharField (100) | Constelación asociada |
| `fecha_descubrimiento` | DateField | Fecha de descubrimiento (default: hoy) |
| `creado_en` | DateTimeField | Timestamp de creación (auto) |
| `actualizado_en` | DateTimeField | Timestamp de última actualización (auto) |

## API REST - Endpoints

El router registra el ViewSet bajo el prefijo `objects`, generando automáticamente las siguientes rutas:

| Método | Endpoint | Acción | Descripción |
|--------|----------|--------|-------------|
| GET | `/api/objects/` | list | Listar todos los objetos |
| POST | `/api/objects/` | create | Crear un nuevo objeto |
| GET | `/api/objects/{id}/` | retrieve | Obtener un objeto por ID |
| PUT | `/api/objects/{id}/` | update | Actualizar objeto completo |
| PATCH | `/api/objects/{id}/` | partial_update | Actualizar campos parciales |
| DELETE | `/api/objects/{id}/` | destroy | Eliminar objeto |

### Ejemplo de Request Body (POST/PUT)

```json
{
  "nombre": "Sirius",
  "tipo": "ESTRELLA",
  "descripcion": "Estrella más brillante del cielo nocturno",
  "constelacion": "Can Mayor",
  "fecha_descubrimiento": "2024-01-15"
}
```

### Ejemplo de Response

```json
{
  "id": 1,
  "nombre": "Sirius",
  "tipo": "ESTRELLA",
  "descripcion": "Estrella más brillante del cielo nocturno",
  "constelacion": "Can Mayor",
  "fecha_descubrimiento": "2024-01-15",
  "creado_en": "2024-01-15T10:00:00Z",
  "actualizado_en": "2024-01-15T10:00:00Z"
}
```

## Componentes

### 1. Model (`astronomia/models.py`)
Define la estructura de datos y la lógica de negocio básica. Incluye choices para el campo `tipo` y timestamps automáticos.

### 2. Serializer (`astronomia/serializers.py`)
`ObjetoAstronomicoSerializer` es un `ModelSerializer` que convierte instancias del modelo a JSON y valida datos de entrada. Usa `fields = '__all__'` para exponer todos los campos.

### 3. ViewSet (`astronomia/views.py`)
`ObjetoAstronomicoViewSet` extiende `ModelViewSet` de DRF, proporcionando automáticamente las operaciones CRUD sin necesidad de escribir métodos adicionales.

### 4. Router y URLs
- `astronomia/urls.py`: Usa `DefaultRouter` para registrar el ViewSet en `/objects/`
- `config/urls.py`: Monta la app bajo el prefijo `/api/` y expone el admin en `/admin/`

## Flujo de una Petición

```
Cliente (Frontend)
    │
    ▼
config/urls.py
    │
    ├── /admin/ → Django Admin
    └── /api/ → include('astronomia.urls')
            │
            ▼
        astronomia/urls.py (DefaultRouter)
            │
            ▼
        ObjetoAstronomicoViewSet (ModelViewSet)
            │
            ├── GET /api/objects/ → ObjetoAstronomico.objects.all()
            ├── POST /api/objects/ → Crea nuevo objeto
            ├── GET /api/objects/{id}/ → Obtiene por ID
            ├── PUT/PATCH /api/objects/{id}/ → Actualiza
            └── DELETE /api/objects/{id}/ → Elimina
            │
            ▼
        ObjetoAstronomicoSerializer
            │
            ▼
        Base de Datos (PostgreSQL)
```

## Configuración

### Variables de Entorno (.env)
```
DB_NAME=nombre_bd
DB_USER=usuario
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
```

### CORS
Configurado en `settings.py` para permitir requests desde `http://localhost:5173`.

### Base de Datos
Motor: PostgreSQL (`django.db.backends.postgresql`)

## Comandos Útiles

```bash
# Activar entorno virtual
.\venv\Scripts\Activate.ps1

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Ejecutar servidor
python manage.py runserver
```
