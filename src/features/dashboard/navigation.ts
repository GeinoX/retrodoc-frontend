export const NAV_ITEMS = [
  { key: "overview", to: "/dashboard", end: true },
  { key: "reports", to: "/dashboard/reports" },
  { key: "deposits", to: "/dashboard/deposits", roles: ["O"] },
  { key: "claims", to: "/dashboard/claims", roles: ["O"] },
  { key: "records", to: "/dashboard/records", roles: ["officer"] },
] as { key: string; to: string; end?: boolean; roles?: string[] }[];