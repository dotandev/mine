import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function fetchGitHub(endpoint: string) {
  const res = await fetch(`https://api.github.com${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      // X-GitHub-Api-Version: "2022-11-28"
    },
    // next: { revalidate: 3600 }, // optional caching in Next.js
  })
  if (!res.ok) throw new Error("GitHub API error")
    // alert(`Fetching GitHub data from: ${{
    //   endpoint, res: res.json
    // }}`)
  // For debugging purposes, you can log the endpoint and response  
  // console.log(`Fetching GitHub data from: ${{endpoint, res: await res.json()}}`)
  if (res.status === 404) return []
  if (res.status === 403) throw new Error("GitHub API rate limit exceeded")
  if (res.status === 401) throw new Error("GitHub API authentication error")
  if (res.status === 500) throw new Error("GitHub API server error")
  return res.json()
}
