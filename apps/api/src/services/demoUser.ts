import { prisma } from "../prisma.js";

export async function getOrCreateDemoUser() {
  return prisma.user.upsert({
    where: {
      email: "demo@statecraft.online"
    },
    create: {
      email: "demo@statecraft.online",
      displayName: "Demo Strategist"
    },
    update: {}
  });
}
