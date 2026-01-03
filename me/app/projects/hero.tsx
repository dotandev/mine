import { Container } from "@/components/Container"
import { FadeIn } from "@/components/uis/FadeIn"

export const ProjectsHero = () => {
    return (
        <div>
            <Container className="mt-10 sm:mt-10 md:mt-26">
                <FadeIn className="max-w-3xl">
                    <h1 className={`font-display text-nowrap text-5xl mb-5 font-purple-600 font-semibold tracking-tight sm:text-7xl`}>
                    <span className="text-[#A25725]">SEEING </span>is <span className="text-[#DB6516]">BELIEVING</span> they say.
                    </h1>
                    <h1 className={`font-display text-nowrap text-4xl mb-5 font-purple-600 font-semibold tracking-tight sm:text-6xl`}>
                    So, I did couple of <span className="text-[#A25725]">things.</span>
                    </h1>
                    <h1 className={`font-display text-nowrap text-3xl mb-5 font-purple-600 font-semibold tracking-tight sm:text-5xl`}>
                    Some <span className="text-[#167B41]">tests, </span>and a  <span className="text-[#A25725]">number</span> of <span className="text-[#FF0C29]">failures.</span>
                    </h1>
                </FadeIn>
            </Container>
        </div>
    )
}