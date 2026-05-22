import type { MultiSelectQ, FillBlankQ } from "./types";

// =============================================================================
// MULTI-SELECT questions per lecture
// =============================================================================

export const multi_week1: MultiSelectQ[] = [
  {
    id: "w1-m-01", kind: "multi",
    q: "Select ALL three project constraints in the basic project anatomy.",
    options: ["Time", "Cost", "Quality", "Resources", "Risk", "Scope"],
    correct: [0, 1, 2],
    explain: "The three constraints in the project anatomy are Time, Cost, and Quality.",
    topic: "Constraints",
  },
  {
    id: "w1-m-02", kind: "multi",
    q: "Select ALL four distinguishing characteristics of software projects (I-C-C-F).",
    options: ["Invisibility", "Complexity", "Conformity", "Cost", "Flexibility", "Continuity"],
    correct: [0, 1, 2, 4],
    explain: "I-C-C-F: Invisibility, Complexity, Conformity, Flexibility.",
    topic: "Software differences",
  },
  {
    id: "w1-m-03", kind: "multi",
    q: "Select ALL letters of the SMART criteria for objectives.",
    options: ["Specific", "Measurable", "Achievable", "Repeatable", "Relevant", "Time-constrained"],
    correct: [0, 1, 2, 4, 5],
    explain: "SMART = Specific, Measurable, Achievable, Relevant, Time-constrained. 'Repeatable' is not part.",
    topic: "SMART",
  },
  {
    id: "w1-m-04", kind: "multi",
    q: "Select ALL of the five core PM activities introduced on slide 8.",
    options: ["Planning", "Scheduling", "Marketing", "Resource allocation", "Risk management", "Monitoring & control"],
    correct: [0, 1, 3, 4, 5],
    explain: "Five core PM activities: Planning, Scheduling, Resource allocation, Risk management, Monitoring & control.",
    topic: "PM activities",
  },
  {
    id: "w1-m-05", kind: "multi",
    q: "Which of the following are part of the PROJECT TEAM (not 'other stakeholders')?",
    options: ["Sponsor", "Project Manager", "Operation Managers", "Team Members", "Government", "Customers"],
    correct: [0, 1, 3],
    explain: "Project team: Sponsor, Project Manager, Team Members. The rest are 'other stakeholders'.",
    topic: "Stakeholders",
  },
  {
    id: "w1-m-06", kind: "multi",
    q: "Select all FIVE key points concluding Lecture 1.",
    options: [
      "Projects are non-routine and thus uncertain",
      "Projects have particular problems like lack of visibility",
      "Clear, objectively-assessable objectives are essential",
      "Plans are fixed and never change",
      "Stuff happens — you can't keep precisely to plan, so control is needed",
      "Communicate, communicate, communicate",
    ],
    correct: [0, 1, 2, 4, 5],
    explain: "The five key points exclude 'plans are fixed'. Plans must change; control is needed.",
    topic: "Key points",
  },
];

export const multi_week2_1: MultiSelectQ[] = [
  {
    id: "w2a-m-01", kind: "multi",
    q: "Select ALL four Agile Manifesto values (the left-hand items).",
    options: [
      "Individuals & interactions",
      "Working software",
      "Detailed contracts",
      "Customer collaboration",
      "Following a plan",
      "Responding to change",
    ],
    correct: [0, 1, 3, 5],
    explain: "The four left-hand values: individuals & interactions, working software, customer collaboration, responding to change.",
    topic: "Agile values",
  },
  {
    id: "w2a-m-02", kind: "multi",
    q: "Select ALL FIVE Scrum values (C-C-R-F-O).",
    options: ["Courage", "Clarity", "Commitment", "Respect", "Focus", "Openness"],
    correct: [0, 2, 3, 4, 5],
    explain: "Courage, Commitment, Respect, Focus, Openness. 'Clarity' is not a Scrum value.",
    topic: "Scrum values",
  },
  {
    id: "w2a-m-03", kind: "multi",
    q: "Which of these are weaknesses of the Waterfall model named in the lecture?",
    options: [
      "Over-documentation",
      "Late delivery",
      "Limited customer contact",
      "Frequent customer feedback",
      "Rigidity to requirement changes",
      "Continuous delivery",
    ],
    correct: [0, 1, 2, 4],
    explain: "Waterfall weaknesses: over-documentation, late delivery, limited customer contact, rigidity.",
    topic: "Waterfall",
  },
  {
    id: "w2a-m-04", kind: "multi",
    q: "Which are the three Scrum ROLES?",
    options: ["Product Owner", "Scrum Master", "Project Manager", "Release Manager", "Team Member"],
    correct: [0, 1, 4],
    explain: "Three Scrum roles: Product Owner, Scrum Master, Team Member.",
    topic: "Scrum roles",
  },
  {
    id: "w2a-m-05", kind: "multi",
    q: "Select ALL three Agile frameworks named in the course.",
    options: ["Scrum", "Kanban", "Spiral", "Extreme Programming", "V-Model"],
    correct: [0, 1, 3],
    explain: "Three named Agile frameworks: Scrum, Kanban, XP.",
    topic: "Agile frameworks",
  },
];

export const multi_week2_2: MultiSelectQ[] = [
  {
    id: "w2b-m-01", kind: "multi",
    q: "Which of these are CAUSES of gold plating?",
    options: [
      "Going above and beyond",
      "Client requesting new features",
      "Showing off team abilities",
      "Distracting from defects",
      "Strict change control",
    ],
    correct: [0, 2, 3],
    explain: "Three causes: going above and beyond, showing off, distracting from defects.",
    topic: "Gold plating",
  },
  {
    id: "w2b-m-02", kind: "multi",
    q: "Which of the following describe KANBAN (and not Scrum)?",
    options: [
      "Continuous flow",
      "Fixed-length sprints",
      "Cycle time as the key metric",
      "Velocity as the key metric",
      "No prescribed roles",
      "Locked-in scope per sprint",
    ],
    correct: [0, 2, 4],
    explain: "Kanban: continuous flow, cycle time, no prescribed roles. The others describe Scrum.",
    topic: "Compare",
  },
  {
    id: "w2b-m-03", kind: "multi",
    q: "Select ALL three columns of a typical Kanban board template.",
    options: ["Backlog", "To Do", "In Progress", "Review", "Done"],
    correct: [1, 2, 4],
    explain: "Standard columns: To Do, In Progress, Done.",
    topic: "Kanban",
  },
  {
    id: "w2b-m-04", kind: "multi",
    q: "Sprint backlog template columns include which of the following?",
    options: ["User story", "Task", "Sprint number", "Assignee", "Status", "Priority"],
    correct: [0, 1, 3, 4],
    explain: "Sprint backlog: user story, task, assignee, status.",
    topic: "Scrum artifacts",
  },
  {
    id: "w2b-m-05", kind: "multi",
    q: "In an Iron Triangle that's been broken Agile-style, which corners are FIXED?",
    options: ["Scope", "Resources", "Schedule", "Quality"],
    correct: [1, 2],
    explain: "Agile fixes resources and schedule; it makes scope variable.",
    topic: "Iron triangle",
  },
];

export const multi_week3a: MultiSelectQ[] = [
  {
    id: "w3a-m-01", kind: "multi",
    q: "Select ALL of Boehm's seven estimation techniques.",
    options: ["Algorithmic models", "Expert judgement", "Analogy", "Parkinson", "Critical-path", "Price to win", "Top-down", "Bottom-up"],
    correct: [0, 1, 2, 3, 5, 6, 7],
    explain: "Seven techniques: Algorithmic, Expert judgement, Analogy, Parkinson, Price to win, Top-down, Bottom-up. 'Critical-path' is not one.",
    topic: "Estimation",
  },
  {
    id: "w3a-m-02", kind: "multi",
    q: "Which of these are reasons to plan activities?",
    options: ["Feasibility assessment", "Resource allocation", "Eliminating risk entirely", "Detailed costing", "Motivation", "Coordination"],
    correct: [0, 1, 3, 4, 5],
    explain: "Five reasons: feasibility, resource allocation, detailed costing, motivation, coordination.",
    topic: "Planning",
  },
  {
    id: "w3a-m-03", kind: "multi",
    q: "Which are DISADVANTAGES of off-the-shelf software?",
    options: [
      "Cheaper because cost is spread",
      "No competitive advantage",
      "Forced process change",
      "Fewer bugs",
      "No code ownership",
      "Supplier lock-in",
    ],
    correct: [1, 2, 4, 5],
    explain: "Disadvantages: no competitive advantage, forced process change, no ownership, supplier lock-in.",
    topic: "OTS",
  },
  {
    id: "w3a-m-04", kind: "multi",
    q: "Which of the following count as Schedule Network Analysis techniques?",
    options: ["Critical Path Method", "Burndown velocity", "Critical Chain Method", "Resource leveling", "What-if Scenario Analysis"],
    correct: [0, 2, 3, 4],
    explain: "Techniques: CPM, Critical Chain, Resource leveling, What-if. Burndown velocity is not.",
    topic: "Scheduling",
  },
];

export const multi_week3b: MultiSelectQ[] = [
  {
    id: "w3b-m-01", kind: "multi",
    q: "Which conclusions follow from a critical-path analysis?",
    options: [
      "Critical activities have float = 0",
      "Critical activities have maximum float",
      "Any delay to a critical activity delays the project",
      "There can be more than one critical path",
      "Resource leveling never affects the critical path",
    ],
    correct: [0, 2, 3],
    explain: "Critical activities have float = 0; delays delay the project; more than one critical path is possible.",
    topic: "Critical path",
  },
  {
    id: "w3b-m-02", kind: "multi",
    q: "Which apply to the CRITICAL CHAIN method (and not basic CPM)?",
    options: [
      "Accounts for resource constraints",
      "Assumes unlimited resources",
      "Uses shared buffers",
      "Pads every individual task",
      "Has a project buffer at the end of the project",
      "Has feeding buffers where feeding paths join",
    ],
    correct: [0, 2, 4, 5],
    explain: "Critical Chain accounts for resource limits, shares buffers, has project + feeding buffers. Padding every task is the CPM habit it improves on.",
    topic: "Critical chain",
  },
  {
    id: "w3b-m-03", kind: "multi",
    q: "Which apply to SCHEDULE COMPRESSION via crashing or fast-tracking?",
    options: [
      "Crashing buys time with money",
      "Fast-tracking buys time with parallelism",
      "Crashing reduces scope",
      "Fast-tracking carries rework risk",
      "Both change the project scope",
    ],
    correct: [0, 1, 3],
    explain: "Crashing = pay for time. Fast-tracking = run in parallel (rework risk). Neither changes scope.",
    topic: "Compression",
  },
  {
    id: "w3b-m-04", kind: "multi",
    q: "Select ALL three worked-example critical paths from the slides.",
    options: [
      "A → C → G → H (18 weeks)",
      "B → D → F → H",
      "B → E → I (25 days)",
      "F → G (13 weeks)",
      "A → B → C",
    ],
    correct: [0, 2, 3],
    explain: "Example 1: A→C→G→H 18w. Example 2: B→E→I 25d. Exercise: F→G 13w.",
    topic: "Examples",
  },
];

// =============================================================================
// FILL-IN-THE-BLANK questions per lecture
// =============================================================================

export const fill_week1: FillBlankQ[] = [
  {
    id: "w1-f-01", kind: "fill",
    q: "The three project constraints are time, cost, and _____.",
    accept: ["quality"],
    explain: "Time, Cost, Quality.",
    topic: "Constraints",
  },
  {
    id: "w1-f-02", kind: "fill",
    q: "SMART stands for Specific, Measurable, Achievable, _____, Time-constrained.",
    accept: ["relevant"],
    explain: "The R is Relevant.",
    topic: "SMART",
  },
  {
    id: "w1-f-03", kind: "fill",
    q: "According to Standish, only about ____ of ICT projects are successful (write as a fraction word, e.g. 'one third').",
    accept: ["one third", "a third", "1/3", "third"],
    explain: "About one third of ICT projects succeed.",
    topic: "Statistics",
  },
  {
    id: "w1-f-04", kind: "fill",
    q: "Raw details = data; data processed into something meaningful & useful = _____.",
    accept: ["information"],
    explain: "Data is raw; information is processed and meaningful.",
    topic: "Control loop",
  },
  {
    id: "w1-f-05", kind: "fill",
    q: "The mnemonic for software project differences is I-C-C-_____.",
    accept: ["F", "flexibility"],
    explain: "I-C-C-F: Invisibility, Complexity, Conformity, Flexibility.",
    topic: "Software differences",
  },
  {
    id: "w1-f-06", kind: "fill",
    q: "The phase that answers 'is it worth doing?' is the _____ study.",
    accept: ["feasibility"],
    explain: "Feasibility study precedes planning and execution.",
    topic: "Phases",
  },
];

export const fill_week2_1: FillBlankQ[] = [
  {
    id: "w2a-f-01", kind: "fill",
    q: "The mnemonic for the five Scrum values is C-C-R-F-_____.",
    accept: ["O", "openness"],
    explain: "Courage, Commitment, Respect, Focus, Openness.",
    topic: "Scrum values",
  },
  {
    id: "w2a-f-02", kind: "fill",
    q: "Working software is the primary measure of _____ in Agile.",
    accept: ["progress"],
    explain: "Principle #7.",
    topic: "Agile principles",
  },
  {
    id: "w2a-f-03", kind: "fill",
    q: "Waterfall's progress is measured by the amount of _____ produced.",
    accept: ["documentation", "documents"],
    explain: "Document-driven progress measurement.",
    topic: "Waterfall",
  },
  {
    id: "w2a-f-04", kind: "fill",
    q: "Agile's #1 priority is satisfying the customer through early and _____ delivery of valuable software.",
    accept: ["continuous"],
    explain: "Principle #1 — early and continuous delivery.",
    topic: "Agile principles",
  },
  {
    id: "w2a-f-05", kind: "fill",
    q: "Agile values 'working software' over comprehensive _____.",
    accept: ["documentation"],
    explain: "Value #2.",
    topic: "Agile values",
  },
];

export const fill_week2_2: FillBlankQ[] = [
  {
    id: "w2b-f-01", kind: "fill",
    q: "Adding extra features the team built without being asked is called _____ plating.",
    accept: ["gold"],
    explain: "Gold plating.",
    topic: "Gold plating",
  },
  {
    id: "w2b-f-02", kind: "fill",
    q: "Kanban's key metric is _____ time.",
    accept: ["cycle"],
    explain: "Cycle time. Scrum's is velocity.",
    topic: "Kanban",
  },
  {
    id: "w2b-f-03", kind: "fill",
    q: "A Kanban board's three columns are To Do, In Progress, and _____.",
    accept: ["done"],
    explain: "To Do · In Progress · Done.",
    topic: "Kanban",
  },
  {
    id: "w2b-f-04", kind: "fill",
    q: "Scrum's key metric is _____.",
    accept: ["velocity"],
    explain: "Velocity for Scrum, cycle time for Kanban.",
    topic: "Scrum",
  },
  {
    id: "w2b-f-05", kind: "fill",
    q: "Agile breaks the Iron Triangle by making scope _____ while fixing resources and schedule.",
    accept: ["variable"],
    explain: "Agile makes scope variable; resources and schedule are fixed.",
    topic: "Iron triangle",
  },
];

export const fill_week3a: FillBlankQ[] = [
  {
    id: "w3a-f-01", kind: "fill",
    q: "Lease $800/day vs purchase $12,000 + $400/day. The break-even is _____ days.",
    accept: ["30"],
    explain: "12,000 = 400d → d = 30 days.",
    topic: "Make or buy",
  },
  {
    id: "w3a-f-02", kind: "fill",
    q: "PERT expected duration t_e = (t_o + 4·t_m + t_p) / _____.",
    accept: ["6"],
    explain: "Sum divided by 6.",
    topic: "PERT",
  },
  {
    id: "w3a-f-03", kind: "fill",
    q: "CPI = EV / _____.",
    accept: ["AC", "ac"],
    explain: "CPI = EV/AC. >1 = under budget.",
    topic: "EVM",
  },
  {
    id: "w3a-f-04", kind: "fill",
    q: "SPI = EV / _____.",
    accept: ["PV", "pv"],
    explain: "SPI = EV/PV. >1 = ahead of schedule.",
    topic: "EVM",
  },
  {
    id: "w3a-f-05", kind: "fill",
    q: "If EV < AC, the project is _____ budget.",
    accept: ["over"],
    explain: "EV < AC → over budget.",
    topic: "EVM",
  },
  {
    id: "w3a-f-06", kind: "fill",
    q: "PERT: t_o=4, t_m=6, t_p=14 → t_e = _____.",
    accept: ["7", "7.0", "7.00"],
    explain: "(4 + 24 + 14)/6 = 42/6 = 7.",
    topic: "PERT",
  },
  {
    id: "w3a-f-07", kind: "fill",
    q: "In AoN notation, the _____ carry the duration.",
    accept: ["nodes", "node"],
    explain: "AoN: nodes carry duration; links carry none.",
    topic: "AoN/AoA",
  },
];

export const fill_week3b: FillBlankQ[] = [
  {
    id: "w3b-f-01", kind: "fill",
    q: "Activities on the critical path have float = _____.",
    accept: ["0", "zero"],
    explain: "Float = 0 is the definition of a critical-path activity.",
    topic: "Critical path",
  },
  {
    id: "w3b-f-02", kind: "fill",
    q: "Forward pass formula (zero-indexed): EF = ES + _____.",
    accept: ["duration", "dur"],
    explain: "EF = ES + duration.",
    topic: "Forward pass",
  },
  {
    id: "w3b-f-03", kind: "fill",
    q: "Backward pass at a burst: LF = min(LS of _____) ",
    accept: ["successors", "successor", "successors"],
    explain: "LF = min(LS of all successors).",
    topic: "Backward pass",
  },
  {
    id: "w3b-f-04", kind: "fill",
    q: "Worked Example 1 — critical path is A → C → G → H, project duration = _____ weeks.",
    accept: ["18"],
    explain: "7 + 6 + 3 + 2 = 18.",
    topic: "Examples",
  },
  {
    id: "w3b-f-05", kind: "fill",
    q: "Worked Example 2 — critical path is B → E → I, project duration = _____ days.",
    accept: ["25"],
    explain: "3 + 17 + 5 = 25.",
    topic: "Examples",
  },
  {
    id: "w3b-f-06", kind: "fill",
    q: "Worked Example 3 — critical path is _____ → G, duration = 13 weeks.",
    accept: ["F"],
    explain: "F → G = 10 + 3 = 13 weeks.",
    topic: "Examples",
  },
  {
    id: "w3b-f-07", kind: "fill",
    q: "Total Float = LS − _____.",
    accept: ["ES", "es"],
    explain: "TF = LS − ES (= LF − EF).",
    topic: "Float",
  },
  {
    id: "w3b-f-08", kind: "fill",
    q: "Schedule compression by running activities in parallel is called _____ tracking.",
    accept: ["fast"],
    explain: "Fast tracking (parallel). Crashing is paying for time.",
    topic: "Compression",
  },
];
