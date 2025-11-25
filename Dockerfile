# ========= BASE =========
FROM node:18-alpine AS base
WORKDIR /app

# ========= DEPENDENCIAS =========
FROM base AS deps
COPY package.json package-lock.json* pnpm-lock.yaml* ./
# La instalación de dependencias se hace aquí
RUN npm install --legacy-peer-deps

# ========= BUILD =========
# Usamos 'base' para empezar con una copia limpia de la app
FROM base AS build
# 🚨 PASO CLAVE: Copiar los node_modules desde el stage 'deps'
COPY --from=deps /app/node_modules ./node_modules
# Copiar el código fuente completo
COPY . .
# Ahora 'next' estará disponible en ./node_modules/.bin/next,
# y 'npm run build' lo encontrará
RUN npm run build

# ========= RUN =========
FROM node:18-alpine AS runner
# ... (el resto de tu runner stage es correcto)
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
RUN npm install --omit=dev --legacy-peer-deps # Esto garantiza que solo las dependencias de producción estén en el stage final.

CMD ["npm", "start"]