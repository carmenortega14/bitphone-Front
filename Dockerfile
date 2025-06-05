FROM node:20-alpine

WORKDIR /app

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Puerto expuesto
EXPOSE 4200

# Comando para iniciar
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check"]