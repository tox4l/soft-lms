import type { CPMNetworkData } from "@/components/visuals/CPMNetwork";

// EXAMPLE 1 — slides 9–13, zero-indexed weeks, critical path A → C → G → H, 18 weeks
export const example1: CPMNetworkData = {
  title: "Worked Example 1 — 8 activities, weeks",
  unit: "weeks",
  indexing: "zero",
  cols: 4,
  rows: 3,
  duration: 18,
  criticalPath: ["A", "C", "G", "H"],
  nodes: [
    { id: "A", name: "A", duration: 7, preds: [],          ES: 0,  EF: 7,  LS: 0,  LF: 7,  float: 0, critical: true,  col: 0, row: 0 },
    { id: "B", name: "B", duration: 3, preds: [],          ES: 0,  EF: 3,  LS: 7,  LF: 10, float: 7, critical: false, col: 0, row: 1 },
    { id: "C", name: "C", duration: 6, preds: ["A"],       ES: 7,  EF: 13, LS: 7,  LF: 13, float: 0, critical: true,  col: 1, row: 0 },
    { id: "D", name: "D", duration: 3, preds: ["B"],       ES: 3,  EF: 6,  LS: 10, LF: 13, float: 7, critical: false, col: 1, row: 1 },
    { id: "F", name: "F", duration: 2, preds: ["B"],       ES: 3,  EF: 5,  LS: 11, LF: 13, float: 8, critical: false, col: 1, row: 2 },
    { id: "G", name: "G", duration: 3, preds: ["C"],       ES: 13, EF: 16, LS: 13, LF: 16, float: 0, critical: true,  col: 2, row: 0 },
    { id: "E", name: "E", duration: 3, preds: ["D", "F"],  ES: 6,  EF: 9,  LS: 13, LF: 16, float: 7, critical: false, col: 2, row: 1 },
    { id: "H", name: "H", duration: 2, preds: ["E", "G"],  ES: 16, EF: 18, LS: 16, LF: 18, float: 0, critical: true,  col: 3, row: 0 },
  ],
};

// EXAMPLE 2 — slides 14–17, 1-indexed days, critical path B → E → I, 25 days
// (slack column shown; "float" field reuses it)
export const example2: CPMNetworkData = {
  title: "Worked Example 2 — 1-indexed days",
  unit: "days",
  indexing: "one",
  cols: 3,
  rows: 4,
  duration: 25,
  criticalPath: ["B", "E", "I"],
  nodes: [
    { id: "A", name: "A", duration: 12, preds: [],         ES: 1,  EF: 12, LS: 4,  LF: 15, float: 3, critical: false, col: 0, row: 0 },
    { id: "B", name: "B", duration: 3,  preds: [],         ES: 1,  EF: 3,  LS: 1,  LF: 3,  float: 0, critical: true,  col: 0, row: 2 },
    { id: "C", name: "C", duration: 14, preds: [],         ES: 1,  EF: 14, LS: 4,  LF: 17, float: 3, critical: false, col: 0, row: 3 },
    { id: "D", name: "D", duration: 4,  preds: ["A", "B"], ES: 13, EF: 16, LS: 16, LF: 19, float: 3, critical: false, col: 1, row: 0 },
    { id: "E", name: "E", duration: 17, preds: ["B"],      ES: 4,  EF: 20, LS: 4,  LF: 20, float: 0, critical: true,  col: 1, row: 2 },
    { id: "F", name: "F", duration: 3,  preds: ["C"],      ES: 15, EF: 17, LS: 18, LF: 20, float: 3, critical: false, col: 1, row: 3 },
    { id: "G", name: "G", duration: 6,  preds: ["D"],      ES: 17, EF: 22, LS: 20, LF: 25, float: 3, critical: false, col: 2, row: 0 },
    { id: "H", name: "H", duration: 2,  preds: ["D"],      ES: 17, EF: 18, LS: 24, LF: 25, float: 7, critical: false, col: 2, row: 1 },
    { id: "I", name: "I", duration: 5,  preds: ["E", "F"], ES: 21, EF: 25, LS: 21, LF: 25, float: 0, critical: true,  col: 2, row: 2 },
    { id: "J", name: "J", duration: 1,  preds: ["F"],      ES: 18, EF: 18, LS: 25, LF: 25, float: 7, critical: false, col: 2, row: 3 },
  ],
};

// EXAMPLE 3 — slides 24–29, exercise, zero-indexed weeks, critical path F → G, 13 weeks
export const example3: CPMNetworkData = {
  title: "Worked Example 3 — Hardware/Software project",
  unit: "weeks",
  indexing: "zero",
  cols: 3,
  rows: 4,
  duration: 13,
  criticalPath: ["F", "G"],
  nodes: [
    { id: "A", name: "A", duration: 6,  preds: [],          ES: 0,  EF: 6,  LS: 2,  LF: 8,  float: 2, critical: false, col: 0, row: 0 },
    { id: "B", name: "B", duration: 4,  preds: [],          ES: 0,  EF: 4,  LS: 3,  LF: 7,  float: 3, critical: false, col: 0, row: 1 },
    { id: "F", name: "F", duration: 10, preds: [],          ES: 0,  EF: 10, LS: 0,  LF: 10, float: 0, critical: true,  col: 0, row: 3 },
    { id: "C", name: "C", duration: 3,  preds: ["A"],       ES: 6,  EF: 9,  LS: 8,  LF: 11, float: 2, critical: false, col: 1, row: 0 },
    { id: "D", name: "D", duration: 4,  preds: ["B"],       ES: 4,  EF: 8,  LS: 7,  LF: 11, float: 3, critical: false, col: 1, row: 1 },
    { id: "E", name: "E", duration: 3,  preds: ["B"],       ES: 4,  EF: 7,  LS: 7,  LF: 10, float: 3, critical: false, col: 1, row: 2 },
    { id: "H", name: "H", duration: 2,  preds: ["C", "D"],  ES: 9,  EF: 11, LS: 11, LF: 13, float: 2, critical: false, col: 2, row: 0 },
    { id: "G", name: "G", duration: 3,  preds: ["E", "F"],  ES: 10, EF: 13, LS: 10, LF: 13, float: 0, critical: true,  col: 2, row: 3 },
  ],
};
