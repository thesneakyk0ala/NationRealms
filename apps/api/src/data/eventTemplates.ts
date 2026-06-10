import type { EventTemplateDefinition } from "@statecraft/shared";

export const EVENT_TEMPLATES: EventTemplateDefinition[] = [
  {
    key: "industrial_pollution_crisis",
    title: "Industrial Pollution Crisis",
    description: "Residents downstream from a factory district report foul water and sick livestock.",
    category: "ENVIRONMENT",
    tags: ["industry", "pollution"],
    eligibility: { minStats: { economy: 45 }, requiredLocationTypes: ["MINE"] },
    weight: 12,
    cooldownTurns: 4,
    choices: [
      { id: "strict_orders", label: "Issue strict cleanup orders", description: "Force industry to clean up immediately.", effects: { statChanges: { environment: 7, economy: -3, publicTrust: 3 }, locationDevelopmentChanges: [{ locationType: "MINE", amount: -1 }], createNationPost: { type: "GOVERNMENT_UPDATE", title: "Pollution Cleanup Ordered", body: "The government has ordered emergency cleanup and inspections after pollution reports." } }, resultSummary: "Cleanup orders restored confidence but slowed industrial output." },
      { id: "industry_plan", label: "Negotiate an industry plan", description: "Give factories time to meet new standards.", effects: { statChanges: { environment: 3, economy: 1, publicTrust: -1 } }, resultSummary: "A negotiated plan avoided disruption, though activists called it too slow." },
      { id: "dismiss_claims", label: "Dismiss the claims", description: "Protect production and question the reports.", effects: { statChanges: { economy: 4, environment: -6, publicTrust: -5 } }, resultSummary: "Factories kept running, but public anger spread through the affected towns." }
    ]
  },
  {
    key: "veterans_demand_benefits",
    title: "Veterans Demand Benefits",
    description: "Veterans groups demand pensions, clinics, and public recognition for their service.",
    category: "MILITARY",
    tags: ["veterans", "military"],
    eligibility: { minStats: { military: 45 }, requiredMilitaryUnitTypes: ["INFANTRY"] },
    weight: 10,
    choices: [
      { id: "fund_benefits", label: "Fund a benefits program", description: "Pay for pensions and clinics.", effects: { statChanges: { publicTrust: 5, stability: 3, economy: -3 }, agentLoyaltyChanges: [{ role: "GENERAL", amount: 2 }] }, resultSummary: "Veterans praised the program and military families rallied behind the cabinet." },
      { id: "symbolic_honors", label: "Offer symbolic honors", description: "Hold ceremonies without major spending.", effects: { statChanges: { publicTrust: 1, economy: 1, military: -1 } }, resultSummary: "The ceremonies were appreciated, but veterans called them incomplete." },
      { id: "reject_demands", label: "Reject special treatment", description: "Argue that all citizens need equal services.", effects: { statChanges: { economy: 2, military: -3, publicTrust: -3 } }, resultSummary: "The treasury was relieved, but veterans groups left bitter and organized." }
    ]
  },
  {
    key: "university_funding_debate",
    title: "University Funding Debate",
    description: "University rectors request a national research fund while rural councils ask for practical schools.",
    category: "TECHNOLOGY",
    tags: ["university", "science"],
    eligibility: {},
    weight: 11,
    choices: [
      { id: "research_fund", label: "Create a research fund", description: "Back universities and laboratories.", effects: { statChanges: { technology: 6, economy: -2 }, agentXpChanges: [{ role: "SCIENTIST_ADVISOR", amount: 15 }] }, resultSummary: "The research fund attracted talent and raised national ambitions." },
      { id: "technical_schools", label: "Fund technical schools", description: "Focus on practical training across towns.", effects: { statChanges: { technology: 3, economy: 2, publicTrust: 2 } }, resultSummary: "Technical schools spread useful skills beyond the capital." },
      { id: "freeze_budget", label: "Freeze the education budget", description: "Delay both proposals.", effects: { statChanges: { economy: 2, technology: -3, publicTrust: -2 } }, resultSummary: "The budget held, but educators warned the country was falling behind." }
    ]
  },
  {
    key: "port_workers_strike",
    title: "Port Workers Strike",
    description: "Dock crews halt cargo over wages and safety rules, threatening trade revenue.",
    category: "ECONOMY",
    tags: ["port", "labor"],
    eligibility: { requiredLocationTypes: ["PORT"] },
    weight: 12,
    choices: [
      { id: "labor_compact", label: "Negotiate a labor compact", description: "Improve conditions and keep workers at the table.", effects: { statChanges: { publicTrust: 5, stability: 2, economy: -2 }, locationDevelopmentChanges: [{ locationType: "PORT", amount: 1 }], followUpEventKeys: ["dockside_reform_commission"] }, resultSummary: "The compact reopened the port and improved worker confidence." },
      { id: "emergency_orders", label: "Use emergency orders", description: "Force the port open under state authority.", effects: { statChanges: { economy: 4, authority: 3, liberty: -3, publicTrust: -4 } }, resultSummary: "Cargo moved again, but the government's methods drew sharp criticism." },
      { id: "automate_port", label: "Accelerate automation", description: "Invest in machines to reduce dependence on labor.", effects: { statChanges: { technology: 4, economy: -2, stability: -2 } }, resultSummary: "Automation began, pleasing exporters and worrying port families." }
    ]
  },
  {
    key: "mine_safety_scandal",
    title: "Mine Safety Scandal",
    description: "An inspection leak reveals ignored safety warnings at a major mine.",
    category: "PUBLIC_TRUST",
    tags: ["mine", "corruption"],
    eligibility: { requiredLocationTypes: ["MINE"] },
    weight: 10,
    choices: [
      { id: "public_inquiry", label: "Launch a public inquiry", description: "Expose negligence and punish offenders.", effects: { statChanges: { publicTrust: 5, stability: 1, economy: -2 }, createNationPost: { type: "GOVERNMENT_UPDATE", title: "Mine Safety Inquiry Opened", body: "A public inquiry will investigate safety failures at a major mine." } }, resultSummary: "The inquiry reassured citizens that the scandal would not be buried." },
      { id: "quiet_fines", label: "Issue quiet fines", description: "Punish operators without a public spectacle.", effects: { statChanges: { economy: 1, publicTrust: -2, authority: 1 } }, resultSummary: "Operators paid fines, but rumors of a coverup continued." },
      { id: "worker_control", label: "Empower worker inspectors", description: "Let miners help enforce safety.", effects: { statChanges: { publicTrust: 4, liberty: 2, economy: -1 } }, resultSummary: "Worker inspectors became local heroes and management grumbled." }
    ]
  },
  {
    key: "governor_corruption",
    title: "Governor Accused of Corruption",
    description: "A governor is accused of steering contracts to allies and punishing critics.",
    category: "AGENT",
    tags: ["corruption", "agents"],
    eligibility: { requiredAgentRoles: ["GOVERNOR"] },
    weight: 9,
    choices: [
      { id: "suspend_governor", label: "Suspend the governor", description: "Remove the official while investigators work.", effects: { statChanges: { publicTrust: 4, stability: -1 }, agentLoyaltyChanges: [{ role: "GOVERNOR", amount: -6 }] }, resultSummary: "Suspension sent a clear signal, though local allies protested." },
      { id: "defend_governor", label: "Defend the governor", description: "Call the accusations political theater.", effects: { statChanges: { authority: 2, publicTrust: -4, stability: 1 }, agentLoyaltyChanges: [{ role: "GOVERNOR", amount: 4 }] }, resultSummary: "The governor stayed loyal, but national trust took a visible hit." },
      { id: "local_audit", label: "Order a local audit", description: "Audit contracts without dramatic removals.", effects: { statChanges: { publicTrust: 2, stability: 1 } }, resultSummary: "The audit bought time and cooled the immediate crisis." }
    ]
  },
  {
    key: "border_patrol_incident",
    title: "Border Patrol Incident",
    description: "A patrol reports shots fired near a contested crossing. Rumors are moving faster than facts.",
    category: "MILITARY",
    tags: ["border", "military"],
    eligibility: { minStats: { military: 45 }, requiredMilitaryUnitTypes: ["INFANTRY"] },
    weight: 9,
    choices: [
      { id: "deescalate", label: "De-escalate publicly", description: "Call for calm and verify facts.", effects: { statChanges: { stability: 2, publicTrust: 2, military: -1 } }, resultSummary: "A measured response prevented panic and kept forces disciplined." },
      { id: "reinforce", label: "Reinforce the crossing", description: "Show strength and move units to readiness.", effects: { statChanges: { military: 3, authority: 2, publicTrust: -1 }, militaryExperienceChanges: [{ unitType: "INFANTRY", amount: 5 }] }, resultSummary: "Reinforcements signaled resolve, though some citizens feared escalation." },
      { id: "hide_incident", label: "Suppress the report", description: "Keep the story quiet until the facts are settled.", effects: { statChanges: { authority: 2, publicTrust: -4, stability: -1 } }, resultSummary: "The silence fed rumors and left the public suspicious." }
    ]
  },
  {
    key: "national_day_speech",
    title: "National Day Speech",
    description: "The head of state prepares a major speech for National Day.",
    category: "ROLEPLAY_NEWS",
    tags: ["speech"],
    eligibility: { requiredAgentRoles: ["HEAD_OF_STATE"] },
    weight: 8,
    choices: [
      { id: "unity", label: "Call for unity", description: "Emphasize shared national purpose.", effects: { statChanges: { stability: 3, publicTrust: 3 }, agentXpChanges: [{ role: "HEAD_OF_STATE", amount: 10 }], createNationPost: { type: "SPEECH", title: "National Day Address Calls for Unity", body: "The head of state used the National Day address to call for patience, service, and unity." } }, resultSummary: "The speech landed well and gave the government breathing room." },
      { id: "reform", label: "Promise reform", description: "Challenge old systems and invite change.", effects: { statChanges: { liberty: 3, technology: 1, stability: -1 }, createNationPost: { type: "SPEECH", title: "National Day Address Promises Reform", body: "The address framed reform as the nation's next great project." } }, resultSummary: "Young citizens cheered the reform message while conservatives watched warily." },
      { id: "strength", label: "Project strength", description: "Celebrate discipline, service, and readiness.", effects: { statChanges: { military: 3, authority: 2, liberty: -1 }, createNationPost: { type: "SPEECH", title: "National Day Address Projects Strength", body: "The speech praised service, discipline, and national readiness." } }, resultSummary: "The address energized security-minded citizens and unsettled civil libertarians." }
    ]
  },
  {
    key: "religious_council_petition",
    title: "Religious Council Petition",
    description: "A council of spiritual leaders petitions for influence over education and holidays.",
    category: "AUTHORITY",
    tags: ["religion"],
    eligibility: {},
    weight: 7,
    choices: [
      { id: "grant_role", label: "Grant a formal advisory role", description: "Give the council limited influence.", effects: { statChanges: { stability: 4, authority: 2, liberty: -3 } }, resultSummary: "The council gained status, and secular groups began organizing." },
      { id: "protect_secular", label: "Protect secular policy", description: "Keep state institutions independent.", effects: { statChanges: { liberty: 4, stability: -1, publicTrust: -1 } }, resultSummary: "Secular policy held, but some communities felt dismissed." },
      { id: "local_choice", label: "Let towns decide", description: "Push the issue down to local councils.", effects: { statChanges: { stability: 2, liberty: 1 } }, resultSummary: "Local discretion cooled the national dispute for now." }
    ]
  },
  {
    key: "merchant_guild_tax_dispute",
    title: "Merchant Guild Tax Dispute",
    description: "Merchant guilds threaten to withhold investment unless new taxes are softened.",
    category: "ECONOMY",
    tags: ["trade"],
    eligibility: { requiredCultureTraits: ["merchant_guilds"] },
    weight: 9,
    choices: [
      { id: "hold_line", label: "Hold the tax line", description: "Tell guilds the public budget comes first.", effects: { statChanges: { publicTrust: 4, economy: -3, authority: 1 } }, resultSummary: "Citizens liked the firmness, but guild investment slowed." },
      { id: "guild_compromise", label: "Offer targeted exemptions", description: "Trade tax relief for public commitments.", effects: { statChanges: { economy: 3, publicTrust: 1 } }, resultSummary: "A compromise kept capital moving and preserved some public benefit." },
      { id: "cut_taxes", label: "Cut the tax package", description: "Keep the guilds happy.", effects: { statChanges: { economy: 5, publicTrust: -3, liberty: 1 } }, resultSummary: "Investment surged, though critics called the state captured." }
    ]
  },
  {
    key: "rural_infrastructure_collapse",
    title: "Rural Infrastructure Collapse",
    description: "A bridge failure isolates rural districts and exposes years of deferred maintenance.",
    category: "MAP_LOCATION",
    tags: ["rural", "map"],
    eligibility: { requiredLocationTypes: ["FARM"] },
    weight: 9,
    choices: [
      { id: "emergency_repairs", label: "Fund emergency repairs", description: "Move money quickly and rebuild.", effects: { statChanges: { stability: 3, economy: -3, publicTrust: 2 }, locationDevelopmentChanges: [{ locationType: "FARM", amount: 1 }] }, resultSummary: "Repairs restored access and reassured rural communities." },
      { id: "local_burden", label: "Make local councils pay", description: "Require local matching funds.", effects: { statChanges: { economy: 1, publicTrust: -3, stability: -1 } }, resultSummary: "The treasury saved money, but rural leaders felt abandoned." },
      { id: "national_program", label: "Launch a rural works program", description: "Turn the collapse into a national plan.", effects: { statChanges: { stability: 4, publicTrust: 3, economy: -4 } }, resultSummary: "The works program became a symbol of rural renewal." }
    ]
  },
  {
    key: "military_parade_controversy",
    title: "Military Parade Controversy",
    description: "Commanders request a large parade through the capital. Civil groups call it intimidation.",
    category: "LIBERTY",
    tags: ["parade", "military"],
    eligibility: { minStats: { military: 50 } },
    weight: 8,
    choices: [
      { id: "full_parade", label: "Approve the full parade", description: "Show national strength.", effects: { statChanges: { military: 3, authority: 2, liberty: -2, publicTrust: -1 }, militaryExperienceChanges: [{ amount: 2 }] }, resultSummary: "The parade impressed supporters and worried civil society." },
      { id: "service_day", label: "Turn it into a service day", description: "Pair military honors with public service.", effects: { statChanges: { publicTrust: 3, stability: 2, military: 1 } }, resultSummary: "The compromise honored soldiers without dominating the capital." },
      { id: "cancel", label: "Cancel the parade", description: "Avoid militarized spectacle.", effects: { statChanges: { liberty: 2, military: -2, publicTrust: 1 } }, resultSummary: "Civil groups welcomed the decision; commanders were displeased." }
    ]
  },
  {
    key: "scientists_request_autonomy",
    title: "Scientists Request Autonomy",
    description: "Research institutes ask for legal autonomy from political interference.",
    category: "TECHNOLOGY",
    tags: ["science"],
    eligibility: { minStats: { technology: 50 } },
    weight: 8,
    choices: [
      { id: "grant_autonomy", label: "Grant autonomy", description: "Let institutes govern research priorities.", effects: { statChanges: { technology: 6, liberty: 2, authority: -2 }, agentXpChanges: [{ role: "SCIENTIST_ADVISOR", amount: 15 }] }, resultSummary: "Research leaders celebrated the new charter." },
      { id: "state_priorities", label: "Tie funding to state priorities", description: "Keep research aligned with national plans.", effects: { statChanges: { technology: 3, authority: 2, publicTrust: -1 } }, resultSummary: "Research continued, but some scientists worried about political tests." },
      { id: "security_review", label: "Launch a security review", description: "Audit sensitive labs first.", effects: { statChanges: { authority: 2, technology: -1, military: 1 } }, resultSummary: "The review delayed reforms and pleased security officials." }
    ]
  },
  {
    key: "environmental_sanctuary_proposal",
    title: "Environmental Sanctuary Proposal",
    description: "Activists propose a protected sanctuary around a fragile ecosystem.",
    category: "ENVIRONMENT",
    tags: ["sanctuary"],
    eligibility: { maxStats: { environment: 70 } },
    weight: 8,
    choices: [
      { id: "approve_sanctuary", label: "Approve the sanctuary", description: "Protect the land and limit extraction.", effects: { statChanges: { environment: 7, economy: -2, publicTrust: 2 } }, resultSummary: "The sanctuary became a public symbol of stewardship." },
      { id: "mixed_use", label: "Create a mixed-use zone", description: "Allow limited production under strict rules.", effects: { statChanges: { environment: 3, economy: 1 } }, resultSummary: "The mixed-use plan satisfied moderates and angered purists on both sides." },
      { id: "reject", label: "Reject the proposal", description: "Keep the area open for development.", effects: { statChanges: { economy: 3, environment: -4, publicTrust: -2 } }, resultSummary: "Development interests won, and environmental groups vowed to continue." }
    ]
  },
  {
    key: "black_market_arms_rumors",
    title: "Black Market Arms Rumors",
    description: "Security officials report rumors that military supplies are leaking into criminal markets.",
    category: "SECURITY",
    tags: ["black_market", "military"],
    eligibility: { minStats: { military: 45 } },
    weight: 8,
    choices: [
      { id: "audit_armories", label: "Audit the armories", description: "Trace weapons and punish theft.", effects: { statChanges: { publicTrust: 3, military: -1, stability: 1 } }, resultSummary: "The audit found gaps and restored some confidence." },
      { id: "expand_police", label: "Expand security powers", description: "Give investigators broad authority.", effects: { statChanges: { authority: 4, liberty: -4, stability: 2 } }, resultSummary: "Security agencies moved quickly, raising civil liberty concerns." },
      { id: "deny_rumors", label: "Deny the rumors", description: "Avoid panic and protect the military's reputation.", effects: { statChanges: { military: 1, publicTrust: -4, stability: -2 } }, resultSummary: "The denial failed to stop rumors and deepened suspicion." }
    ]
  },
  {
    key: "city_housing_shortage",
    title: "City Housing Shortage",
    description: "Rents surge in a growing city, forcing workers farther from jobs.",
    category: "STABILITY",
    tags: ["housing"],
    eligibility: { requiredLocationTypes: ["CAPITAL"] },
    weight: 10,
    choices: [
      { id: "public_housing", label: "Build public housing", description: "Spend heavily to stabilize rents.", effects: { statChanges: { stability: 4, publicTrust: 4, economy: -3 }, locationDevelopmentChanges: [{ locationType: "CAPITAL", amount: 1 }] }, resultSummary: "New housing plans gave city residents hope." },
      { id: "developer_incentives", label: "Offer developer incentives", description: "Use market tools to increase supply.", effects: { statChanges: { economy: 3, stability: 1, publicTrust: -1 } }, resultSummary: "Developers responded quickly, but affordability remained disputed." },
      { id: "rent_controls", label: "Impose rent controls", description: "Protect tenants with strict limits.", effects: { statChanges: { publicTrust: 3, liberty: -1, economy: -2 } }, resultSummary: "Tenants cheered while landlords warned of shortages." }
    ]
  },
  {
    key: "farmers_demand_subsidies",
    title: "Farmers Demand Subsidies",
    description: "Farmers warn that bad weather and fuel costs threaten the harvest.",
    category: "ECONOMY",
    tags: ["farmers", "rural"],
    eligibility: { requiredLocationTypes: ["FARM"] },
    weight: 10,
    choices: [
      { id: "subsidies", label: "Approve subsidies", description: "Protect farmers and food supply.", effects: { statChanges: { stability: 4, publicTrust: 2, economy: -2 }, locationDevelopmentChanges: [{ locationType: "FARM", amount: 1 }] }, resultSummary: "Subsidies steadied farm communities before planting season." },
      { id: "loans", label: "Offer low-interest loans", description: "Help farmers without direct grants.", effects: { statChanges: { stability: 2, economy: -1 } }, resultSummary: "Loans helped some farms but left the smallest producers exposed." },
      { id: "market_prices", label: "Let markets adjust", description: "Avoid intervention.", effects: { statChanges: { economy: 2, stability: -3, publicTrust: -2 } }, resultSummary: "The state saved money while rural frustration rose." }
    ]
  },
  {
    key: "intelligence_service_expansion",
    title: "Intelligence Service Expansion",
    description: "Security officials request new surveillance authority to track extremist networks.",
    category: "AUTHORITY",
    tags: ["intelligence"],
    eligibility: { maxStats: { authority: 75 } },
    weight: 8,
    choices: [
      { id: "approve_powers", label: "Approve new powers", description: "Expand surveillance and analysis.", effects: { statChanges: { authority: 5, stability: 2, liberty: -5 } }, resultSummary: "The intelligence service gained reach, and watchdogs sounded alarms." },
      { id: "court_warrants", label: "Require court warrants", description: "Permit expansion with oversight.", effects: { statChanges: { stability: 2, authority: 1, liberty: -1, publicTrust: 2 } }, resultSummary: "Oversight made the expansion easier for the public to accept." },
      { id: "reject_expansion", label: "Reject expansion", description: "Protect civil liberties.", effects: { statChanges: { liberty: 4, authority: -2, stability: -1 } }, resultSummary: "Civil libertarians celebrated while security officials warned of gaps." }
    ]
  },
  {
    key: "youth_reform_movement",
    title: "Youth Reform Movement",
    description: "Student organizers demand electoral reform, open data, and a louder public voice.",
    category: "LIBERTY",
    tags: ["youth"],
    eligibility: { minStats: { liberty: 45 } },
    weight: 9,
    choices: [
      { id: "invite_youth", label: "Invite youth delegates", description: "Bring organizers into reform talks.", effects: { statChanges: { liberty: 4, publicTrust: 4, stability: -1 } }, resultSummary: "Youth delegates entered the halls of power and claimed a first victory." },
      { id: "slow_committee", label: "Create a slow committee", description: "Study the demands without immediate change.", effects: { statChanges: { stability: 1, publicTrust: -2 } }, resultSummary: "The committee bought time and disappointed the movement." },
      { id: "crack_down", label: "Crack down on protests", description: "Clear occupations and restore order.", effects: { statChanges: { authority: 4, stability: -2, liberty: -5, publicTrust: -4 } }, resultSummary: "The streets quieted, but anger moved underground." }
    ]
  },
  {
    key: "ancient_nobility_privileges",
    title: "Ancient Nobility Claims Privileges",
    description: "Old noble houses claim historic rights over land appointments and ceremonial offices.",
    category: "CULTURE",
    tags: ["nobility"],
    eligibility: { requiredCultureTraits: ["ancient_nobility"] },
    weight: 8,
    choices: [
      { id: "recognize_titles", label: "Recognize limited titles", description: "Honor heritage without restoring hard power.", effects: { statChanges: { stability: 3, authority: 1, liberty: -1 } }, resultSummary: "The compromise pleased traditionalists and kept formal power limited." },
      { id: "abolish_claims", label: "Abolish the claims", description: "Declare old privileges void.", effects: { statChanges: { liberty: 4, stability: -3, publicTrust: 1 } }, resultSummary: "Reformers cheered while noble families prepared a legal fight." },
      { id: "restore_privileges", label: "Restore privileges", description: "Lean into hierarchy and continuity.", effects: { statChanges: { authority: 5, stability: 2, liberty: -5, publicTrust: -2 } }, resultSummary: "Old houses returned to prominence, dividing the nation sharply." }
    ]
  },
  {
    key: "dockside_reform_commission",
    title: "Dockside Reform Commission",
    description: "After the labor compact, a joint commission of unions and shippers proposes lasting port reforms.",
    category: "ECONOMY",
    tags: ["port", "labor"],
    eligibility: { requiredLocationTypes: ["PORT"] },
    weight: 6,
    choices: [
      { id: "adopt_reforms", label: "Adopt the reforms", description: "Codify safety rules and wage boards.", effects: { statChanges: { stability: 3, publicTrust: 3, economy: -1 }, createNationPost: { type: "GOVERNMENT_UPDATE", title: "Port Reforms Adopted", body: "The dockside commission's reforms became law, locking in the labor compact's gains." } }, resultSummary: "The reforms made the compact permanent and steadied the waterfront." },
      { id: "shelve_report", label: "Shelve the report", description: "Thank the commission and move on.", effects: { statChanges: { economy: 1, publicTrust: -2 } }, resultSummary: "The report gathered dust and dock crews took note." }
    ]
  }
];
