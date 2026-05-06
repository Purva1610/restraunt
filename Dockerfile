# Stage 1: Build
FROM alpine:3.19 AS builder
RUN apk add --no-cache nodejs npm

WORKDIR /app
COPY package*.json ./
# Install only production dependencies to keep things light
RUN npm ci --only=production

COPY . .

# Stage 2: Runtime
FROM alpine:3.19
# Only install the nodejs runtime, not npm
RUN apk add --no-cache nodejs

WORKDIR /app
# Copy only the necessary files from the builder
COPY --from=builder /app .

# Run as a non-privileged user for security
USER node

EXPOSE 3000
CMD ["node", "src/index.js"]
