# La configuracion del contenedor
# Un sistema optimizado (ubuntu, fedora, redhat, alpine, debian)
# Node

# Todo lo necesario para crear el contenedor

# Usar una imagen base de Node.js
FROM node:20-alpine3.20

# Definir un directorio de trabajo en el contenedor
WORKDIR /api

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto 8000
EXPOSE 5000

# Ejecutar el proyecto dentro del contenedor
CMD ["npm", "run", "server"]

