#!/usr/bin/env node
import { Command } from "commander";
// CLI
const program = new Command();
program
    .version("0.0.2")
    .description("Analyze a pull request and push a summary to the pull request on GitHub.")
    .parse(process.argv);
// Execution
const main = async () => {
    console.log("Describing PR...");
};
main();
//# sourceMappingURL=describe.js.map