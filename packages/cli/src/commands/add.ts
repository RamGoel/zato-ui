import path from "path";
import chalk from "chalk";
import ora from "ora";
import prompts from "prompts";
import {
  registry,
  getComponent,
  getAllComponents,
  resolveDependencies,
} from "../registry.js";
import {
  writeFile,
  fileExists,
  installDependencies,
  runShadcnAdd,
  getProjectRoot,
  hasUtilsFile,
  fetchComponent,
  appendCssToGlobals,
} from "../utils.js";

export async function add(componentNames: string[]) {
  if (componentNames.length === 0) {
    const choices = getAllComponents().map((name) => ({
      title: registry[name].name,
      description: registry[name].description,
      value: name,
    }));

    const response = await prompts({
      type: "multiselect",
      name: "components",
      message: "Which components would you like to add?",
      choices,
      hint: "Space to select, Enter to confirm",
    });

    if (!response.components || response.components.length === 0) {
      console.log(chalk.yellow("No components selected."));
      return;
    }

    componentNames = response.components;
  }

  const invalid = componentNames.filter((name) => !getComponent(name));
  if (invalid.length > 0) {
    console.log(chalk.red(`Unknown components: ${invalid.join(", ")}`));
    console.log(chalk.gray(`Available: ${getAllComponents().join(", ")}`));
    return;
  }

  const hasUtils = await hasUtilsFile();
  if (!hasUtils) {
    console.log(
      chalk.yellow(
        "Warning: lib/utils.ts not found. Run `npx shadcn@latest init` first."
      )
    );
    const { proceed } = await prompts({
      type: "confirm",
      name: "proceed",
      message: "Continue anyway?",
      initial: false,
    });
    if (!proceed) return;
  }

  const allComponents = new Set<string>();
  const allNpmDeps = new Set<string>();
  const allShadcnDeps = new Set<string>();
  const allCssSnippets: string[] = [];

  for (const name of componentNames) {
    const resolved = resolveDependencies(name);
    resolved.components.forEach((c) => allComponents.add(c));
    resolved.npmDeps.forEach((d) => allNpmDeps.add(d));
    resolved.shadcnDeps.forEach((s) => allShadcnDeps.add(s));
    allCssSnippets.push(...resolved.cssSnippets);
  }

  console.log();
  console.log(chalk.bold("Components to install:"));
  allComponents.forEach((c) => console.log(chalk.cyan(`  - ${c}`)));

  if (allNpmDeps.size > 0) {
    console.log(chalk.bold("\nNPM dependencies:"));
    allNpmDeps.forEach((d) => console.log(chalk.gray(`  - ${d}`)));
  }

  if (allShadcnDeps.size > 0) {
    console.log(chalk.bold("\nshadcn/ui components:"));
    allShadcnDeps.forEach((s) => console.log(chalk.gray(`  - ${s}`)));
  }

  console.log();
  const { confirm } = await prompts({
    type: "confirm",
    name: "confirm",
    message: "Proceed with installation?",
    initial: true,
  });

  if (!confirm) {
    console.log(chalk.yellow("Cancelled."));
    return;
  }

  if (allShadcnDeps.size > 0) {
    const spinner = ora("Installing shadcn/ui components...").start();
    try {
      await runShadcnAdd(Array.from(allShadcnDeps));
      spinner.succeed("shadcn/ui components installed");
    } catch (error) {
      spinner.fail("Failed to install shadcn/ui components");
      console.log(
        chalk.yellow(`Run manually: npx shadcn@latest add ${Array.from(allShadcnDeps).join(" ")}`)
      );
    }
  }

  if (allNpmDeps.size > 0) {
    const spinner = ora("Installing npm dependencies...").start();
    try {
      await installDependencies(Array.from(allNpmDeps));
      spinner.succeed("NPM dependencies installed");
    } catch (error) {
      spinner.fail("Failed to install dependencies");
      console.log(
        chalk.yellow(`Run manually: npm install ${Array.from(allNpmDeps).join(" ")}`)
      );
    }
  }

  const spinner = ora("Adding components...").start();
  const root = getProjectRoot();

  for (const componentName of allComponents) {
    const destPath = path.join(root, "components/kit", `${componentName}.tsx`);

    if (await fileExists(destPath)) {
      spinner.info(`${componentName}.tsx already exists, skipping`);
      continue;
    }

    try {
      spinner.text = `Fetching ${componentName}...`;
      const content = await fetchComponent(componentName);
      await writeFile(destPath, content);
      spinner.text = `Added ${componentName}.tsx`;
    } catch (error) {
      spinner.fail(`Failed to fetch ${componentName}`);
      throw error;
    }
  }

  spinner.succeed("Components added successfully!");

  if (allCssSnippets.length > 0) {
    const cssSpinner = ora("Adding required CSS...").start();
    const cssAdded = await appendCssToGlobals(allCssSnippets);
    if (cssAdded) {
      cssSpinner.succeed("CSS added to globals.css");
    } else {
      cssSpinner.warn("Could not find globals.css - add CSS manually:");
      allCssSnippets.forEach((snippet) => console.log(chalk.gray(snippet)));
    }
  }

  console.log();
  console.log(chalk.green("✓ Done!"));
  console.log();
  console.log(chalk.gray("Import example:"));
  const firstComponent = componentNames[0];
  const comp = getComponent(firstComponent)!;
  const importName = comp.name.replace(/\s/g, "");
  console.log(
    chalk.cyan(
      `  import { ${importName} } from "@/components/kit/${firstComponent}"`
    )
  );
}
