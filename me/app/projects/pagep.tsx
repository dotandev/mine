'use client'


import { Jua } from "next/font/google";
import { ProjectSearch, ProjectsImagery } from "./imagery";
import { useEffect } from "react";

const jua = Jua({
  weight: '400', // Can be set based on available options
  subsets: ['latin'], // Add any subsets you want
  display: 'swap',
});

const dynamicMetadata = {
  title: "Projects - The Basic Portfolio.",
  description: "For Jesus, By Jesus, Of Jesus.",
  keywords: "Projects, The Basic Portfolio, For Jesus, By Jesus, Of Jesus.",
  author: "The Basic Portfolio",
};


export default function Home() {
  useEffect(() => {
    document.title = dynamicMetadata.title;
    const descriptionMetaTag = document.querySelector('meta[name="description"]');
    const keywordsMetaTag = document.querySelector('meta[name="keywords"]');
    const authorMetaTag = document.querySelector('meta[name="author"]');
    if (descriptionMetaTag) descriptionMetaTag.setAttribute('content', dynamicMetadata.description);
    if (keywordsMetaTag) keywordsMetaTag.setAttribute('content', dynamicMetadata.keywords);
    if (authorMetaTag) authorMetaTag.setAttribute('content', dynamicMetadata.author);
  }, []);
  return (
    <main className={`${jua.className} relative`}>
      {/* <ProjectsHero /> */}
      <ProjectsImagery />
      <div className="mt-16">
        <ProjectSearch />
      </div>
      <div className="ml-6 lg:-ml-1">
        {/* <Poem firstLine={"now, you have seen, "} secondLine={"you may not believe. "} thirdLine={"but you noticed."} fourthLine={"come back at a later time-- "} fifthLine={"you might find a taste, then."} /> */}
      </div>
      {/* <BackgroundBeams /> */}
    </main>
  );
}
