import chalk from "chalk";
import { registry, getAllComponents } from "../registry.js";

export function list() {
  console.log();
  console.log(chalk.bold("Available components:\n"));

  const components = getAllComponents();

  for (const name of components) {
    const component = registry[name];
    console.log(chalk.cyan(`  ${name}`));
    console.log(chalk.gray(`    ${component.description}`));

    if (component.primitives.length > 0) {
      console.log(chalk.gray(`    Includes: ${component.primitives.join(", ")}`));
    }

    console.log();
  }

  console.log(chalk.gray(`Run ${chalk.cyan("zato add <component>")} to install\n`));
}
