# Usar la imagen oficial de Node.js como base
FROM node:20-alpine

# Instalar herramientas de compilación necesarias para Alpine
RUN apk add --no-cache python3 make g++

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias con --legacy-peer-deps para evitar problemas de compatibilidad
RUN npm install --legacy-peer-deps

# Copiar el código fuente
COPY . .

# Compilar la aplicación
RUN npm run build

# Limpiar las herramientas de compilación para reducir el tamaño de la imagen
RUN apk del python3 make g++

# Exponer el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"] 