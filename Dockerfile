# Stage 1: Build
FROM alpine:3.19 AS builder
RUN apk add --no-cache nodejs npm

WORKDIR /app
COPY package*.json ./

# Option A: Standard install (if you have build steps like 'npm run build')
RUN npm install 

COPY . .

# Stage 2: Runtime
FROM alpine:3.19
RUN apk add --no-cache nodejs \
    && addgroup -S node && adduser -S node -G node

WORKDIR /app

# Copy everything from builder
COPY --from=builder --chown=node:node /app .

# If you have many devDependencies, you can run a prune here 
# to keep the final image small
USER root
RUN apk add --no-cache npm && npm prune --production && apk del npm

USER node
EXPOSE 3000
# Ensure this path matches your main file (index.js or src/index.js)
CMD ["node", "index.js"] 
