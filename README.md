# Tailor

Tailor is an open-source AI code reviewer for GitHub pull requests built on Typescript & Ollama.

Install with 
```
$ bun -i tailorai
```

## History 

### Rails/NextJS & OpenAI

For several months I've experimented with building a full-fledged web app in different ecosystems (NextJS & Rails). I had achieved my goal of building a code review platform that could: (1) review pull request diffs, or even allow devs to push straight to ```main``` and identify issues before deploys, (2) provide a simple UI with a fine-grain toolset for reviewing even the smallest of diff chunks, and (3) remain flexible enough to support any GitHub workflow. The real challenge remained in keeping the use of OpenAI's API cost-effective, and is a challenge I found few solutions for as PR diffs can be quite large.

With GitHub's recent release of their own code review tools, I believe it makes more sense to pivot and build something that doesn't need to compete! The ecosystem of free, open-source AI tools has grown tremendously in 2023, and I'm hoping Tailor will join the current cadre as an effective tool that empowers developers to build well and build quickly - for free. 

### Pivoting with Ollama

We use APIs like OpenAI's because it's nearly impossible to host Large Language Models without serious funding and complex tooling, but tools like ```Ollama``` and ```Langchain``` make this possible on local machines with a few gigs (2GB-70GB depending on the model lol) of extra space. Continuing with the web app paradigm would mean running at least two servers (Tailor & Ollama) on top of any other servers required for your own development. By pivoting away from a web app (ultimately losing the UI) and instead focusing on an installable package with command line tools, we reduce the complexity needed to run the app by a significant amount. 

### The Goal & Roadmap

I am currently working to port over the work I've already completed in my initial project, but for now:

1. CLI 
  * Install ```tailorai``` on any project with access to JS tooling.
  * Trigger a review by executing ```tailorai -r [pull request number]```.
  * Get a list of open PRs by executing ```tailorai -l``` to reduce the cumbersome nature of searching for PR numbers.
2. Customization
  * Allow users to choose what model (including custom models) reviews their code.
  * Implement something similar to ```.gitignore``` to improve performace.
3. Retrieval Augmented Generation
  * Implement RAG (with Pinecone?) to provide Tailor with additional context from the codebase it is installed on.


## Enterprise

I am working on a more robust team solution as well. If you are interested in discussing possible solutions for specific use cases, please email me at ```austin@fgai.dev```.