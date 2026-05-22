export type MCQ = {
  id: string;
  kind?: "mcq";
  q: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  explain: string;
  topic?: string;
};

export type MultiSelectQ = {
  id: string;
  kind: "multi";
  q: string;
  options: string[];        // 4-6 options
  correct: number[];        // indices of all correct options
  explain: string;
  topic?: string;
};

export type FillBlankQ = {
  id: string;
  kind: "fill";
  // The blank is rendered wherever the literal token "_____" appears.
  q: string;
  // Accepted answers (case-insensitive, trimmed). The first one is shown as canonical.
  accept: string[];
  explain: string;
  topic?: string;
};

export type AnyQ = MCQ | MultiSelectQ | FillBlankQ;

export function isMCQ(q: AnyQ): q is MCQ {
  return !q.kind || q.kind === "mcq";
}
export function isMulti(q: AnyQ): q is MultiSelectQ {
  return q.kind === "multi";
}
export function isFill(q: AnyQ): q is FillBlankQ {
  return q.kind === "fill";
}
