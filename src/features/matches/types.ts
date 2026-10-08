import type { Report } from "../reports/types";

export interface MatchResponse {
  matched: boolean;
  match_count?: number;
  report?: Report;
  detail?: string;
}

export interface MatchActionResponse {
  detail: string;
  report?: Report;
  collection_code?: string;
}