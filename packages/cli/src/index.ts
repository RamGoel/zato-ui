#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { add } from "./commands/add.js";
import { list } from "./commands/list.js";
import { init } from "./commands/init.js";

const program = new Command();

program
  .name("zato")
  .description("Add AI chat UI components to your project")
  .version("0.1.0");

program
  .command("init")
  .description("Initialize aui-kit in your project")
  .action(init);

program
  .command("add [components...]")
  .description("Add components to your project")
  .action(add);

program
  .command("list")
  .description("List all available components")
  .action(list);

program.parse();
