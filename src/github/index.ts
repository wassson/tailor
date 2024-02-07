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

export const parseDiff = (diff: string) => {
  const lines = diff.split('\n')
  const files: any[] = []
  let currentFile: any = {}
  let currentHunk: any = {}
  let currentLine: any = {}

  lines.forEach((line) => {
    if (line.startsWith('diff --git')) {
      currentFile = {}
      currentHunk = {}
      currentLine = {}

      const fileParts = line.split(' ')
      const fileNames = fileParts[2].split('...')

      console.log("====================")
      console.log(fileParts)
      console.log(fileNames)
      console.log("====================")
      currentFile.oldFileName = fileNames[0].replace('a/', '')
      currentFile.newFileName = fileNames[1].replace('b/', '')
      currentFile.hunks = []

      files.push(currentFile)
    } else if (line.startsWith('@@')) {
      currentHunk = {}
      currentLine = {}

      const hunkParts = line.split(' ')
      const hunkOldLineNumbers = hunkParts[1].split(',')
      const hunkNewLineNumbers = hunkParts[2].split(',')

      currentHunk.oldStart = hunkOldLineNumbers[0].replace('-', '')
      currentHunk.oldLines = hunkOldLineNumbers[1]
      currentHunk.newStart = hunkNewLineNumbers[0].replace('+', '')
      currentHunk.newLines = hunkNewLineNumbers[1]
      currentHunk.lines = []

      currentFile.hunks.push(currentHunk)
    } else if (line.startsWith('+')) {
      currentLine = {}
      currentLine.type = 'addition'
      currentLine.content = line.replace('+', '')
      currentHunk.lines.push(currentLine)
    } else if (line.startsWith('-')) {
      currentLine = {}
      currentLine.type = 'deletion'
      currentLine.content = line.replace('-', '')
      currentHunk.lines.push(currentLine)
    } else if (line.startsWith(' ')) {
      currentLine = {}
      currentLine.type = 'context'
      currentLine.content = line.replace(' ', '')
      currentHunk.lines.push(currentLine)
    }
  })

  return files
}