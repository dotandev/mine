// export const BasicFooter = () => {
//     return (
//         <div className="font-bold space-y-3 justify-center my-20 mx-">
//             <div className="text-5xl">Reach me @---</div>
//             <div className="flex gap-4 text-4xl">
//                 <a className="text-[#7C5338]">google:</a>
//                 <a className="underline text-3xl cursor-pointer">jesusdotdev@gmail.com</a>
//                 <h1 className="underline text-3xl">g.dev/jesusdotdev</h1>
//             </div>
//             <div className="flex gap-4 text-4xl">
//                 <h1 className="text-[#7C5338]">microsoft:</h1>
//                 <h1 className="underline text-3xl cursor-pointer">github/JesusOfLagos</h1>
//                 <h1 className="underline text-3xl">linkedin/jesusoflagos</h1>
//             </div>
//         </div>
//     )
// }

export const BasicFooter = () => {
    return (
        <div className="font-bold space-y-6 sm:space-y-8 lg:space-y-10 justify-start my-10 sm:my-20">
            <div className="text-3xl sm:text-4xl lg:text-5xl text-left">Reach me @---</div>

            <div className="flex flex-col sm:flex-row sm:items-left gap-2 sm:gap-4 text-2xl sm:text-3xl lg:text-4xl text-left sm:text-left">
                <a className="text-[#7C5338]">Google:</a>
                <a className="underline text-xl sm:text-2xl lg:text-3xl cursor-pointer">jesusdotdev@gmail.com</a>
                <h1 className="underline text-xl sm:text-2xl lg:text-3xl cursor-pointer">g.dev/jesusdotdev</h1>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-left gap-2 sm:gap-4 text-2xl sm:text-3xl lg:text-4xl text-left sm:text-left">
                <h1 className="text-[#7C5338]">Microsoft:</h1>
                <h1 className="underline text-xl sm:text-2xl lg:text-3xl cursor-pointer">github/dotandev</h1>
                <h1 className="underline text-xl sm:text-2xl lg:text-3xl cursor-pointer">linkedin.com/in/jeesus</h1>
            </div>
        </div>
    );
};
