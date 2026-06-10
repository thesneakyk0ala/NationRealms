import cors from "@fastify/cors";
import Fastify from "fastify";
import { Server as SocketIOServer } from "socket.io";
import { ZodError } from "zod";
import { registerAgentRoutes } from "./routes/agents.js";
import { registerDemoRoutes } from "./routes/demo.js";
import { registerEventRoutes } from "./routes/events.js";
import { registerHealthRoutes } from "./routes/health.js";
import { registerMapRoutes } from "./routes/map.js";
import { registerMilitaryRoutes } from "./routes/military.js";
import { registerNationCreationRoutes } from "./routes/nationCreation.js";
import { registerNationRoutes } from "./routes/nations.js";
import { registerPostRoutes } from "./routes/posts.js";
import { setRealtimeServer } from "./realtime.js";

export async function buildApp() {
  const app = Fastify({
    logger: true
  });

  const configuredOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
    : [];

  await app.register(cors, {
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      const isLocalDevOrigin = /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
      callback(null, configuredOrigins.includes(origin) || isLocalDevOrigin);
    }
  });

  const io = new SocketIOServer(app.server, {
    cors: {
      origin: process.env.CORS_ORIGIN ?? "*"
    }
  });

  setRealtimeServer(io);

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      reply.code(400).send({
        message: "Invalid request payload",
        issues: error.issues
      });
      return;
    }

    if (error.message.includes("Can't reach database server")) {
      reply.code(503).send({
        message:
          "Database is unavailable. Start PostgreSQL, confirm DATABASE_URL, then run npm run db:push and npm run prisma:seed."
      });
      return;
    }

    request.log.error(error);
    reply.code(500).send({
      message: "Internal server error"
    });
  });

  io.on("connection", (socket) => {
    socket.emit("connected", {
      service: "statecraft-api",
      connectedAt: new Date().toISOString()
    });
  });

  await registerHealthRoutes(app);
  await registerDemoRoutes(app);
  await registerNationCreationRoutes(app);
  await registerNationRoutes(app);
  await registerPostRoutes(app);
  await registerEventRoutes(app);
  await registerMapRoutes(app);
  await registerAgentRoutes(app);
  await registerMilitaryRoutes(app);

  return app;
}
