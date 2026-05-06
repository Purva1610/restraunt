# Stage 1: Build
FROM alpine:3.19 AS builder
RUN apk add --no-cache nodejs npm

WORKDIR /app
COPY package*.json ./
# Install only production dependencies
RUN npm ci --only=production

COPY . .

# Stage 2: Runtime
FROM alpine:3.19
RUN apk add --no-cache nodejs \
    # Create the 'node' user and group manually
    && addgroup -S node && adduser -S node -G node

WORKDIR /app
# Copy from builder and ensure files are owned by the new 'node' user
COPY --from=builder --chown=node:node /app .

# Switch to the non-root user
USER node

EXPOSE 3000
CMD ["node", "src/index.js"]
