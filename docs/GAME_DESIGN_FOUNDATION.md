# Game Design Foundation

## High-Level Vision

Statecraft Online is a 2D multiplayer nation simulation where each player leads a fictional nation with a public identity, domestic pressures, map presence, character agents, and roleplay-facing news. The game should feel like a living strategic world rather than a forum wrapped around a nation profile.

Foundation Step 1 creates the playable shell: a seeded demo nation, early statistics, posts, events, map locations, agents, and military units. It is intentionally small, but every object points toward future simulation systems.

## Core Gameplay Pillars

### Nation Identity

Players define the personality of their nation through name, motto, government style, economy style, culture, capital, and public updates. The nation profile is the player's strategic and roleplay anchor.

### Simulation Events

Events pressure the nation with choices that affect statistics. Early choices are simple, but the long-term design should connect events to map state, agents, resources, public trust, internal stability, and military posture.

### 2D Strategic Map Presence

The map represents the nation as a set of cities, towns, bases, ports, mines, farms, and resource sites. Future systems can add territory, terrain, movement, fog of war, contested spaces, and logistics.

### Character Agents

Agents are named characters who govern, command, guard, speak, improve locations, gain XP, level up, and develop traits. They turn abstract state management into a cast of people with consequences.

### Military Positioning

Military units exist on the map and can later support deterrence, conflict, defense, logistics, and roleplay events. Foundation Step 1 only models unit identity and movement between known locations.

### Public Roleplay Feed

Posts, speeches, government updates, images, and videos eventually become the public voice of the nation. Foundation Step 1 supports text posts and placeholder media fields.

## Excluded From Foundation Step 1

- Real login and authentication.
- Payments or monetization.
- Full combat simulation.
- Complex diplomacy.
- Upload storage for images and videos.
- AI-generated events.
- Advanced map rendering.
- Fog of war.
- Pathfinding.
- Nation-to-nation war resolution.
- Forums.
- Region mechanics.
- Life-sim mechanics for the player avatar.

## NationStates Inspiration Versus Statecraft Direction

NationStates-style games often center the loop on issue choices, nation descriptions, regions, and forum-like social play. Statecraft Online keeps the strength of event choices but makes them one part of a wider strategy simulation.

In this project, an event choice should eventually touch concrete systems: a port, a mine, a governor, a brigade, a city, or a public trust crisis. The long-term goal is for choices to change the visible map and the characters living inside the nation, not only adjust abstract stats.

## Nation Creation Philosophy

Foundation Step 2 makes founding a nation feel like a strategic and roleplay act, not a generic database form. The player chooses identity, government, economy, origin, ideology, culture traits, flag colors, an emblem, and a starting package. These choices immediately produce stats, a capital, starter locations, agents, units, and a founding post.

Identity choices matter because they become public profile material and future hooks for events, agent behavior, map pressures, and roleplay posts. A revolutionary republic with labor solidarity should invite different events and political tensions than an old kingdom with ancient nobility.

The creation flow feeds future systems in four ways:

- Events can read ideology, government, economy, and culture traits.
- Map systems inherit starting locations and resource sites.
- Agents begin with roles tied to the founding package.
- Roleplay begins with a founding post and presentable public profile.

## Event Engine Philosophy

Foundation Step 3 turns events into authored national issues that react to the nation already on the board. Templates can check government, economy, founding origin, culture traits, stats, ideology sliders, map locations, agents, military units, and recent event history before becoming eligible.

These events are not AI-generated. They are hand-authored dilemmas with structured choices and mechanical consequences. That keeps gameplay understandable and testable while still letting nations feel different. A port strike matters more to a maritime trader; noble privilege claims only appear for nations with ancient nobility; military controversies depend on military strength and units.

The future AI layer should assist with flavor, variations, or summaries, but authoritative state changes should continue to flow through structured event templates, eligibility rules, and effect handlers.
