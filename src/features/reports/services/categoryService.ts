import apiClient from "../../../lib/apiClient";
import type { DocumentCategory } from "../types";

export async function getDocumentCategories(): Promise<DocumentCategory[]> {
  const response = await apiClient.get<
    DocumentCategory[] | { results: DocumentCategory[] }
  >("/documents/categories/");

  return Array.isArray(response.data)
    ? response.data
    : response.data.results;
}