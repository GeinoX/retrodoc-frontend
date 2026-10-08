import apiClient from "../../../lib/apiClient";
import type {
  HandoverAttempt,
  OfficerActionResponse,
} from "../types";

export async function confirmDropOff(
  dropOffCode: string,
): Promise<OfficerActionResponse> {
  const response =
    await apiClient.post<OfficerActionResponse>(
      "/found-reports/drop-off/confirm/",
      {
        drop_off_code: dropOffCode,
      },
    );

  return response.data;
}

export async function confirmCollection(
  collectionCode: string,
  proofShown: string,
): Promise<OfficerActionResponse> {
  const response =
    await apiClient.post<OfficerActionResponse>(
      "/lost-reports/collection/officer-confirm/",
      {
        collection_code: collectionCode,
        proof_shown: proofShown,
      },
    );

  return response.data;
}

export async function refuseHandover(payload: {
  collection_code: string;
  proof_shown?: string;
  note?: string;
}) {
  const response = await apiClient.post<OfficerActionResponse>(
    "/handovers/officer/refuse/",
    payload,
  );

  return response.data;
}

export async function getHandoverHistory(): Promise<
  HandoverAttempt[]
> {
  const response = await apiClient.get<
    HandoverAttempt[] | { results: HandoverAttempt[] }
  >("/handovers/my/");

  return Array.isArray(response.data)
    ? response.data
    : response.data.results;
}