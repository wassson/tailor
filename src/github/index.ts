import { Octokit } from "@octokit/core"

const octokit = new Octokit({ auth: process.env.GITHUB_PAT })

export const pullRequestDiff = async (number: string) => {
  const owner = process.env.GITHUB_OWNER || ''
  const repo = process.env.GITHUB_REPOSITORY || ''

  
  const response = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}.diff', {
    owner: owner,
    repo: repo,
    pull_number: number,
    headers: {
      'Accept': 'application/vnd.github.v3.diff',
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  // TODO: if PR is not 'Open' then return an error
  return response
}

export const pushDescription = async (number: string, description: string) => {
  const owner = process.env.GITHUB_OWNER || ''
  const repo = process.env.GITHUB_REPOSITORY || ''

  const response = await octokit.request('PATCH /repos/{owner}/{repo}/pulls/{pull_number}', {
    owner: owner,
    repo: repo,
    pull_number: parseInt(number),
    body: description
  })

  return response
}