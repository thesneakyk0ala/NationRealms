import {
  AgentAssignment,
  AgentRole,
  EconomyType,
  EventCategory,
  GovernmentType,
  MapLocationType,
  MilitaryUnitType,
  NationPostType,
  PostVisibility,
  PrismaClient,
  ResourceType
} from "@prisma/client";
import { EVENT_TEMPLATES } from "../apps/api/src/data/eventTemplates.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.militaryUnit.deleteMany();
  await prisma.characterAgent.deleteMany();
  await prisma.mapLocation.deleteMany();
  await prisma.resolvedEvent.deleteMany();
  await prisma.activeEvent.deleteMany();
  await prisma.eventTemplate.deleteMany();
  await prisma.nationPost.deleteMany();
  await prisma.nationStats.deleteMany();
  await prisma.nation.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "demo@statecraft.online",
      displayName: "Demo Strategist"
    }
  });

  const nation = await prisma.nation.create({
    data: {
      userId: user.id,
      name: "Aurelian Commonwealth",
      motto: "Many voices, one horizon",
      governmentType: GovernmentType.REPUBLIC,
      economyType: EconomyType.MIXED,
      foundingOrigin: "REVOLUTIONARY_REPUBLIC",
      cultureSummary:
        "A civic-minded coastal commonwealth balancing public institutions, private industry, and a strong tradition of local councils.",
      description:
        "The Aurelian Commonwealth is a coastal republic balancing public institutions, private industry, and civic localism.",
      capitalName: "Solmere",
      flagUrl: null,
      primaryColor: "#2f6f73",
      secondaryColor: "#f0c96d",
      accentColor: "#f3efe3",
      emblemSymbol: "Star",
      cultureTraitsJson: [
        { id: "merchant_guilds", label: "Merchant Guilds" },
        { id: "cosmopolitan_cities", label: "Cosmopolitan Cities" }
      ],
      ideologyJson: {
        authorityLiberty: 42,
        collectivismIndividualism: 55,
        militarismPacifism: 45,
        traditionProgress: 60,
        ecologyIndustry: 52
      },
      currentTurn: 3
    }
  });

  await prisma.nationStats.create({
    data: {
      nationId: nation.id,
      economy: 58,
      stability: 62,
      liberty: 70,
      authority: 45,
      military: 51,
      technology: 55,
      environment: 49,
      publicTrust: 64
    }
  });

  await prisma.nationPost.createMany({
    data: [
      {
        nationId: nation.id,
        type: NationPostType.GOVERNMENT_UPDATE,
        title: "Cabinet Opens Coastal Resilience Review",
        body:
          "The Commonwealth Council announced a review of port defenses, harbor jobs, and flood planning after a season of rough storms.",
        visibility: PostVisibility.PUBLIC
      },
      {
        nationId: nation.id,
        type: NationPostType.SPEECH,
        title: "Chancellor Vale Addresses the Assembly",
        body:
          "Chancellor Mara Vale called for patient reform, disciplined defense spending, and a renewed commitment to public works.",
        visibility: PostVisibility.PUBLIC
      },
      {
        nationId: nation.id,
        type: NationPostType.NEWS,
        title: "Iron Output Rises Near Greyspan Mine",
        body:
          "Mine officials report a modest increase in output after new safety equipment and rail scheduling improvements came online.",
        visibility: PostVisibility.PUBLIC
      }
    ]
  });

  const eventTemplates = await Promise.all(
    EVENT_TEMPLATES.map((template) =>
      prisma.eventTemplate.create({
        data: {
          key: template.key,
          title: template.title,
          description: template.description,
          category: template.category as EventCategory,
          tagsJson: template.tags,
          eligibilityJson: template.eligibility,
          choicesJson: template.choices,
          effectsJson: {},
          weight: template.weight,
          cooldownTurns: template.cooldownTurns ?? null,
          followUpEventKeysJson: template.followUpEventKeys ?? []
        }
      })
    )
  );

  await prisma.activeEvent.create({
    data: {
      nationId: nation.id,
      eventTemplateId: eventTemplates.find((template) => template.key === "port_workers_strike")?.id ?? eventTemplates[0].id,
      generatedTurn: 3,
      expiresTurn: 6
    }
  });

  await prisma.resolvedEvent.create({
    data: {
      nationId: nation.id,
      eventTemplateId: eventTemplates.find((template) => template.key === "national_day_speech")?.id ?? eventTemplates[0].id,
      title: "National Day Speech",
      selectedChoiceId: "unity",
      selectedChoiceLabel: "Call for unity",
      resultSummary: "The speech landed well and gave the government breathing room.",
      effectsJson: { statChanges: { stability: 3, publicTrust: 3 } },
      turn: 2
    }
  });

  const capital = await prisma.mapLocation.create({
    data: {
      nationId: nation.id,
      name: "Solmere",
      type: MapLocationType.CAPITAL,
      x: 5,
      y: 4,
      population: 820000,
      developmentLevel: 5
    }
  });

  const port = await prisma.mapLocation.create({
    data: {
      nationId: nation.id,
      name: "Brightwater Port",
      type: MapLocationType.PORT,
      x: 8,
      y: 6,
      resourceType: ResourceType.FISH,
      population: 190000,
      developmentLevel: 4
    }
  });

  const base = await prisma.mapLocation.create({
    data: {
      nationId: nation.id,
      name: "Fort Ravel",
      type: MapLocationType.MILITARY_BASE,
      x: 3,
      y: 7,
      developmentLevel: 3
    }
  });

  const mine = await prisma.mapLocation.create({
    data: {
      nationId: nation.id,
      name: "Greyspan Mine",
      type: MapLocationType.MINE,
      x: 2,
      y: 2,
      resourceType: ResourceType.IRON,
      population: 24000,
      developmentLevel: 2
    }
  });

  const farm = await prisma.mapLocation.create({
    data: {
      nationId: nation.id,
      name: "Sunfield Cooperative",
      type: MapLocationType.FARM,
      x: 6,
      y: 8,
      resourceType: ResourceType.FOOD,
      population: 38000,
      developmentLevel: 3
    }
  });

  const town = await prisma.mapLocation.create({
    data: {
      nationId: nation.id,
      name: "Larkspur",
      type: MapLocationType.TOWN,
      x: 7,
      y: 2,
      population: 76000,
      developmentLevel: 2
    }
  });

  const headOfState = await prisma.characterAgent.create({
    data: {
      nationId: nation.id,
      name: "Mara Vale",
      role: AgentRole.HEAD_OF_STATE,
      level: 3,
      xp: 240,
      loyalty: 88,
      health: 96,
      traitsJson: [
        {
          name: "Consensus Builder",
          description: "Skilled at turning rival factions toward a shared compromise.",
          modifier: "+publicTrust from speeches"
        }
      ],
      skillsJson: [
        { name: "Oratory", level: 3, xp: 180 },
        { name: "Civic Reform", level: 2, xp: 90 }
      ],
      assignment: AgentAssignment.SPEAKING,
      assignedLocationId: capital.id
    }
  });

  const general = await prisma.characterAgent.create({
    data: {
      nationId: nation.id,
      name: "General Ivo Saren",
      role: AgentRole.GENERAL,
      level: 2,
      xp: 160,
      loyalty: 74,
      health: 91,
      traitsJson: [
        {
          name: "Cautious Planner",
          description: "Prefers prepared positions and reliable supply lines.",
          modifier: "+defense readiness"
        }
      ],
      skillsJson: [
        { name: "Command", level: 2, xp: 130 },
        { name: "Logistics", level: 2, xp: 115 }
      ],
      assignment: AgentAssignment.COMMANDING,
      assignedLocationId: base.id
    }
  });

  const governor = await prisma.characterAgent.create({
    data: {
      nationId: nation.id,
      name: "Governor Lin Adaro",
      role: AgentRole.GOVERNOR,
      level: 2,
      xp: 120,
      loyalty: 81,
      health: 98,
      traitsJson: [
        {
          name: "Practical Administrator",
          description: "Good at squeezing progress out of limited budgets.",
          modifier: "+development actions"
        }
      ],
      skillsJson: [
        { name: "Governance", level: 2, xp: 100 },
        { name: "Infrastructure", level: 1, xp: 55 }
      ],
      assignment: AgentAssignment.GOVERNING,
      assignedLocationId: town.id
    }
  });

  await prisma.militaryUnit.createMany({
    data: [
      {
        nationId: nation.id,
        name: "1st Solmere Infantry Brigade",
        type: MilitaryUnitType.INFANTRY,
        strength: 68,
        movement: 3,
        experience: 20,
        locationId: base.id,
        commanderAgentId: general.id
      },
      {
        nationId: nation.id,
        name: "Ravel Armored Battalion",
        type: MilitaryUnitType.ARMOR,
        strength: 74,
        movement: 4,
        experience: 25,
        locationId: base.id,
        commanderAgentId: general.id
      },
      {
        nationId: nation.id,
        name: "Brightwater Coastal Patrol",
        type: MilitaryUnitType.NAVAL,
        strength: 52,
        movement: 5,
        experience: 15,
        locationId: port.id,
        commanderAgentId: headOfState.id
      }
    ]
  });

  console.log(`Seeded demo nation: ${nation.name}`);
  console.log(`Demo user: ${user.email}`);
  console.log(`Map locations: ${[capital, port, base, mine, farm, town].map((location) => location.name).join(", ")}`);
  console.log(`Agents: ${[headOfState, general, governor].map((agent) => agent.name).join(", ")}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
