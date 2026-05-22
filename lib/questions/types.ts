export type MCQ = {
  id: string;
  q: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  explain: string;
  topic?: string;
};
