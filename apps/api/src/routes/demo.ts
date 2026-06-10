import type { FastifyInstance } from "fastify";
import { prisma } from "../prisma.js";
import { getFallbackDemoState, isDatabaseUnavailable } from "../services/fallbackDemo.js";
import {
  serializeActiveEvent,
  serializeAgent,
  serializeLocation,
  serializeMilitaryUnit,
  serializeNation,
  serializePost,
  serializeStats
} from "../services/serializers.js";

export async function registerDemoRoutes(app: FastifyInstance) {
  app.get("/api/demo-state", async (request, reply) => {
    try {
      const nation = await prisma.nation.findFirst({
        where: {
          name: "Aurelian Commonwealth"
        },
        include: {
          stats: true,
          posts: {
            orderBy: {
              createdAt: "desc"
            }
          },
          activeEvents: {
            orderBy: {
              createdAt: "desc"
            },
            include: {
              eventTemplate: true
            }
          },
          mapLocations: {
            orderBy: [{ y: "asc" }, { x: "asc" }]
          },
          agents: {
            orderBy: {
              name: "asc"
            }
          },
          militaryUnits: {
            include: {
              location: true,
              commanderAgent: true
            },
            orderBy: {
              name: "asc"
            }
          }
        }
      });

      if (!nation) {
        return reply.code(404).send({
          message: "Demo nation not found. Run npm run prisma:seed after migrating the database."
        });
      }

      return {
        nation: serializeNation(nation),
        stats: nation.stats ? serializeStats(nation.stats) : null,
        posts: nation.posts.map(serializePost),
        activeEvents: nation.activeEvents.map(serializeActiveEvent),
        mapLocations: nation.mapLocations.map(serializeLocation),
        agents: nation.agents.map(serializeAgent),
        militaryUnits: nation.militaryUnits.map(serializeMilitaryUnit)
      };
    } catch (error) {
      if (isDatabaseUnavailable(error)) {
        request.log.warn("Database unavailable; serving in-memory fallback demo state.");
        return getFallbackDemoState();
      }

      throw error;
    }
  });
}
