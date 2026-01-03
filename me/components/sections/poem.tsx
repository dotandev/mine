import { Jua } from "next/font/google";

const jua = Jua({
    weight: '400', 
    subsets: ['latin'], 
    display: 'swap',
});

export interface PoemProps {
    firstLine: string;
    secondLine: string;
    thirdLine: string;
    fourthLine: string;
    fifthLine: string;
}

export const Poem = (data: PoemProps) => {
    return (
        <div className="flex flex-col gap-6 md:ml-28 mt-10 -mb-10 sm:-mb-16 md:-mb-20 text-[#4F3422]">
            <div>
                <h1 className={`${jua.className} text-3xl sm:text-4xl sm:text-wrap md:text-5xl`}>
                    {data.firstLine}
                </h1>
                <h1 className={`${jua.className} text-3xl sm:text-4xl sm:text-wrap md:text-5xl`}>
                    {data.secondLine}
                </h1>
                <h1 className={`${jua.className} text-3xl sm:text-4xl sm:text-wrap md:text-5xl`}>
                    {data.thirdLine}
                </h1>
            </div>
            <div>
                <h1 className={`${jua.className} text-3xl sm:text-4xl sm:text-wrap md:text-5xl`}>
                    {data.fourthLine}
                </h1>
                <h1 className={`${jua.className} text-3xl sm:text-4xl sm:text-wrap md:text-5xl`}>
                    {data.fifthLine}
                </h1>
            </div>
        </div>
    );
};