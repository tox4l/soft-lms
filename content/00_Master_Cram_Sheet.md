# SOFT2301 — Master Cram Sheet (All Lectures)
### Last-minute review — every formula, list & distinction in one place

---

## 🔢 FORMULAS YOU MUST KNOW COLD

| Topic | Formula |
|---|---|
| **Make-or-Buy break-even** | Purchase = Lease → solve for days. (Ex: 12,000 + 400d = 800d → **d = 30**) |
| **Cost Performance Index** | **CPI = EV / AC** ( >1 = under budget, good) |
| **Schedule Performance Index** | **SPI = EV / PV** ( >1 = ahead of schedule, good) |
| **PERT expected duration** | **t_e = (t_o + 4·t_m + t_p) / 6** |
| **Forward pass** | EF = ES + dur; ES = max(pred EF) |
| **Backward pass** | LS = LF − dur; LF = min(succ LS) |
| **Total Float** | TF = LS − ES = LF − EF |
| **Free Float** | FF = ES(next) − EF(current) |
| **Float** | F = TF − FF |
| **Critical path** | Activities with **float = 0** |

> ⚠️ If the table says **FINISH = START + TIME − 1** (1-indexed days), successors start at *predecessor EF + 1*.

---

## 📋 MEMORIZED LISTS

**3 project constraints:** Time · Cost · Quality
**Triple constraint (PM):** Scope · Time · Cost (Quality in centre)
**SMART:** Specific · Measurable · Achievable · Relevant · Time-constrained
**4 ways software differs (I-C-C-F):** Invisibility · Complexity · Conformity · Flexibility
**3 project phases:** Feasibility ("worth it?") → Planning ("how?") → Execution ("do it!")
**8 management functions:** Planning · Organizing · Staffing · Directing · Controlling · Monitoring · Innovating · Representing
**Control loop:** Data → Information → Compare w/ objectives → Modelling → Implementation
**4 Agile values (X over Y):** Individuals & interactions / Working software / Customer collaboration / Responding to change
**5 Scrum values (C-C-R-F-O):** Courage · Commitment · Respect · Focus · Openness
**3 Scrum roles:** Product Owner (PO) · Scrum Master (SM) · Team Member (TM)
**3 Agile frameworks:** Scrum · Kanban · XP
**Kanban board columns:** To Do · In Progress · Done
**7 Boehm estimation methods:** Algorithmic · Expert judgement · Analogy · Parkinson · Price-to-win · Top-down · Bottom-up
**3 estimation methods emphasized:** Analogous (top-down) · Parametric · Three-point (PERT)
**5 reasons to plan:** Feasibility · Resource allocation · Detailed costing · Motivation · Coordination

---

## ⚔️ KEY DISTINCTIONS (the trap questions)

| A | B | Key difference |
|---|---|---|
| **Data** | **Information** | Raw details vs processed & meaningful |
| **Jobs** vs **Projects** vs **Exploration** | | Low → medium → high uncertainty |
| **In-house** | **Outsourced** | Same org vs different orgs |
| **System requirements** | **Software requirements** | Drive architecture design vs emerge from it |
| **Method** | **Methodology** | A way of working vs a set of methods |
| **Waterfall** | **Agile** | Sequential, fixed reqs, late delivery vs iterative, changing reqs, continuous delivery |
| **Scope Creep** | **Gold Plating** | Uncontrolled (often client) scope growth vs team adds unrequested freebies |
| **Traditional (Iron Triangle)** | **Agile** | Fixes scope, flexes time/cost vs fixes resources/schedule, flexes scope |
| **Project Management** | **Product Management** | Manage tasks/schedule/budget vs manage the product |
| **WBS** | **Product Backlog** | Hierarchical (traditional) vs prioritized list (Agile) — don't force backlog into WBS |
| **Scrum** | **Kanban** | Sprints + Velocity + locked scope vs Continuous flow + Cycle time + change anytime |
| **Agile** | **Project Management** | A specific methodology vs the broad umbrella discipline |
| **Crashing** | **Fast-tracking** | Add cost/resources vs run activities in parallel |
| **CPM** | **Critical Chain** | Unlimited resources, pad tasks vs resource-constrained, shared buffers |
| **Project buffer** | **Feeding buffer** | End of project vs end of a feeding activity |
| **AoN** | **AoA** | Activity-on-Node (nodes=activities, have duration) vs Activity-on-Arrow (numbered events) |

---

## 📊 THE NUMBERS (Week 1)

- UK gov ICT spend 2003–4 = **£2.3bn** (vs £1.4bn roads)
- Standish: only **~⅓** of ICT projects succeed; **82%** late; **43%** over budget
- Failure rates: All **71%** · Medium **91%** · Large **94%**

---

## 🧮 CPM WORKED-EXAMPLE ANSWERS (verify you can reproduce these)

| Example | Critical Path | Duration |
|---|---|---|
| Example 1 (A–H, 8 activities) | **A → C → G → H** | **18 weeks** |
| Example 2 (A–J, tabular, day-based) | **B → E → I** | **25 days** |
| Exercise (Hardware/Software project) | **F → G** | **13 weeks** |

---

## 🎯 EVM ROW-READING (instant interpretation)

- **EV vs PV → schedule:** EV>PV ahead · EV=PV on · EV<PV behind
- **EV vs AC → budget:** EV>AC under · EV=AC on · EV<AC over

---

## 🔑 LECTURE 1 "KEY POINTS" (likely summary question)

1. Projects are non-routine → uncertain.
2. Particular problems, e.g. lack of visibility.
3. Clear, objectively-assessable objectives are essential.
4. Stuff happens — can't keep precisely to plan → need control.
5. Communicate, communicate, communicate!
