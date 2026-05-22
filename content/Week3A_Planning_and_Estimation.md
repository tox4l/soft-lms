# SOFT2301 — Week 3 (Part A): Project Planning & Estimation Techniques

> **Exam framing:** This part is **calculation-heavy.** Three formulas you *will* be asked to use: **Make-or-Buy break-even**, **EVM indices (CPI & SPI)**, and **PERT three-point estimate**. Memorize the formulas, then practise plugging numbers. The conceptual lists (estimation techniques, float types, why-plan reasons) round out the short-answer questions.

---

## 1. Software Project Planning — Objectives

By the end you should be able to:
- **Produce an activity plan**
- **Estimate the overall duration** of a project
- **Create a critical path and a precedence network** for a project

---

## 2. Build or Buy?

Software development can be seen from **two viewpoints**: the **developers'** and the **clients'/users'**.

| Setup | Where are developers vs users? |
|---|---|
| **In-house development** | Same organization |
| **Outsourced development** | Different organizations (in global development, even different continents) |

These factors affect how a project is organized. The build-or-buy decision tree:

| Option | Path |
|---|---|
| **Build** | In-house development |
| **Buy** | Outsource / purchase off-the-shelf |
| **Either** | Could go either way depending on analysis |

### Off-the-Shelf (OTS) Software — Advantages

| Advantage | |
|---|---|
| Cheaper | Supplier spreads development costs over **many customers** |
| Already exists | Software is available now |
| Trialable | Can be **trialled by the potential customer** before buying |
| No delay | **No wait** while software is being developed |
| Fewer bugs | Existing users mean bugs are **likely already found and fixed** |

### Off-the-Shelf — Disadvantages

| Disadvantage | |
|---|---|
| No competitive advantage | Customer has the **same application as everyone else** (advantage may only come from *how* it's used) |
| Forced process change | Customer may need to **change the way they work** to fit the OTS app |
| No ownership | Customer **does not own the code** and **cannot change it** |
| Supplier lock-in | Danger of **over-reliance on a single supplier** |

### General Approach to the Decision

- Look at **risks and uncertainties**: are requirements well understood? are the technologies well understood?
- Look at the **type of application**: information system? embedded system? criticality? differences between target and development environments?
- Consider **clients' own requirements**: e.g. a need to use a particular method.

---

## 3. ⭐ Make-or-Buy Analysis (Break-Even) — WORKED EXAMPLE

**Method:** Set the **lease cost** equal to the **purchase cost** and solve for the break-even number of days.

**Problem (slide 8):**
- **Lease** an item: **$800/day**
- **Purchase** the item: **$12,000** + **$400/day** operational cost
- *How long until purchase cost equals lease cost?*

**Solution (slide 9):** Let **d** = number of days.

```
Purchase cost  =  Lease cost
12,000 + 400d  =  800d
12,000         =  400d
d              =  30 days
```

> **Decision rule:** If you need the item for **more than 30 days**, it is **more economical to purchase**. For fewer than 30 days, lease.

---

## 4. ⭐ Earned Value Management (EVM)

**The three base quantities:**

| Term | Question it answers |
|---|---|
| **Planned Value (PV)** | How much work **should** be done by now? |
| **Earned Value (EV)** | How much work has **actually been completed** (in value terms)? |
| **Actual Cost (AC)** | How much **money has been spent** so far? |

**The two indices (memorize both formulas):**

| Index | Formula | Good when |
|---|---|---|
| **Cost Performance Index (CPI)** | **CPI = EV / AC** | **CPI > 1** is good |
| **Schedule Performance Index (SPI)** | **SPI = EV / PV** | **SPI > 1** is good |

> Interpretation logic: **CPI compares value earned to money spent** (cost efficiency). **SPI compares value earned to value planned** (schedule efficiency). Below 1 = behind/over; above 1 = ahead/under.

### EVM Interpretation Table (slide 13 — learn to read every row)

Schedule status is judged by **EV vs PV**; budget status by **EV vs AC**.

| PV | EV | AC | Schedule (EV vs PV) | Budget (EV vs AC) |
|---|---|---|---|---|
| 100 | 100 | 100 | On Schedule | On Budget |
| 100 | 100 | 75 | On Schedule | **Under Budget** |
| 100 | 100 | 150 | On Schedule | **Over Budget** |
| 75 | 100 | 100 | **Ahead of Schedule** | On Budget |
| 75 | 100 | 150 | **Ahead of Schedule** | Over Budget |
| 100 | 150 | 100 | **Ahead of Schedule** | Under Budget |
| 150 | 100 | 75 | **Behind Schedule** | Under Budget |
| 100 | 75 | 100 | **Behind Schedule** | Over Budget |
| 150 | 100 | 100 | **Behind Schedule** | On Budget |

**How to read a row quickly:**
- **EV > PV →** Ahead of schedule. **EV = PV →** On schedule. **EV < PV →** Behind schedule.
- **EV > AC →** Under budget. **EV = AC →** On budget. **EV < AC →** Over budget.

---

## 5. Why Activity Planning? (five reasons)

| Reason | |
|---|---|
| **Feasibility assessment** | Is the schedule achievable? |
| **Resource allocation** | Who/what is needed and when |
| **Detailed costing** | Build accurate cost estimates |
| **Motivation** | Targets motivate the team |
| **Coordination** | Aligns activities and people |

---

## 6. Activity Planning — Rules

A project is composed of several **interrelated activities**:
- A project **may start** when **at least one** of its activities is ready to start.
- A project is **completed** when **all** its activities are completed.
- An activity must have a **clearly defined start and endpoint**, usually marked by producing a **tangible deliverable**.
- If an activity requires a resource, that **resource requirement must be forecastable**.

---

## 7. Identifying Activities — The Activity-Based Approach

- Create a **list of all the activities** the project is thought to involve.
- May come from a **brainstorming session** with the whole team, or from **analysis of similar past projects**.
- For large projects, **subdivide into main life-cycle stages** and consider each separately.
- Identify the **main (high-level) tasks**, then break each into **lower-level tasks** → this produces an **activity-based Work Breakdown Structure (WBS)**.

---

## 8. Sequencing & Scheduling — Gantt Charts and Networks

| Tool | What it shows |
|---|---|
| **Bar chart / Gantt chart** | The project plan laid out against a **time axis** (bars = activities over time) |
| **Activity network** | Activities and their **dependencies** as a graph |

### The Activities Example (slide 18 — used for the network exercises)

| Activity | Description | Duration (weeks) | Precedent(s) |
|---|---|---|---|
| A | Hardware selection | 6 | — |
| B | System configuration | 4 | — |
| C | Install hardware | 3 | A |
| D | Data migration | 4 | B |
| E | Draft office procedures | 3 | B |
| F | Recruit staff | 10 | — |
| G | User training | 3 | E, F |
| H | Install and test system | 2 | C, D |

> This is the same dataset solved fully in **Part B** (forward pass, backward pass, critical path = **F→G**, duration = **13 weeks**).

---

## 9. Network Models — Two Notations

### Activity-on-Node (AoN)

| Rule | |
|---|---|
| One **start** node and one **end** node | |
| **Nodes have duration**, links have **no duration** | |
| Time moves **left to right** | |
| The network **may not contain loops** | |
| Activities are **nodes (boxes)**; lines between nodes represent **dependencies** | |

> Example logic: "program testing cannot start until the errors have been corrected" = a dependency arrow.

### Activity-on-Arrow (AoA)

| Rule | |
|---|---|
| One **start** node and one **end** node | |
| Time moves **left to right** | |
| **Nodes are numbered sequentially** | |
| Each event has **latest and earliest dates** by which it should occur | |
| **Slack = difference between the earliest date and the latest date** for an event | |

---

## 10. Float (Slack)

**Definition:** Float is the amount of time an activity can be **delayed without delaying** the next activity or the whole project.

| Float type | Formula |
|---|---|
| **Total Float (TF)** | **TF = LS − ES** (Late Start − Early Start) |
| **Free Float (FF)** | **FF = ES(next) − EF(current)** |
| **Float (F)** | **F = TF − FF** |

> (LS = Late Start, ES = Early Start, EF = Early Finish.) Full mechanics and a worked numeric example are in Part B.

---

## 11. Software Effort Estimation Techniques (Boehm)

**Source:** Barry Boehm identified the main ways of deriving software development effort estimates — *Software Engineering Economics* (1981). (Textbook pp. 103–107.)

| Technique | Definition |
|---|---|
| **Algorithmic models** | Use **'effort drivers'** (characteristics of the target system & implementation environment) to predict effort |
| **Expert judgement** | Based on the advice of **knowledgeable staff** |
| **Analogy** | Use the **actual effort of a similar completed project** as the basis of the estimate |
| **Parkinson** | The staff effort **available** to do a project becomes the "estimate" |
| **Price to win** | The "estimate" is a figure low enough to **win the contract** |
| **Top-down** | An overall estimate is **broken down** into component-task efforts |
| **Bottom-up** | Component tasks are **identified, sized, and aggregated** |

---

## 12. Methods of Estimation (the three the slides emphasize)

| Method | Definition | Notes |
|---|---|---|
| **Analogous ("Top-Down")** | Uses **actual time/cost from a previous, similar project** to estimate a future one (root = *analogy*). Uses historical info + expert judgment | Typically used **early**; **less costly & faster** but can be **less accurate**. Example: Rough Order of Magnitude |
| **Parametric** | Identify the **duration per unit of work** × the **number of units** | Example: 4 hrs to cut 2 acres = **2 hrs/acre** → 8 acres ≈ **16 hrs**. (Trap: if 1 of those 4 hrs was setup/transport, you must scale only the variable per-unit work, not the fixed setup) |
| **Three-Point (PERT)** | Uses three estimates to define a range and an expected duration | See formula below |

### ⭐ PERT — Three-Point Estimate (memorize)

PERT = **Program Evaluation and Review Technique.** Three estimates:

| Symbol | Estimate |
|---|---|
| **t_o** | Optimistic |
| **t_m** | Most likely |
| **t_p** | Pessimistic |

**Expected duration:**

```
t_e = (t_o + 4·t_m + t_p) / 6
```

> The "most likely" estimate is weighted **4×**; divide the whole sum by **6**.

---

## 13. Contingency Reserves

- **Time reserves/buffers** account for **schedule uncertainty**.
- Can be expressed as a **percentage of estimated duration** or a **fixed number of work periods**.
- Can be **used, reduced, or eliminated** as more project information becomes available.

---

## 14. Develop Schedule

Creating the project schedule from previously defined **activities, relationships, resources, and durations** — an **iterative process**:
- Create a **baseline** (planned start & finish dates for activities and milestones).
- **Revise and track progress** as work progresses (compare **planned vs actual**).

---

## 15. Schedule Tools & Techniques

**Schedule Network Analysis** generates the schedule using:

| Technique | |
|---|---|
| **Critical Path Method (CPM)** | identifies the longest path / project duration |
| **Critical Chain Method** | accounts for resource constraints with buffers |
| **Resource leveling** | evens out resource demand |
| **What-if Scenario Analysis** | tests alternative scenarios |
| **Scheduling Tools** | software support |

---

## 16. Critical Path Method (CPM) — Concept

| CPM does… | |
|---|---|
| Identifies **how long the entire project** will take | |
| Identifies the **activities that determine total project time** | |
| Assists with **resource allocation planning** for activities | |
| Is a **network analysis procedure** to identify activities on the critical path | |

**Critical Path definition:** The set of project activities that, **if delayed, will lengthen the project completion time** — i.e. the set of tasks that **must be completed on time** for the whole project to finish on time.

> Full forward-pass / backward-pass mechanics and two complete worked examples are in **Part B**.

---

## ⚡ Rapid-Fire Self-Test

| Question | Answer |
|---|---|
| Make-or-buy break-even setup | Set purchase cost = lease cost, solve for days |
| Example break-even answer | d = 30 days (buy if needed > 30 days) |
| CPI formula | EV / AC ( >1 good = under budget) |
| SPI formula | EV / PV ( >1 good = ahead of schedule) |
| EV < PV means | Behind schedule |
| EV > AC means | Under budget |
| PERT expected duration | (t_o + 4·t_m + t_p) / 6 |
| What does the "4" weight in PERT? | The **most likely** estimate (t_m) |
| Analogous estimating is based on | Actual data from a previous similar project + expert judgment |
| Total Float formula | LS − ES |
| Free Float formula | ES(next) − EF(current) |
| Critical path = | Tasks that must finish on time or the whole project slips (zero float) |
| AoN: do nodes or links carry duration? | **Nodes** carry duration; links carry none |
| Two main OTS disadvantages | No competitive advantage; can't own/change the code (+ supplier lock-in) |
| Crashing vs fast-tracking (see Part B) | Add resources/cost vs run activities in parallel |
