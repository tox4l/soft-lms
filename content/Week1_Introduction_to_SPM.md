# SOFT2301 — Week 1: Introduction to Software Project Management
### Chapter 1 (Hughes & Cotterell, *Software Project Management*, 5e)

> **Exam framing:** This lecture defines the vocabulary the whole course is built on — *project*, *software project*, *management*, *objectives*, *stakeholders*, *control*. Most of the exam's "definition" and "list" questions live here. Memorize the distinctions, not just the words.

---

## 1. What Is a Project?

**Dictionary roots (Longmans):** "a specific plan or design," "a planned undertaking," "a large undertaking e.g. a public works scheme." → The two key ideas extracted are **planning** and **size** of the task.

**Course definitions (memorize both):**

| Definition | Wording |
|---|---|
| Definition 1 | A project is a **temporary effort** to create a **unique product or service**. Projects usually include **constraints and risks** regarding cost, schedule, or performance outcome. |
| Definition 2 | A project is a **planned set of interrelated tasks** executed over a **fixed period** and within **certain cost and other limitations**. |

**Anatomy of a project (the diagram on slide 6):**

| Attribute | Meaning |
|---|---|
| Temporary effort | Has a defined **start and end** |
| Unique output | Produces a **unique** product or service (not mass-repetition) |
| Interrelated tasks | A chain of dependent tasks runs between start → end |
| Constraints | **Time, Cost, Quality** (the three constraints) |

---

## 2. What Is a Software Project?

A software project is a project whose unique deliverable is a **software system** — i.e. **the source code** and the working system built from it. Same structure as any project (start → interrelated tasks → unique output), but the output is software.

---

## 3. What Is Project Management?

The five core PM activities introduced on slide 8:

| # | Activity | One-line meaning |
|---|---|---|
| 1 | **Planning** | Deciding what to do, when, and how |
| 2 | **Scheduling** | Placing activities in time |
| 3 | **Resource allocation** | Assigning people/money/materials |
| 4 | **Risk management** | Identifying and handling uncertainty |
| 5 | **Monitoring & control** | Tracking progress and correcting course |

---

## 4. Why Is Project Management Important?

**The hard evidence (slide 9 — memorize the numbers):**

| Fact | Figure |
|---|---|
| UK govt ICT contract spend (2003–4) | **£2.3 billion** on ICT contracts |
| UK govt road-building spend (same period) | **£1.4 billion** |
| Standish Group — successful ICT projects | only about **one third** |
| Projects late | **82%** |
| Projects over budget | **43%** |
| Root cause of failures | **Poor project management** |

**Failure rates by project size (slide 10 pie charts):**

| Project size | Success | Fail |
|---|---|---|
| All projects | 29% | **71%** |
| Medium projects | 9% | **91%** |
| Large projects | 6% | **94%** |

> **Takeaway:** the larger the project, the more likely it fails — which is exactly why management discipline scales in importance.

**Benefits of good project management (slide 12):** better control of financial/physical/human resources · improved customer relations · shorter development times · lower costs · higher quality & reliability · improved productivity · better internal coordination.

---

## 5. Jobs vs Projects vs Exploration (the uncertainty spectrum)

| Type | Definition | Uncertainty |
|---|---|---|
| **Jobs** | Repetition of well-defined, well-understood tasks | Very **low** |
| **Projects** | *In the middle* | Moderate |
| **Exploration** | e.g. finding a cure for cancer | **Very high / very uncertain** |

> Spectrum runs Routine → Uncertainty of outcome. **Projects sit in the middle.**

**Characteristics that make a task more "project-like" (slide 14):** Non-routine · Planned · Aiming at a specific target · Carried out for a customer · Carried out by a temporary work group · Involving several specialisms · Made up of several different phases · Constrained by time and resources · Large and/or complex.

---

## 6. Management Approaches: Traditional vs Quality Culture

| | **Traditional culture** | **Quality culture** |
|---|---|---|
| Manager's role | Managers think, employees do as told; manager solves problems at the top level | Managers are **coaches** of the team they lead |
| Behaviours | Top-down control | Communicate vision/mission/goals · provide resources · remove barriers · seek employee input & feedback · build trust · provide training · reward & recognize performance |

---

## 7. Software Projects vs Other Projects — Are They Different?

**Yes — four distinguishing characteristics (memorize all four):**

| Characteristic | Why software is different |
|---|---|
| **Invisibility** | Progress is **not immediately visible** (you can't *see* code progress like a building) |
| **Complexity** | More complexity per dollar than other engineered products |
| **Conformity** | Software must conform to the **requirements of human clients** (and their inconsistencies) |
| **Flexibility** | Software is **easy to change** — a strength, but also a source of instability |

> Mnemonic: **I-C-C-F** (Invisibility, Complexity, Conformity, Flexibility).

---

## 8. Project Phases & the Software Development Life-Cycle (SDLC)

**Three high-level activities of any project (slide 19):**

| Phase | Question it answers | Note |
|---|---|---|
| **Feasibility study** | "Is it worth doing?" — technically feasible AND worthwhile from a business view | Gate before planning |
| **Planning** | "How do we do it?" | Only done **if** the project is feasible |
| **Execution** | "Do it!" — implement the plan | Plan **may change** as you go |

**The classic waterfall SDLC sequence (slide 17):**
Requirements analysis → Specification → Design → Coding → Verification & validation → Implementation/installation → Maintenance & support.

### ISO 12207 Life-Cycle (slides 20–23) — exam favourite

| Stage | What happens |
|---|---|
| **Requirements analysis** | **Elicitation** (what does the client need?) + **Analysis** (convert customer-facing requirements into developer-understandable equivalents). Covers **Functions, Quality, Resource constraints (costs)** |
| **Architecture design** | Based on *system requirements*; defines components (hardware, software, organizational); **software requirements come out of this** |
| **Code and test** | Of individual components |
| **Integration** | Putting the components together |
| **Qualification testing** | Testing the **system** (not just the software) |
| **Installation** | Making the system operational — standing data, system parameters, operational hardware, user training |
| **Acceptance support** | Including **maintenance and enhancement** |

> Distinction to remember: **system requirements** drive architecture design; **software requirements** emerge from architecture design. Qualification testing tests the *system*, not just the *software*.

---

## 9. In-House vs Out-Sourced (Contract vs Technical PM)

| Type | Who employs clients & developers |
|---|---|
| **In-house** | Same organization |
| **Out-sourced** | Different organizations |

A "project manager" could therefore be either:
- a **contract manager** in the *client* organization, or
- a **technical project manager** in the *supplier/services* organization.

---

## 10. Plans, Methods, and Methodologies

| Term | Definition |
|---|---|
| **Method** | A **way of working** (how to carry out a type of activity) |
| **Methodology** | A **set of methods** |
| **Plan** | Methods + **context** + start/end dates for each activity, staffing, tools, materials, etc. |

> Equation to recall: **Plan = (Methodology applied to a context) + scheduling/staffing/resources.**

---

## 11. Categorizing Projects (slide 25)

Different project types need different approaches. Three categorization axes:

| Axis | Example contrast |
|---|---|
| Voluntary vs Compulsory | Computer game (voluntary) vs an organization's order-processing system (compulsory) |
| Information system vs Embedded system | Business data system vs software embedded in hardware |
| Objective-based vs Product-based | Defined by the *goal* vs defined by the *deliverable* |

---

## 12. Stakeholders

**Definition:** people who have a **stake or interest** in the project. Broadly **users/clients** or **developers/implementers**.

**Three location categories:**
1. Within the project team
2. Outside the project team but within the same organization
3. Outside both the team and the organization

> Different stakeholders may have **different objectives** → you must define **common project objectives**.

**Stakeholder map (slide 27):**

| Project Team | Other Stakeholders |
|---|---|
| Sponsor · Project Manager · Team Members | Operation Managers · Functional Managers · Business Partners · Customers · Government |

---

## 13. Setting Objectives

- Objective answers: **"What do we have to do to have a success?"**
- Needs a **project authority** that **sets project scope** and **allocates/approves costs**.
- The authority could be one person or a group: **Project Board**, **Project Management Board**, or **Steering Committee**.

**Informal objective statement:** *"The project will be regarded as a success if …………"* — like **post-conditions** for the project. Focus on **what** will be put in place, not **how** activities are carried out.

### Objectives Should Be SMART

| Letter | Meaning |
|---|---|
| **S** | **Specific** — concrete and well-defined |
| **M** | **Measurable** — satisfaction can be objectively judged |
| **A** | **Achievable** — within the power of the individual/group to meet |
| **R** | **Relevant** — relevant to the true purpose of the project |
| **T** | **Time-constrained** — a defined point in time to achieve it |

---

## 14. Goals / Sub-Objectives

- **Steps along the way** to achieving the objective.
- Informal statement: *"To reach objective X, the following must be in place: A…, B…, C… etc."*
- A goal can often be allocated to an **individual**. The individual may achieve their *goal* alone but not the overall *objective*.

**Worked illustration (slide 32):**

| Level | Owner | Target |
|---|---|---|
| Overall **objective** | (whole project) | User satisfaction with software product |
| **Goal** | Analyst | Accurate requirements |
| **Goal** | Developer | Reliable software |

---

## 15. Measures of Effectiveness

How do we know a goal/objective was achieved? By a **practical test that can be objectively assessed.**

Example — for "user satisfaction with software product":
- **Repeat business** (they buy further products from us)
- **Number of complaints** (low = good)

---

## 16. The Business Case & Project Success/Failure

**Business case:** Benefits of the delivered project must **outweigh** costs.

| | Detail |
|---|---|
| **Costs** | Development + Operation |
| **Benefits** | **Quantifiable** and **Non-quantifiable** |

### The Project Triangle (Iron Triangle)

Success = **degree to which objectives are met**, balanced across three corners:

| Corner | |
|---|---|
| **Scope** (of deliverables) | top |
| **Time** | bottom-left |
| **Cost** | bottom-right |

> **Trade-off rule:** If a project runs out of *time*, recover by **reducing scope** or **increasing cost**. Likewise cost and scope can be protected by adjusting the other corners. You cannot fix all three independently.

**Other (longer-term, less tangible) success criteria:** improved skill & knowledge · creation of reusable assets (e.g. software libraries) · improved customer relationships leading to repeat business.

---

## 17. What Is Management? (the eight functions)

> **Management = achieving goals in a way that makes the best use of all resources.**

| Function | Definition | Catchphrase |
|---|---|---|
| **Planning** | Deciding in advance what/when/how; bridges gap between where we are and where we want to be | "deciding what is to be done" |
| **Organizing** | Bringing together physical, financial, human resources and building productive relationships | "making arrangements" |
| **Staffing** | Manning the org structure & keeping it manned; manpower, training | "selecting the right people for the job" |
| **Directing** | Supervision, motivation, leadership, communication | "giving instructions" |
| **Controlling** | Ensuring everything occurs in conformity with the standards / taking action to remedy hold-ups | — |
| **Monitoring** | Checking on progress | — |
| **Innovating** | Coming up with solutions when problems emerge | — |
| **Representing** | Liaising with clients, users, developers, and other stakeholders | — |

---

## 18. Management Control (slides 40–42) — the control loop

The control cycle, in order:

| Step | Definition | Example |
|---|---|---|
| **Data** | The raw details | "6,000 documents processed at location X" |
| **Information** | Data processed into something meaningful & useful | "Productivity is 100 documents a day" |
| **Comparison with objectives/goals** | Check against target | "We will not meet target of processing all documents by 31st March" |
| **Modelling** | Working out probable outcomes of various decisions | "If we add two staff at X, how fast can we finish?" |
| **Implementation** | Carrying out the chosen remedial actions | Hire the staff |

**Full loop (slide 40):** The real world → **Data collection** → Data → **Data processing** → Information → **Making decisions/plans** (informed by *Define objectives* and *Modelling*) → Decisions → **Implementation** → Actions → back to the real world.

> Key data→information distinction is a classic exam question: **data is raw; information is processed and meaningful.**

---

## 19. PM at Its Most Basic — The Triple Constraint

**Key PM responsibilities:** create clear & realistic objectives · build project requirements · manage the **triple constraint** (cost, time, scope).

| Constraint | Refers to |
|---|---|
| **Scope** | What must be done to produce the project's result |
| **Time** | The time available to complete the project |
| **Cost** | The budgeted amount available for the project |

The PM's duty is to **balance these three competing goals**, with **Quality** sitting at the centre of the triangle (slide 44).

---

## 20. Suggested Skills for Project Managers

PMs must be comfortable with change, understand their organizations, and lead teams. They need both **hard** and **soft** skills:

| Skill type | Examples |
|---|---|
| **Hard skills** | Product knowledge; knowing PM tools and techniques |
| **Soft skills** | Being able to work with people |

**The six suggested skill areas (slide 46):**

| Skill | Includes |
|---|---|
| Communication | Listens, persuades |
| Organizational | Plans, sets goals, analyzes |
| Team-building | Shows empathy, motivates, promotes esprit de corps |
| Leadership | Sets examples, provides vision (big picture), positive, energetic |
| Coping | Flexible, creative, patient, persistent |
| Technology | Experience, project knowledge |

---

## 21. Problems with Software Projects

**From the manager's point of view:**
- Poor estimates and plans
- Lack of quality standards and measures
- Lack of guidance about making organizational decisions
- Lack of techniques to make progress visible
- Poor role definition — who does what?
- Incorrect success criteria

**Another point of view (broader):**
- Lack of knowledge of application area
- Lack of up-to-date documentation
- Preceding activities not completed on time
- Lack of communication between users and technicians
- Lack of commitment — especially when a project is tied to one person who then moves
- Narrow scope of technical expertise
- Changing statutory requirements
- Changing software environment
- Deadline pressure
- Lack of training

---

## 22. Key Points of the Lecture (slide 49 — likely exam summary)

1. Projects are **non-routine** — thus **uncertain**.
2. Projects have particular problems, e.g. **lack of visibility**.
3. **Clear objectives that can be objectively assessed are essential.**
4. **Stuff happens** — it's not usually possible to keep precisely to plan → **need for control**.
5. **Communicate, communicate, communicate!**

---

## ⚡ Rapid-Fire Self-Test (cover the answers)

| Question | Answer |
|---|---|
| Two key ideas in a "project" per the dictionary | Planning + size |
| The three project constraints | Time, Cost, Quality |
| Four ways software projects differ | Invisibility, Complexity, Conformity, Flexibility |
| SMART stands for | Specific, Measurable, Achievable, Relevant, Time-constrained |
| Standish: % of ICT projects successful | ~one third (late 82%, over budget 43%) |
| Difference: data vs information | Data = raw details; Information = processed & meaningful |
| Feasibility study answers | "Is it worth doing?" |
| Methodology = | a set of methods |
| Triple constraint corners | Scope, Time, Cost (Quality in the middle) |
| If running out of time, recover by… | Reducing scope or increasing cost |
| Qualification testing tests… | The **system**, not just the software |
| The 3 high-level project phases | Feasibility → Planning → Execution |
