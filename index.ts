import 'dotenv/config'
import { openPullRequests } from './src/github'

const response = await openPullRequests()

// Example response for command: tailorai -l
response.data.forEach(repo => {
  console.log(`${repo.head.ref} #${repo.number} - ${repo.title}`)
})
