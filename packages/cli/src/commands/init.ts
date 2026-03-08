import chalk from "chalk";
import ora from "ora";
import prompts from "prompts";
import { hasUtilsFile, runShadcnAdd } from "../utils.js";

export async function init() {
  console.log();
  console.log(chalk.bold("Initialize zato\n"));

  const hasUtils = await hasUtilsFile();

  if (!hasUtils) {
    console.log(chalk.yellow("shadcn/ui not detected in this project.\n"));

    const { setupShadcn } = await prompts({
      type: "confirm",
      name: "setupShadcn",
      message: "Would you like to set up shadcn/ui first?",
      initial: true,
    });

    if (setupShadcn) {
      console.log();
      console.log(chalk.gray("Run the following command:"));
      console.log(chalk.cyan("\n  npx shadcn@latest init\n"));
      console.log(chalk.gray("Then run `zato init` again.\n"));
      return;
    }
  } else {
    console.log(chalk.green("✓ shadcn/ui detected\n"));
  }

  console.log(chalk.gray("You're all set! Add components with:\n"));
  console.log(chalk.cyan("  zato add user-message"));
  console.log(chalk.cyan("  zato add agent-message"));
  console.log(chalk.cyan("  zato add typing-indicator\n"));

  console.log(chalk.gray("Or browse all components:\n"));
  console.log(chalk.cyan("  zato list\n"));
}
