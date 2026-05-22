# SOFT2301 — Week 3 (Part B): Critical Path Method — Full Worked Examples

> **Exam framing:** This is where points are won or lost. You **will** be given an activity table and asked to draw the network, do the forward & backward pass, compute float, and state the critical path & project duration. Below are **all three worked examples** from the slides, reconstructed step-by-step. Master the procedure once and every variant becomes mechanical.

---

## 1. CPM Node Convention (Activity-on-Node)

Each activity is a box. **Two layouts appear in this course — know both.**

### Layout used in Example 1 & 2 (slides 7–13)

```
+--------------------+
| ES    |     |  EF  |   ES = Early Start    EF = Early Finish
|     Activity name   |   LS = Late Start     LF = Late Finish
|     (duration)      |
| LS    |     |  LF  |
+--------------------+
```
- **Relationships are arrows:** `A → B` means *Activity A occurs before Activity B.*

### Layout used in the Exercise (slides 25–29)

```
+----------------------+
| ES | duration |  EF  |   top row    = ES | dur | EF
|   Activity name      |
| LS |  float   |  LF  |   bottom row = LS | float | LF
+----------------------+
```

> Don't mix them up under exam pressure — **check which corner holds LS/LF before you write.**

---

## 2. The CPM Procedure (7 steps — memorize this order)

1. **Identify** the activities.
2. **Determine the sequence** of the activities (predecessors/successors).
3. **Create a network diagram** by connecting activities based on predecessor/successor relationships.
4. **Enter the completion time** (duration) for every activity on the nodes.
5. **Forward pass** → identify **Early Start (ES)** and **Early Finish (EF)**.
6. **Backward pass** → identify **Late Start (LS)** and **Late Finish (LF)**.
7. **Identify the float and the critical path.**

**The arithmetic rules (zero-indexed version, used in Examples 1 & exercise):**

| Pass | Rule |
|---|---|
| Forward — EF | **EF = ES + duration** |
| Forward — ES | **ES = max(EF of all predecessors)**; start activities have ES = 0 |
| Backward — LS | **LS = LF − duration** |
| Backward — LF | **LF = min(LS of all successors)**; end activities have LF = project duration |
| Float | **Total Float = LS − ES = LF − EF** |
| Critical path | The chain of activities with **float = 0** |

---

## 3. ⭐ WORKED EXAMPLE 1 (slides 9–13)

### Activity table

| Activity | Duration (weeks) | Predecessor(s) |
|---|---|---|
| A | 7 | — |
| B | 3 | — |
| C | 6 | A |
| D | 3 | B |
| E | 3 | D, F |
| F | 2 | B |
| G | 3 | C |
| H | 2 | E, G |

### Forward pass (ES / EF) — left to right

| Activity | ES (= max pred EF) | EF (= ES + dur) |
|---|---|---|
| A | 0 | 7 |
| B | 0 | 3 |
| C | 7 (after A) | 13 |
| D | 3 (after B) | 6 |
| F | 3 (after B) | 5 |
| E | **6** = max(EF D 6, EF F 5) | 9 |
| G | 13 (after C) | 16 |
| H | **16** = max(EF E 9, EF G 16) | 18 |

**Project duration = 18 weeks.**

### Backward pass (LS / LF) — right to left

| Activity | LF (= min succ LS) | LS (= LF − dur) |
|---|---|---|
| H | 18 (project end) | 16 |
| G | 16 (= LS H) | 13 |
| E | 16 (= LS H) | 13 |
| F | 13 (= LS E) | 11 |
| D | 13 (= LS E) | 10 |
| C | 13 (= LS G) | 7 |
| B | **10** = min(LS D 10, LS F 11) | 7 |
| A | 7 (= LS C) | 0 |

### Float & critical path

| Activity | ES | EF | LS | LF | Float (LS−ES) | Critical? |
|---|---|---|---|---|---|---|
| A | 0 | 7 | 0 | 7 | **0** | ✅ |
| B | 0 | 3 | 7 | 10 | 7 | |
| C | 7 | 13 | 7 | 13 | **0** | ✅ |
| D | 3 | 6 | 10 | 13 | 7 | |
| E | 6 | 9 | 13 | 16 | 7 | |
| F | 3 | 5 | 11 | 13 | 8 | |
| G | 13 | 16 | 13 | 16 | **0** | ✅ |
| H | 16 | 18 | 16 | 18 | **0** | ✅ |

> **CRITICAL PATH = A → C → G → H. Project duration = 18 weeks.** (7 + 6 + 3 + 2 = 18.)

---

## 4. ⭐ WORKED EXAMPLE 2 — Tabular Method (slides 14–17)

> ⚠️ This example uses a **1-indexed, day-based** convention: **FINISH = START + TIME − 1.** So when an activity finishes on day *n*, its successor starts on day *n + 1*.

### Activity table

| Task | Time (days) | Predecessor(s) |
|---|---|---|
| A | 12 | — |
| B | 3 | — |
| C | 14 | — |
| D | 4 | A, B |
| E | 17 | B |
| F | 3 | C |
| G | 6 | D |
| H | 2 | D |
| I | 5 | E, F |
| J | 1 | F |

### Forward pass — Early Start / Early Finish (EF = ES + Time − 1)

| Task | ES (= max pred EF + 1) | EF |
|---|---|---|
| A | 1 | 12 |
| B | 1 | 3 |
| C | 1 | 14 |
| D | 13 = max(EF A 12, EF B 3) + 1 | 16 |
| E | 4 = EF B 3 + 1 | 20 |
| F | 15 = EF C 14 + 1 | 17 |
| G | 17 = EF D 16 + 1 | 22 |
| H | 17 = EF D 16 + 1 | 18 |
| I | 21 = max(EF E 20, EF F 17) + 1 | 25 |
| J | 18 = EF F 17 + 1 | 18 |

**Project finishes at day 25 (END = 25).**

### Backward pass — Late Start / Late Finish (LS = LF − Time + 1)

| Task | LF (= min succ LS − 1) | LS |
|---|---|---|
| I | 25 | 21 |
| G | 25 | 20 |
| H | 25 | 24 |
| J | 25 | 25 |
| E | 20 = LS I 21 − 1 | 4 |
| F | 20 = min(LS I 21, LS J 25) − 1 | 18 |
| D | 19 = min(LS G 20, LS H 24) − 1 | 16 |
| A | 15 = LS D 16 − 1 | 4 |
| C | 17 = LS F 18 − 1 | 4 |
| B | 3 = min(LS D 16, LS E 4) − 1 | 1 |

### Slack & critical path (Slack = LS − ES)

| Task | ES | EF | LS | LF | Slack | Critical? |
|---|---|---|---|---|---|---|
| A | 1 | 12 | 4 | 15 | 3 | |
| B | 1 | 3 | 1 | 3 | **0** | ✅ |
| C | 1 | 14 | 4 | 17 | 3 | |
| D | 13 | 16 | 16 | 19 | 3 | |
| E | 4 | 20 | 4 | 20 | **0** | ✅ |
| F | 15 | 17 | 18 | 20 | 3 | |
| G | 17 | 22 | 20 | 25 | 3 | |
| H | 17 | 18 | 24 | 25 | 7 | |
| I | 21 | 25 | 21 | 25 | **0** | ✅ |
| J | 18 | 18 | 25 | 25 | 7 | |

> **CRITICAL PATH = B → E → I. Project duration = 25 days.** (3 + 17 + 5 = 25.) Rule restated on the slide: **"Slack = 0 is Critical Path."**

---

## 5. ⭐ WORKED EXAMPLE 3 — The Exercise (slides 24–29)

> Same activity set as Week 3A slide 18. Uses the **ES | dur | EF / LS | float | LF** node layout. Zero-indexed.

### Activity table

| Activity | Description | Duration (weeks) | Predecessor(s) |
|---|---|---|---|
| A | Hardware selection | 6 | — |
| B | Software configuration | 4 | — |
| C | Install hardware | 3 | A |
| D | Data migration | 4 | B |
| E | Draft office procedures | 3 | B |
| F | Recruit staff | 10 | — |
| G | User training | 3 | E, F |
| H | Install and test | 2 | C, D |

### Forward pass

| Activity | ES | EF |
|---|---|---|
| A | 0 | 6 |
| B | 0 | 4 |
| F | 0 | 10 |
| C | 6 (after A) | 9 |
| D | 4 (after B) | 8 |
| E | 4 (after B) | 7 |
| G | **10** = max(EF E 7, EF F 10) | 13 |
| H | **9** = max(EF C 9, EF D 8) | 11 |

**Project duration = 13 weeks** (max of EF G 13 and EF H 11).

### Backward pass

| Activity | LF | LS |
|---|---|---|
| G | 13 | 10 |
| H | 13 | 11 |
| C | 11 (= LS H) | 8 |
| D | 11 (= LS H) | 7 |
| E | 10 (= LS G) | 7 |
| F | 10 (= LS G) | 0 |
| A | 8 (= LS C) | 2 |
| B | **7** = min(LS D 7, LS E 7) | 3 |

### Float & critical path

| Activity | ES | EF | LS | LF | Float | Critical? |
|---|---|---|---|---|---|---|
| A | 0 | 6 | 2 | 8 | 2 | |
| B | 0 | 4 | 3 | 7 | 3 | |
| C | 6 | 9 | 8 | 11 | 2 | |
| D | 4 | 8 | 7 | 11 | 3 | |
| E | 4 | 7 | 7 | 10 | 3 | |
| F | 0 | 10 | 0 | 10 | **0** | ✅ |
| G | 10 | 13 | 10 | 13 | **0** | ✅ |
| H | 9 | 11 | 11 | 13 | 2 | |

> **CRITICAL PATH = F → G. Project duration = 13 weeks.** (10 + 3 = 13.) The slide states it outright: **"Critical Path: F – G."**

---

## 6. Float / Slack — Deep Reference

**Definition:** the amount of time an activity can be **delayed without delaying the project.**

| Float type | Definition | Formula |
|---|---|---|
| **Free float** | Time a task can be delayed **without delaying a successor task** | ES(next) − EF(current) |
| **Total float** | Time a task can be delayed **without delaying project completion** | LF − EF, or LS − ES |

**Float can be:**

| Sign | When |
|---|---|
| **Positive** | Most often (activity has spare time) |
| **Negative** | When **lead time is required** (you're already behind) |
| **Zero** | Activities **on the critical path** |

---

## 7. Critical Path — Formal Restatement

- The **earliest time** the project can be completed.
- The critical path is **a path through the network with no slack/float.**
- There is **at least one path** through the network that defines the project's duration.
- **Any delay to any activity on the critical path delays the whole project.**
- (A network can have **more than one** critical path if multiple paths tie for longest.)

---

## 8. Critical Chain Method

**Definition:** A project management technique that **improves delivery reliability** by focusing on **resource constraints** and protecting the schedule with **shared buffers** instead of padding every task individually.

| Feature | |
|---|---|
| Modifies the schedule | When **resources are limited** |
| Uses **duration buffers** | Extra time added to manage uncertainty |
| **Project buffers** | Added to the **end of the project** |
| **Feeding buffers** | Added to the **end of an activity** (where a feeding path joins the critical chain) |

> CPM vs Critical Chain: CPM assumes unlimited resources & pads tasks; Critical Chain accounts for **resource limits** and uses **aggregated buffers**.

---

## 9. Resource Leveling

**Definition:** Adjusting a project schedule so that **resource demand does not exceed resource availability** — even if that means **delaying tasks or extending project duration.**

| Feature | |
|---|---|
| Applied to | A schedule already developed using **CPM** |
| What it does | **Spreads out resources** to make usage more **even** |
| When needed | Resources are **over-allocated and limited** |
| Side effect | **May change the critical path** |

---

## 10. Schedule Compression

**Definition:** Shortening the project schedule **without changing the project scope.** Two techniques:

| Technique | How it works | Risk |
|---|---|---|
| **Crashing** | Shorten activity duration for the **least incremental cost** (overtime, adding resources, paying to expedite delivery) | Increased cost |
| **Fast tracking** | Shorten duration by doing activities **in parallel** rather than sequentially (only works if activities **can overlap**) | **Increased risk and potential rework** |

> Both add risk. **Crashing buys time with money; fast-tracking buys time with parallelism (and rework risk).**

---

## 11. Schedule Baseline & Project Schedule Forms

**Schedule baseline:** a version of the project schedule that is **accepted and approved**, used for **comparison** (planned start/finish vs actual start/finish).

**Project schedules** include activities + planned start/finish dates, and can be presented as:

| Form | Examples |
|---|---|
| **Tabular form** | Milestone schedule |
| **Graphical form** | **Bar charts (e.g. Gantt)**, **Network diagrams** |

---

## ⚡ Rapid-Fire Self-Test

| Question | Answer |
|---|---|
| The 7 CPM steps end with… | Identify the float and critical path |
| Forward pass computes… | ES and EF (left → right) |
| Backward pass computes… | LS and LF (right → left) |
| ES rule at a merge | max(EF of all predecessors) |
| LF rule at a burst | min(LS of all successors) |
| Total float formula | LS − ES (= LF − EF) |
| Critical path activities have float = | 0 |
| Example 1 critical path & duration | A→C→G→H, 18 weeks |
| Example 2 critical path & duration | B→E→I, 25 days |
| Exercise critical path & duration | F→G, 13 weeks |
| Float can be negative when… | Lead time is required |
| Crashing vs fast-tracking | Add cost/resources vs run activities in parallel |
| Project buffer vs feeding buffer | End of project vs end of a feeding activity |
| Resource leveling may… | Change the critical path / extend duration |
| Schedule compression changes scope? | No — it shortens schedule **without** changing scope |
| Two graphical schedule forms | Gantt (bar chart) & network diagram |
