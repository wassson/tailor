# Tailor

Tailor is an open-source AI code reviewer for GitHub pull requests built on Typescript & Ollama. Push pull request reviews and descriptions from the command line. 

### Install
To test locally, clone the repo and run:
```
npm install -g .
```
Then:
```
cp .env.example .env
```
You will need to set the following env variables:
```
# GitHub username
GITHUB_LOGIN=
# Username if working on a repo you own, otherwise repo owner
GITHUB_OWNER=
# Repository owned by the owner set above
GITHUB_REPOSITORY=
# Personal Access Token
GITHUB_PAT=
```

### Commands
The below command lists all open PRs created by the user set in the `GITHUB_LOGIN` environment variable with a format of: `#pr-number branch-name - PR Title`
```
open-pulls

--------------------
# example response

#8 feature-slack-auth - Integrate Slack w/ Oauth 2.0
#9 fix-tooltip-wrapper - Fix non-fading tooltip bug
```

### In-progress commands
Create and push a PR review
```
review <pr-number>
```
Create and push a PR description
```
describe <pr-number>
```

### Ollama
[Installation directions](https://github.com/jmorganca/ollama)


## Roadmap

I am currently working to port over the work I've already completed in my initial project (read below), but for now:

1. **CLI** 
  * ✅ `tailorai` npm package.
  * ✅ Generate CLI commands with `commander`.
  * ✅ Get a list of open PRs by executing `open-pulls` to reduce the cumbersome nature of searching for PR numbers. Response is a list with the format: `#pr-number branch-name - PR Title`.
  * Trigger a review by executing `review [pull request number]`.
  * Add PR description with `describe [pull request number]`.
    - Should the describe command response be editable before pushing to GH?
2. **Diff parser & GitHub API**
  * Currently porting over a custom diff parser that will interact with the Ollama models.
  * Diff API.
3. **Customization**
  * Allow users to choose what model (including custom models) reviews their code.
  * Implement something similar to `.gitignore` ignore code that should never be reviewed.
4. **Retrieval Augmented Generation**
  * Implement RAG (with Pinecone?) to provide Tailor with additional context from the codebase it is installed on.
5. **Repo quality of life**
  * ✅ GitHub Action for publishing to npm.
  * Test suite.
  * Split roadmap into it's own `.md` file.
  * Refactor `index.ts`.
  * Branch protection.

## History 

### Rails/NextJS & OpenAI

For several months I've experimented with building a full-fledged web app in different ecosystems (NextJS & Rails). I had achieved my goal of building a code review platform that could: (1) review pull request diffs, or even allow devs to push straight to ```main``` and identify issues before deploys, (2) provide a simple UI with a fine-grain toolset for reviewing even the smallest of diff chunks, and (3) remain flexible enough to support any GitHub workflow. The real challenge remained in keeping the use of OpenAI's API cost-effective, and is a challenge I found few solutions for as PR diffs can be quite large.

With GitHub's recent release of their own code review tools, I believe it makes more sense to pivot and build something that doesn't need to compete! The ecosystem of free, open-source AI tools has grown tremendously in 2023, and I'm hoping Tailor will join the current cadre as an effective tool that empowers developers to build well and build quickly - for free. 

### Pivoting with Ollama

We use APIs like OpenAI's because it's nearly impossible to host Large Language Models without serious funding and complex tooling, but tools like ```Ollama``` and ```Langchain``` make this possible on local machines with a few gigs (2GB-70GB depending on the model lol) of extra space. Continuing with the web app paradigm would mean running at least two servers (Tailor & Ollama) on top of any other servers required for your own development. By pivoting away from a web app (ultimately losing the UI) and instead focusing on an installable package with command line tools, we reduce the complexity needed to run the app by a significant amount. 

## Enterprise

I am working on a more robust team solution as well. If you are interested in discussing possible solutions for specific use cases, please email me at ```austin@fgai.dev```.