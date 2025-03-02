FROM node:20-alpine

# Crear usuario con mismo UID/GID que tu host
ARG USER_ID=1001
ARG GROUP_ID=1001

# RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN addgroup -g ${GROUP_ID} appgroup && \
    adduser -u ${USER_ID} -G appgroup -D appuser

WORKDIR /app

# Configurar cache de npm en directorio con permisos
RUN chown -R appuser:appgroup /app && \
    npm config set cache /tmp/.npm --global

USER appuser

# Copiar solo lo necesario
COPY --chown=appuser:appgroup package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto
COPY --chown=appuser:appgroup . .

EXPOSE 3000