# E-commerce de Zapatillas

Este proyecto es un sistema de e-commerce enfocado en la venta de zapatillas. El sistema está dividido en dos partes principales: el servidor y el cliente. 

## Descripción del Proyecto

### Servidor (Back end)
El servidor está construido utilizando **Node.js** y **Express**. Toda la lógica del servidor, incluyendo la gestión de usuarios, productos, órdenes y autenticación, se maneja en esta parte del proyecto. Los datos se almacenan en una base de datos **MongoDB**.

### Cliente (Front end)
El cliente está desarrollado utilizando **Next.js** (versión 14 o superior). La aplicación del lado del cliente se encarga de la interacción con los usuarios, mostrando productos, manejando el carrito de compras, y procesando el checkout.

## Tecnologías Utilizadas

### Back end:
- Node.js
- Express
- MongoDB
- JWT (para autenticación)
- Mongoose (para modelar los datos de MongoDB)

### Front end:
- Next.js (14+)
- React
- Tailwind CSS (opcional, para el diseño)

## Instalación

### Prerrequisitos
- Node.js (v18.x o superior)
- MongoDB (local o MongoDB Atlas)

### Configuración del Back end

1. Clona este repositorio:

    ```bash
    git clone https://github.com/tu-usuario/nombre-del-repositorio.git
    ```

2. Navega al directorio del servidor:

    ```bash
    cd nombre-del-repositorio/server
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

4. Configura las variables de entorno creando un archivo `.env` en la raíz del proyecto del servidor. Asegúrate de incluir variables como `PORT`, `DB_URL`, y `TOKEN_SECRET`.

5. Inicia el servidor:

    ```bash
    npm start
    ```

### Configuración del Front end

1. Navega al directorio del cliente:

    ```bash
    cd nombre-del-repositorio/client
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Inicia la aplicación cliente:

    ```bash
    npm run dev
    ```

### Estructura del Proyecto

```bash
nombre-del-repositorio/
├── client/            # Código del cliente (Next.js)
├── server/            # Código del servidor (Express, Node.js)
├── README.md          # Este archivo
└── .gitignore         # Archivos y carpetas ignorados por Git
