# 1) build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# 2) runtime
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
# Copy only necessary files for production
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force
EXPOSE 3000
CMD ["npm","start"]