import 'dotenv/config'
import { Octokit } from "@octokit/core"

const octokit = new Octokit({
  auth: process.env.GITHUB_PAT
})

export const openPullRequests = async () => {
  const owner = process.env.GITHUB_OWNER || ''
  const repo = process.env.GITHUB_REPOSITORY || ''
  const author = process.env.GITHUB_LOGIN || ''

  const openPulls = await octokit.request('GET /repos/{owner}/{repo}/pulls?author={author}', {
    owner: owner,
    repo: repo,
    author: author,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  return openPulls
}