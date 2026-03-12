import path from "path";
import chalk from "chalk";
import ora from "ora";
import { writeFile, fileExists, getProjectRoot } from "../utils.js";

const SKILL_URL =
  "https://raw.githubusercontent.com/RamGoel/zato-ui/main/.cursor/skills/build-with-zato/SKILL.md";

const SKILL_REL_PATH = ".cursor/skills/build-with-zato/SKILL.md";

export async function addSkill(opts: { overwrite?: boolean }) {
  const root = getProjectRoot();
  const destPath = path.join(root, SKILL_REL_PATH);

  if (!opts.overwrite && (await fileExists(destPath))) {
    console.log(chalk.yellow("Agent skill already installed."));
    console.log(chalk.gray(`  ${SKILL_REL_PATH}`));
    console.log(chalk.gray("Run with --overwrite to replace it."));
    return;
  }

  const spinner = ora("Downloading agent skill...").start();

  try {
    const response = await fetch(SKILL_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch skill: ${response.statusText}`);
    }

    const content = await response.text();
    await writeFile(destPath, content);

    spinner.succeed("Agent skill installed");
    console.log(chalk.gray(`  ${SKILL_REL_PATH}`));
  } catch (error) {
    spinner.fail("Failed to install agent skill");
    throw error;
  }
}
