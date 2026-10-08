export const NAV_ITEMS = [
  {
    key: "overview",
    to: "/dashboard",
    end: true,
  },
  {
    key: "reports",
    to: "/dashboard/reports",
    roles: ["C", "O", "A"],
  },
  {
    key: "found",
    to: "/found",
    roles: ["C", "O", "A"],
  },
  {
    key: "lost",
    to: "/lost",
    roles: ["C", "O", "A"],
  },
  {
    key: "matches",
    to: "/dashboard/matches",
    roles: ["C"],
  },
  {
    key: "account",
    to: "/dashboard/account",
    roles: ["C", "O", "A"],
  },
  {
    key: "help",
    to: "/dashboard/help",
    roles: ["C", "O", "A"],
  },

  // Officer / Admin
  {
    key: "deposits",
    to: "/dashboard/deposits",
    roles: ["O", "A"],
  },
  {
    key: "claims",
    to: "/dashboard/claims",
    roles: ["O", "A"],
  },
  {
    key: "records",
    to: "/dashboard/records",
    roles: ["O", "A"],
  },
] as {
  key: string;
  to: string;
  end?: boolean;
  roles?: string[];
}[];