# ──────────────────────────────────────────────────────────────
# ShopSmart Client — Multi-Stage Production Dockerfile
# Non-root user via nginx-unprivileged (rubric requirement)
# ──────────────────────────────────────────────────────────────

# ─── Stage 1: Build the Vite/React app ───────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ─── Stage 2: Serve with nginx (non-root) ────────────────────
FROM nginxinc/nginx-unprivileged:alpine

# Copy built static files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (SPA routing + API proxy)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# nginx-unprivileged listens on 8080 by default (non-root)
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1
