FROM node:20-alpine

RUN apk add iproute2 iputils iptables

# Usar el usuario/grupo existente 'node' (UID/GID 1000)
WORKDIR /app

# Copiar archivos como root temporalmente
COPY package*.json ./

# Instalar dependencias y cambiar owner
RUN npm install && chown -R node:node .

# Cambiar a usuario no-root
# USER node

COPY . .

EXPOSE 3000

RUN chmod +x /app/client.sh

CMD ["sh", "-c", "/app/client.sh"]