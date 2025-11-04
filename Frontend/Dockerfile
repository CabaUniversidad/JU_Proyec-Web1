# -------------------- STAGE 1: BASE --------------------
# Usamos una imagen base ligera de Node.js
FROM node:20-alpine AS base

# -------------------- STAGE 2: DEPENDENCIES (Instalar) --------------------
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# -------------------- STAGE 3: BUILDER (Compilar) --------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# CRÍTICO: Next.js produce un build optimizado en el directorio .next
RUN yarn build 
# Si usas NPM: RUN npm run build

# Opcional pero recomendado para optimizar el tamaño de la imagen:
# Configura el modo Standalone en tu next.config.js para que Next.js
# automáticamente genere un servidor mínimo para producción.
# Si usas standalone:
# RUN yarn build

# -------------------- STAGE 4: RUNNER (Producción Final) --------------------
FROM base AS runner
WORKDIR /app

# Esto asegura que el proceso se ejecute como un usuario no-root por seguridad.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

ENV NODE_ENV production
ENV PORT 3000 # Puerto por defecto de Next.js

# Copiar archivos esenciales desde la etapa de construcción (builder)
COPY --from=builder /app/public ./public

# Si NO usas standalone, copia la carpeta .next completa
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static 

# Si usas Standalone (recomendado), usa este comando en su lugar:
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./ 
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static 

# CRÍTICO: El puerto al que se conecta tu docker-compose.yml
EXPOSE 3000

# Comando para iniciar el servidor de producción de Next.js
CMD ["node", "server.js"] 
# Si usas standalone, el comando puede ser diferente, revisa la documentación.
# CMD ["node", "server.js"]