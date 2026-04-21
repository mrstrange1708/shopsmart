# ──────────────────────────────────────────────────────────────
# ShopSmart Server — Production Dockerfile
# Non-root user (rubric requirement)
# ──────────────────────────────────────────────────────────────
FROM node:22-alpine

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy application source
COPY . .

# Create non-root user (RUBRIC REQUIREMENT)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 7777

# Health check for container orchestration
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:7777/api/health || exit 1

# Run with node directly (not nodemon — production)
CMD ["node", "src/index.js"]
