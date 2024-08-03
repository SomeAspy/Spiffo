FROM node:current-alpine AS base

FROM base AS dependencies
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile --prod

FROM base AS build
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile --prod
COPY . .
RUN pnpm build

FROM base
WORKDIR /app
COPY --from=dependencies /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
RUN echo '{"type":"module"}' > package.json
CMD [ "node", "./dist/main.js" ]