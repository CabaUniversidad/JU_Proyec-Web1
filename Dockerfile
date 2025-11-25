# ===== BASE =====
FROM node:18-alpine AS base
WORKDIR /app

# ===== DEPENDENCIAS =====
FROM base AS deps
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install

# ===== BUILD =====
FROM base AS build
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# ===== RUN =====
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copiar solo lo necesario para producción
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 3000
CMD
