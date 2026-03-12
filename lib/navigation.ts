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
  const allComponents = getAllComponents();

  const components = allComponents
    .filter((c) => c.category === "components")
    .map((c) => ({
      href: `/components/${c.slug}`,
      name: c.name,
    }));

  const primitives = allComponents
    .filter((c) => c.category === "primitives")
    .map((c) => ({
      href: `/components/${c.slug}`,
      name: c.name,
    }));

  return {
    "Getting Started": [
      { href: "/", name: "Introduction" },
      { href: "/skills", name: "Agent Skills" },
    ],
    Components: components,
    Primitives: primitives,
  };
}
