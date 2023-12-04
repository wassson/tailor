#!/usr/bin/env node
import 'dotenv/config';
import { openPullRequests } from './github';
const { Command } = require("commander"); // add this line
const program = new Command();
program
    .version("1.0.0-alpha.1")
    .description("An AI code reviewer for GitHub pull requests")
    .option("-l, --ls", "List open pull requests")
    .option("-r <value>, --review <value>", "Review pull request")
    .option("-d <value>, --describe <value>", "Describe pull request")
    .parse(process.argv);
const options = program.opts();
if (options.ls) {
    const response = await openPullRequests();
    // Example response for command: tailorai -l
    response.data.forEach((repo) => {
        console.log(`${repo.head.ref} #${repo.number} - ${repo.title}`);
    });
}
if (options.review || options.r) {
    console.log("review");
}
if (options.describe || options.d) {
    console.log("describe");
}
//# sourceMappingURL=index.js.map