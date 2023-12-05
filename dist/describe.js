#!/usr/bin/env node
import 'dotenv/config';
import { Command } from "commander";
import { pullRequestDiff } from './github/index.js';
import { ollamaPrompt } from './ollama/index.js';
// CLI
const describe = new Command();
describe
    .version("0.0.3")
    .description("Analyze a pull request and push a summary to the pull request on GitHub.")
    .argument('<value>', 'Pull request number')
    .parse(process.argv);
const pullRequestNumber = describe.args[0];
// Execution
const main = async () => {
    const response = await pullRequestDiff(pullRequestNumber);
    if (response.status == 200) {
        const promptResponse = await ollamaPrompt(response.data);
    }
    else {
        console.log({ status: response.status, message: response.data });
    }
};
main();
