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



