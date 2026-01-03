import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const Div = () => {
    return (
        <div className="flex flex-col gap-6">
            <h1 className={`${inter.className} text-4xl`}>Student <span>(</span><span className="text-[#3EBC78] font-bold"><button className="cursor-pointer">Botany</button></span>)<span>,  </span><span className="text-[#A25725] underline ml-4 cursor-pointer">@unilag.</span></h1>
            <h1 className={`${inter.className} text-4xl flex text-nowrap`}>Software Engineer, <span className="text-[#A25725] underline mr-6 ml-4 cursor-pointer">@web,</span><span className="text-[#A25725] underline mr-6 cursor-pointer">@ML,</span><span className="text-[#A25725] underline cursor-pointer">@databases.</span></h1>
            <h1 className={`${inter.className} text-4xl text-nowrap`}>Research, <span className="text-[#A25725] underline mr-6 ml-4 cursor-pointer">@leisure,</span><span className="text-[#A25725] underline mr-6 cursor-pointer">@home,</span><span className="text-[#A25725] underline cursor-pointer">@nithub.</span></h1>
        </div>
    )
}