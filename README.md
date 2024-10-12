# Michi REST
### Una API REST para todas las necesidades gatunas.

Michi REST permite la búsqueda, creación, actualización y eliminación de razas de gatos reconocidas por la Fédération Internationale Féline (FIF) además de razas experimentales.

![Gif de un gato siendo acariciado por una persona](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXNqdmt5enF1aWZvYzZ2bm54d3o4am0wamcwZ3lqaHhjbDd6endnZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TA6Fq1irTioFO/giphy.gif)

## Endpoints

### Rutas para Users: ###

**GET**
   - Traer todos los usuarios registrados

```
    http://127.0.0.1:3000/api/users
```
<br>

-   Traer todos un usuario por su nombre

```
    http://127.0.0.1:3000/api/users/name/:name
```
<br>

-   Traer todos un usuario por su ID

```
    http://127.0.0.1:3000/api/users/:id
```

<br>

**POST**
-   Crear un usuario

```
    http://127.0.0.1:3000/api/users/
```

<br>

-   Iniciar Sesión

```
    http://127.0.0.1:3000/api/users/login
```

<br>

**PUT**
-   Actualizar un usuario

```
    http://127.0.0.1:3000/api/users/:id
```

<br>

**DELETE**
-   Eliminar un usuario

```
    http://127.0.0.1:3000/api/users/:id
```
