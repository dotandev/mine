
'use client'

import { Poem } from "@/components/sections/poem"
import { Jua } from "next/font/google"
import { ProjectSearch } from "./imagery"
import { useEffect } from "react"

const jua = Jua({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const dynamicMetadata = {
  title: "Projects - The Basic Portfolio.",
  description: "For Jesus, By Jesus, Of Jesus.",
  keywords: "Projects, The Basic Portfolio, For Jesus, By Jesus, Of Jesus.",
  author: "The Basic Portfolio",
}

export default function ProjectsPage() {
  useEffect(() => {
    document.title = dynamicMetadata.title
    const descriptionMetaTag = document.querySelector('meta[name="description"]')
    const keywordsMetaTag = document.querySelector('meta[name="keywords"]')
    const authorMetaTag = document.querySelector('meta[name="author"]')
    if (descriptionMetaTag) descriptionMetaTag.setAttribute('content', dynamicMetadata.description)
    if (keywordsMetaTag) keywordsMetaTag.setAttribute('content', dynamicMetadata.keywords)
    if (authorMetaTag) authorMetaTag.setAttribute('content', dynamicMetadata.author)
  }, [])

  return (
    <main className={`${jua.className} relative min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto`}>
      <div className="mt-8">
        <ProjectSearch />
      </div>
      <div className="mt-20 mb-10 ml-6 lg:-ml-1">
        <Poem firstLine={"now, you have seen, "} secondLine={"you may not believe. "} thirdLine={"but you noticed."} fourthLine={"come back at a later time-- "} fifthLine={"you might find a taste, then."} />
      </div>
    </main>
  )
}
