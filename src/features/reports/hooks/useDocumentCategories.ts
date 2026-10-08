import { useQuery } from "@tanstack/react-query";
import { getDocumentCategories } from "../services/categoryService";

export function useDocumentCategories() {
  return useQuery({
    queryKey: ["document-categories"],
    queryFn: getDocumentCategories,
    staleTime: 10 * 60 * 1000,
  });
}