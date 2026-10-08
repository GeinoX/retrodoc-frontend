export type FoundReportStatus =
  | "awaiting_drop_off"
  | "at_station"
  | "owner_may_be_found"
  | "returned_to_owner"
  | "unclaimed"
  | "drop_off_declined";

export type LostReportStatus =
  | "searching"
  | "possible_match"
  | "awaiting_collection"
  | "collected"
  | "closed"
  | "expired";

export interface DocumentCategory {
  id: number;
  code: string;
  name_en: string;
  name_fr: string;
  display_order: number;
  is_active: boolean;
}

export interface Report {
  id?: number;
  reference: string;
  title: string;
  category: number | DocumentCategory;

  name_on_document: string;
  document_number: string;
  date_of_birth: string | null;
  issue_date: string | null;
  issuing_organisation: string;

  region: number | null;
  place_detail: string;

  date_lost?: string;
  date_found?: string;

  status: FoundReportStatus | LostReportStatus;

  station?: number | {
    id: number;
    name: string;
  };

  matched_found_report?: Report | null;
  collection_code?: string | null;
  officer_confirmed?: boolean;
  owner_confirmed?: boolean;

  drop_off_code?: string;

  created_at: string;
  updated_at: string;
}

export interface CreateFoundReportPayload {
  station: number;
  category: number;
  title: string;
  name_on_document?: string;
  document_number?: string;
  date_of_birth?: string | null;
  issue_date?: string | null;
  issuing_organisation?: string;
  region?: number | null;
  place_detail?: string;
  date_found: string;
}

export interface CreateLostReportPayload {
  category: number;
  title: string;
  name_on_document?: string;
  document_number?: string;
  date_of_birth?: string | null;
  issue_date?: string | null;
  issuing_organisation?: string;
  region?: number | null;
  place_detail?: string;
  date_lost: string;
}