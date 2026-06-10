import type { AgentSkill, AgentTrait, EventChoice } from "@statecraft/shared";

type AnyRecord = Record<string, any>;

function iso(value: unknown) {
  return value instanceof Date ? value.toISOString() : value;
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function withIsoDates<TRecord extends AnyRecord>(record: TRecord) {
  return {
    ...record,
    createdAt: iso(record.createdAt),
    updatedAt: iso(record.updatedAt),
    resolvedAt: iso(record.resolvedAt)
  };
}

export function serializeNation(nation: AnyRecord) {
  const { cultureTraitsJson, ideologyJson, ...rest } = nation;

  return {
    ...withIsoDates(rest),
    cultureTraits: Array.isArray(cultureTraitsJson) ? cultureTraitsJson : rest.cultureTraits,
    ideology: ideologyJson && typeof ideologyJson === "object" ? ideologyJson : rest.ideology
  };
}

export function serializeStats(stats: AnyRecord) {
  return { ...stats };
}

export function serializePost(post: AnyRecord) {
  return withIsoDates(post);
}

export function serializeLocation(location: AnyRecord) {
  return withIsoDates(location);
}

export function serializeEventTemplate(template: AnyRecord) {
  const { choicesJson, effectsJson, tagsJson, eligibilityJson, followUpEventKeysJson, ...rest } = template;

  return {
    ...withIsoDates(rest),
    tags: asArray(tagsJson),
    eligibility: asObject(eligibilityJson),
    choices: asArray<EventChoice>(choicesJson),
    effects: asObject(effectsJson),
    followUpEventKeys: asArray(followUpEventKeysJson)
  };
}

export function serializeActiveEvent(event: AnyRecord) {
  const { eventTemplate, ...rest } = event;

  return {
    ...withIsoDates(rest),
    eventTemplate: eventTemplate ? serializeEventTemplate(eventTemplate) : undefined
  };
}

export function serializeAgent(agent: AnyRecord) {
  const { traitsJson, skillsJson, ...rest } = agent;

  return {
    ...withIsoDates(rest),
    traits: asArray<AgentTrait>(traitsJson),
    skills: asArray<AgentSkill>(skillsJson)
  };
}

export function serializeMilitaryUnit(unit: AnyRecord) {
  const { location, commanderAgent, ...rest } = unit;

  return {
    ...withIsoDates(rest),
    location: location ? serializeLocation(location) : null,
    commanderAgent: commanderAgent ? serializeAgent(commanderAgent) : null
  };
}
