#!/usr/bin/env node
import 'dotenv/config';
import { Octokit } from "@octokit/core";
import { Command } from "commander";
// CLI
const openPulls = new Command();
openPulls
    .version("0.0.3")
    .description("List all open pull requests for the current user.")
    .parse(process.argv);
// GitHub
const octokit = new Octokit({ auth: process.env.GITHUB_PAT });
const openPullRequests = async () => {
    const owner = process.env.GITHUB_OWNER || '';
    const repo = process.env.GITHUB_REPOSITORY || '';
    const author = process.env.GITHUB_LOGIN || '';
    const openPulls = await octokit.request('GET /repos/{owner}/{repo}/pulls?author={author}', {
        owner: owner,
        repo: repo,
        author: author,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    return openPulls;
};
const listPullRequestSummaries = (pullRequests) => {
    pullRequests.data.forEach((pullRequest) => {
        console.log(`#${pullRequest.number} ${pullRequest.head.ref} - ${pullRequest.title}`);
    });
};
// Execution
const main = async () => {
    const response = await openPullRequests();
    if (response.status == 200) {
        listPullRequestSummaries(response);
    }
    else {
        console.log({ status: response.status, message: response.data });
    }
};
main();
