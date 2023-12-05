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

export const pushComment = async (number: string, comment: string) => {
  const owner = process.env.GITHUB_OWNER || ''
  const repo = process.env.GITHUB_REPOSITORY || ''

  const response = await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
    owner: owner,
    repo: repo,
    issue_number: parseInt(number),
    body: comment
  })

  return response
}

export const pushStatus = async (number: string, status: "pending" | "error" | "failure" | "success") => {
  const owner = process.env.GITHUB_OWNER || ''
  const repo = process.env.GITHUB_REPOSITORY || ''

  const response = await octokit.request('POST /repos/{owner}/{repo}/statuses/{sha}', {
    owner: owner,
    repo: repo,
    sha: number,
    state: status
  })

  return response
}
