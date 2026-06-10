import type { FastifyInstance } from "fastify";

export async function registerHealthRoutes(app: FastifyInstance) {
  app.get("/health", async () => ({
    ok: true,
    service: "statecraft-api",
    timestamp: new Date().toISOString()
  }));
}
