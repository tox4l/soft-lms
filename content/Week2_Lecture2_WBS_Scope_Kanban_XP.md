# SOFT2301 — Week 2, Lecture 2: WBS, Scope, Scrum Artifacts, Kanban & XP

> **Exam framing:** This lecture is dense with *distinctions*. The highest-probability questions: **Scope Creep vs Gold Plating**, **Scrum vs Kanban** (the comparison table is almost certainly a question), **WBS vs Product Backlog**, **traditional PM vs Agile (Iron Triangle)**, and the definition of **XP**. Know which side of each contrast each property belongs to.

---

## 1. Work Breakdown Structure (WBS)

A **WBS** decomposes a software project into a hierarchy of deliverables/tasks — breaking the high-level work into progressively smaller, manageable pieces. (Slides 2–3 present a WBS for a software project.)

> Connects forward to Week 3: the **activity-based approach** to identifying activities *is* building a WBS — identify main/high-level tasks, then break each into lower-level tasks.

---

## 2. Project Scope Creep

**Definition:** Scope creep occurs through **uncontrolled changes or expansions** to your project scope **without adjusting the project's time, cost, or other resources.** It usually happens **little by little** and often creates issues in later stages.

**Causes of scope creep:**

| Cause | |
|---|---|
| Client requests or interference | external pressure to add more |
| Project team miscommunication | internal misunderstanding |
| Incomplete/inadequate scope statements, systems, or procedures | weak baseline |
| Insufficient project monitoring | nobody catching the drift |
| External causes | market trends, industry announcements |

---

## 3. Gold Plating

**Definition:** The project team adds **extra features that were NOT part of the original scope** — usually as "freebies" for the client.

**Causes of gold plating:**

| Cause | Motivation |
|---|---|
| Going above and beyond | Team thinks it will make the client happy |
| Showing off | Team members want to demonstrate their abilities |
| Distracting from defects | An attempt to **hide mistakes or deficiencies** |

### ⚠️ Scope Creep vs Gold Plating (the classic trap)

| | **Scope Creep** | **Gold Plating** |
|---|---|---|
| Who initiates? | Often the **client / external** (uncontrolled changes) | The **project team** (internal, voluntary) |
| What is added? | Expanded/changed scope | Extra features beyond original scope |
| Authorized? | Uncontrolled / unmanaged | Unrequested "freebies" |
| Resources adjusted? | No (time/cost not adjusted) | No (delivered for "free") |

> One-line memory hook: **Scope creep = the scope grows on you; Gold plating = the team adds gold nobody asked for.**

---

## 4. Scrum Artifacts & Ceremonies

| Item | What it is |
|---|---|
| **Product Backlog** | The full list of future activities/requirements (stores everything still to do) |
| **Sprint Backlog** | Tracks the work to be completed **during a specific sprint**; template has columns for **user story, task, assignee, and status** |
| **Daily Stand-up** (Daily Scrum) | Short daily meeting where team members report **progress, blockers, and plans for the day** |
| **Burndown Chart** | A **key performance indicator** showing how much work **remains** in the project. Gives a quick progress overview but is **limited at identifying specific process gaps** — it only shows a summary of total work completed by the whole team |

**Recall the Scrum values** (from Lecture 1, repeated on slide 4): Courage, Commitment, Respect, Focus, Openness.

---

## 5. The Iron Triangle — Traditional vs Agile

**Agile "breaks" the Iron Triangle:** to achieve agility, Agile makes **project scope variable** while **fixing resources and schedule.** This is the inverse of traditional thinking.

| Approach | Fixed | Variable |
|---|---|---|
| **Traditional** | Scope is fixed | Time & cost (resources) flex to deliver the scope |
| **Agile** | **Resources & schedule fixed** | **Scope is variable** |

### Project Management vs Product Management (root of the difference)

| | **Project Management** | **Product Management** |
|---|---|---|
| Focus | Managing **tasks and activities** to finish **on schedule and on budget** | Managing the **product** itself |
| Associated with | Traditional PM | Agile mindset |

> Critical warning from the slide: many project/program managers are **unaware of this difference**. Implementing Agile while still carrying **traditional PM biases** often leads to **failed projects.** A specific symptom: **trying to structure product backlogs like WBS hierarchies** — a manifestation of misalignment between traditional PM and Agile mindsets.

### WBS vs Product Backlog

| | **WBS** | **Product Backlog** |
|---|---|---|
| Belongs to | Traditional project management | Agile product management |
| Structure | Hierarchical decomposition of deliverables | Prioritized, flat list of items (user stories) |
| Mistake to avoid | — | Don't force the backlog into a WBS-style hierarchy |

---

## 6. Kanban

**Definition:** Kanban is a popular framework used to **implement Agile.** It requires **real-time communication of capacity** and **full transparency of work.** Work items are represented **visually on a Kanban board**, letting team members see the state of every piece of work at any time.

### Kanban Boards

- The work of all Kanban teams **revolves around a Kanban board** — a tool to **visualize and optimize the workflow** across teams.
- **Physical boards** are popular with some teams, but **virtual boards** are crucial in agile software tools for **traceability, collaboration, and accessibility from multiple locations.**
- A Kanban board template typically features columns for **To Do, In Progress, Done**, with **cards** representing individual tasks or user stories.

---

## 7. ⭐ Scrum vs Kanban (the must-know comparison table)

| Dimension | **Scrum** | **Kanban** |
|---|---|---|
| **Release methodology** | Regular **fixed-length sprints** (e.g., two weeks) | **Continuous flow** |
| **Roles** | Product Owner, Scrum Master, Development Team | Continuous delivery / **at the team's discretion** (no prescribed roles) |
| **Key metric** | **Velocity** | **Cycle time** |
| **Change philosophy** | Teams **should not change the sprint forecast during a sprint** — doing so compromises learning around estimation | **Change can happen at any time** |

> Memory hooks: **Scrum = Sprints + Velocity + locked-in scope per sprint.** **Kanban = Continuous flow + Cycle time + change anytime.**

---

## 8. Extreme Programming (XP)

**Definition:** XP is an Agile software development methodology focused on delivering **high-quality software** through **frequent and continuous feedback, collaboration, and adaptation.** XP emphasizes a **close working relationship** between the development team, the customer, and stakeholders, with an emphasis on **rapid, iterative development and deployment.**

> XP is the third Agile framework named in the course (alongside Scrum and Kanban) and stresses **good engineering practices**.

---

## 9. Agile vs Project Management (don't confuse the two)

- Agile and project management are **related but not the same.**
- **Agile** is a **specific methodology** for managing projects.
- **Project management** is a **broader concept** encompassing many methodologies and frameworks — including Agile, Waterfall, and others.
- In other words: **Agile is one of many approaches** that can be applied to project management. Project management is the **overall process of planning, organizing, and managing resources** to successfully complete a project.

| | **Agile** | **Project Management** |
|---|---|---|
| Scope of concept | Narrow (a specific methodology) | Broad (the umbrella discipline) |
| Relationship | A subset / one approach | Encompasses Agile, Waterfall, etc. |

---

## ⚡ Rapid-Fire Self-Test

| Question | Answer |
|---|---|
| Scope creep is initiated mostly by… | Uncontrolled changes (often client/external) without adjusting time/cost |
| Gold plating is initiated by… | The **project team** adding unrequested extra features |
| Three causes of gold plating | Going above & beyond, showing off, distracting from defects |
| Sprint backlog template columns | User story, task, assignee, status |
| What does a burndown chart show? | How much work **remains**; its weakness = can't identify specific process gaps |
| Agile breaks the Iron Triangle by… | Making **scope variable** while fixing resources & schedule |
| PM focuses on ___, Product mgmt focuses on ___ | Tasks/activities (schedule & budget) ; the product |
| Scrum release method vs Kanban | Fixed-length sprints vs continuous flow |
| Scrum key metric vs Kanban | Velocity vs Cycle time |
| Kanban board columns | To Do, In Progress, Done |
| What is XP? | Agile methodology for high-quality software via continuous feedback, collaboration, rapid iterative dev |
| Agile vs project management | Agile = one specific methodology; PM = broad umbrella that includes Agile/Waterfall/etc. |
