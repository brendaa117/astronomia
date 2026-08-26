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

# API de Clasificación de Objetos Astronómicos
API REST desarrollada con Django REST Framework para gestionar
información sobre objetos astronómicos.

## Tecnologías
- Python
- Django
- Django REST Framework
- PostgreSQL
- JWT
- Django Filters
- CORS

## Funcionalidades
- CRUD de objetos astronómicos
- Autenticación mediante JWT
- Autorización mediante permisos
- Paginación
- Filtrado
- Logout mediante blacklist
- CORS para integración con frontend

## URL BASE 
urls de desarrolllo:
http//127.0.0.1:8000

## API
los endpoints se encuentran primcipalmente bajo "/api/"

## authentication
la API utiliza Json web Tokens (JWT)
para acceder a endpoints portegidos  se debe enviar:
AUTHORIZATION: Bearer <access_token>

## Obtener tokens
-POST
    /api/token/

### Body
´´´json
{
    "username": "usuario",
    "password":"tu contraseña"
}

obtienes:
{
    "refresh":"refresh_token"
    "acces":"acces_token"
}

el frontends utilizara 
´´´text
access

## Renovar Access token 
el acces y token tienen un tiempo de vida de 5 min.

# POST
/api/token/refresh/

# body 
´´´json
{
    "access":"nuevo acces_token"
}

# CRUD 
´´´markdown 

# objetos astronomicos
ENDPOINTS:
/api/objects/

# listar objetos 
### GET
/api/objects/

vas a requeriri Authorization: bearer
<acces_token>

# crear objetos
### POSt
/api/objects/

{
    "nombre":
    "tipo":
    "descripcion"
    "contelacion"
    "fecha_descubrimiento"
}

# obtener un objeto
## GET
/api/objects/id/

# actualizar objeto
### PUT
/api/objects/id/

{
    "nombre":
    "tipo":
    "descripcion"
    "contelacion"
    "fecha_descubrimiento"
}

# filtros
los objetos se filtran por parametros de consult
EJEMPLO: GET /api/objects/?tipo=PLANETA

# paginacion
la API utiliza la paginacion para limitar la cantidad de objetos por peticion (en este caso 10 x pagina)

# codigo HTTP

codigo      sig
200         peticion exitosa
400         peticion incorrecta
401         sin autenticacion
403         sin permisos 
404         recruso no encontrado 

# CORS
durante el desarrollo, el front tinene autorizacion de desde:
http://localhost:5173
http://127.0.0.1:5173

# FLUJO DE FRONTEND

1.usuario inicia sesion:
POST /api/token/

2.el server te da:
access_token y refresh_token

3.front debe utilizar Bearer <acces_token>

4. cuando access token expire el front utiliza:
POST /api/token/refresh/

5.para cerrrar sesion:
POST /api/logout/

# logout
### POST
/api/logout/

BODY:
{
    "refresh": "refresh token"
}