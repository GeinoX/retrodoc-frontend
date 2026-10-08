export interface OfficerActionResponse {
  detail: string;
  status?: string;
  possible_matches?: number;
  report?: unknown;
}

export interface HandoverAttempt {
  id: number;
  lost_report: number;
  officer: number;
  result: "released" | "refused";
  proof_shown: string;
  note: string;
  attempt_number: number;
  created_at: string;
}