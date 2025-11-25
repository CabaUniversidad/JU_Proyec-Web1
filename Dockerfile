# ========= BASE =========
FROM node:18-alpine AS base
WORKDIR /app

# ========= DEPENDENCIAS =========
FROM base AS deps
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install --legacy-peer-deps

# ========= BUILD =========
FROM base AS build
COPY . .
RUN npm run build

# ========= RUN =========
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
RUN npm install --omit=dev --legacy-peer-deps

CMD ["npm", "start"]
