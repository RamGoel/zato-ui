import { getAllComponents } from "./registry";

export interface NavItem {
  href: string;
  name: string;
  status?: "soon";
}

export interface Navigation {
  [section: string]: NavItem[];
}

export function getNavigation(): Navigation {
  const components = getAllComponents();

  const componentLinks = components.map((c) => ({
    href: `/components/${c.slug}`,
    name: c.name,
  }));

  const upcomingComponents = [
    { href: "#", name: "Chat Input", status: "soon" as const },
    { href: "#", name: "Streaming Text", status: "soon" as const },
    { href: "#", name: "Code Block", status: "soon" as const },
    { href: "#", name: "Typing Indicator", status: "soon" as const },
  ];

  return {
    "Getting Started": [
      { href: "/", name: "Introduction" },
    ],
    Components: [...componentLinks, ...upcomingComponents],
  };
}
