'use client';

import {
    createContext,
    SetStateAction,
    useContext,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react';
import { GitHubLogoIcon, TableIcon, BookmarkFilledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { motion, MotionConfig, useReducedMotion, AnimatePresence } from 'framer-motion';
import { PageTransition } from "@/components/page-transition";
import { useScrollDirection } from "@/hooks/useScrollDirection";

import { Button } from '@/components/uis/Button';
import { Container } from '@/components/uis/Container';
import { Footer } from '@/components/uis/Footer';
import { GridPattern } from '@/components/uis/GridPattern';
import { Logo } from '@/components/uis/mylogo';
import { Offices } from '@/components/uis/Offices';
import { SocialMedia } from '@/components/uis/SocialMedia'
import { Tabs } from '@radix-ui/react-tabs';
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from '@/components/language-switcher';

const NAV_LINKS = [
    { href: '/about', label: 'About', icon: '' },
    { href: '/projects', label: 'Projects', icon: '' },
    { href: '/activity', label: 'Activity', icon: '' },
    { href: '/experience', label: 'Experience', icon: '' },
    { href: '/hacks', label: 'Hacks', icon: '' },
];

const RootLayoutContext = createContext<{
    logoHovered: boolean;
    setLogoHovered: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

function XIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
            <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
        </svg>
    );
}

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path d="M2 6h20v2H2zM2 16h20v2H2z" />
        </svg>
    );
}

// function Header({
//     panelId,
//     icon: Icon,
//     expanded,
//     onToggle,
//     toggleRef,
//     invert = false,
// }: {
//     panelId: string;
//     icon: React.ComponentType<{ className?: string; }>;
//     expanded: boolean;
//     onToggle: () => void;
//     toggleRef: React.RefObject<HTMLButtonElement>;
//     invert?: boolean;
// }) {
//     let { logoHovered, setLogoHovered } = useContext(RootLayoutContext)!;
//     let [expandedState, setExpandedState] = useState(expanded);
//     useEffect(() => {
//         setExpandedState(expanded);
//     }, [expanded]);

//     const handleGithubClick = () => {
//         window.location.href = 'https://github.com/JesusOfLagos';
//     }

//     return (
//         <Container>
//             <div className="flex items-center justify-between">
//                 <Link
//                     href="/"
//                     aria-label="Home"
//                     onMouseEnter={() => setLogoHovered(true)}
//                     onMouseLeave={() => setLogoHovered(false)}
//                 >
//                     <Logo
//                         className="h-16"
//                         invert={invert}
//                         filled={logoHovered}
//                     />
//                 </Link>
//                 <div className="flex items-center gap-x-8">
//                     <button
//                         onClick={handleGithubClick} ref={toggleRef} className='bg-[#A25725] hover:bg-[#bd7748] px-8 font-bold text-white rounded-3xl py-3 flex gap-4'>
//                         github
//                         <GitHubLogoIcon className='h-6 w-6' />
//                     </button>
//                     {/* <button
//                         onMouseEnter={onToggle}
//                         ref={toggleRef}
//                         className="bg-[#A25725] hover:bg-[#bd7748] px-8 font-bold text-white rounded-3xl py-3 flex gap-5"
//                     >
//                         tabs...
//                         <TableIcon className="h-6 w-6" />
//                     </button> */}

//                     <button
//                         ref={toggleRef}
//                         // onMouseEnter={onToggle}
//                         onMouseEnter={() => setExpandedState(true)}
//                         onMouseLeave={() => setExpandedState(false)}
//                         type="button"
//                         // onClick={onToggle}
//                         aria-expanded={expanded ? 'true' : 'false'}
//                         aria-controls={panelId}
//                         className={clsx(
//                             'group -m-2.5 rounded-full p-2.5 transition',
//                             invert ? 'hover:bg-pink/10' : 'hover:bg-[#A25725]/10',
//                         )}
//                         aria-label="Toggle navigation"
//                     >
//                         <Icon
//                             className={clsx(
//                                 'h-6 w-6',
//                                 invert
//                                     ? 'fill-white group-hover:fill-neutral-200'
//                                     : 'fill-neutral-950 group-hover:fill-neutral-700',
//                             )}
//                         />
//                     </button>
//                 </div>
//             </div>
//         </Container>
//     );
// }

function Header({
    panelId,
    icon: Icon,
    expanded,
    setExpanded, // ✅ receive setter
    onToggle,
    toggleRef,
    invert = false,
    isScrolled = false,
    isHovered = false,
    onLinkClick,
}: {
    panelId: string
    icon: React.ComponentType<{ className?: string }>
    expanded: boolean
    setExpanded: React.Dispatch<React.SetStateAction<boolean>> // ✅ type setter
    onToggle: () => void
    toggleRef: React.RefObject<HTMLButtonElement | null>
    invert?: boolean
    isScrolled?: boolean
    isHovered?: boolean
    onLinkClick?: () => void
}) {
    let { logoHovered, setLogoHovered } = useContext(RootLayoutContext)!

    const handleGithubClick = () => {
        window.location.href = "https://github.com/dotandev"
    }

    const handleCertificationClick = () => {
        window.location.href = "/certifications"
    }

    const handleProjectsClick = () => {
        window.location.href = "/projects"
    }

    return (
        <Container>
            <div className="flex items-center justify-between">
                <Link
                    href="/"
                    aria-label="Home"
                    onMouseEnter={() => setLogoHovered(true)}
                    onMouseLeave={() => setLogoHovered(false)}
                    className="relative z-50"
                >
                    <Logo className="h-16" invert={invert} filled={logoHovered} />
                </Link>
                <div className="flex items-center gap-x-8">
                    <AnimatePresence mode="wait">
                        {isScrolled && isHovered ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex flex-col md:flex-row items-end md:items-center gap-2 absolute md:relative top-full md:top-auto right-0 md:right-auto mt-4 md:mt-0 p-4 md:p-0 bg-white/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none rounded-2xl md:rounded-none border md:border-0 border-white/20 shadow-lg md:shadow-none min-w-[150px] md:min-w-0"
                            >
                                {NAV_LINKS.map((link, i) => (
                                    <Link key={link.href} href={link.href} className="w-full md:w-auto" onClick={onLinkClick}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="px-4 py-2 rounded-full hover:bg-[#A25725] hover:text-white transition-all cursor-pointer text-sm font-bold flex items-center gap-2 justify-end md:justify-center w-full md:w-auto"
                                        >
                                            <span>{link.icon}</span>
                                            <span>{link.label}</span>
                                        </motion.div>
                                    </Link>
                                ))}
                                <div className="pl-0 md:pl-2 border-l-0 md:border-l border-neutral-200 dark:border-white/20 pt-2 md:pt-0 mt-2 md:mt-0 border-t md:border-t-0 w-full md:w-auto flex justify-end md:justify-start">
                                    <ThemeToggle />
                                    
                                </div>
                                <div className="pl-0 md:pl-2 border-l-0 md:border-l border-neutral-200 dark:border-white/20 pt-2 md:pt-0 mt-2 md:mt-0 border-t md:border-t-0 w-full md:w-auto flex justify-end md:justify-start"><LanguageSwitcher /></div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={`flex flex-col sm:flex-row gap-4 items-center ${isScrolled ? 'hidden' : 'flex'}`}
                            >
                                <button
                                    onClick={handleProjectsClick}
                                    ref={toggleRef}
                                    className="bg-[#A25725] cursor-pointer hover:bg-[#bd7748] px-8 font-bold text-white rounded-3xl py-3 flex gap-4 justify-center items-center"
                                >
                                    <span className="hidden sm:inline text-lg">Projects</span>
                                    <span className="sm:hidden">Projects</span>
                                    <BookmarkFilledIcon className="h-6 w-6" />
                                </button>

                                {/* <button
                                    onClick={handleCertificationClick}
                                    ref={toggleRef}
                                    className="bg-[#A25725] cursor-pointer hover:bg-[#bd7748] px-8 font-bold text-white rounded-3xl py-3 flex gap-4 justify-center items-center"
                                >
                                    <span className="hidden sm:inline text-lg">Certifications</span>
                                    <span className="sm:hidden">Certs</span>
                                    <BookmarkFilledIcon className="h-6 w-6" />
                                </button> */}

                                <button
                                    onClick={handleGithubClick}
                                    ref={toggleRef}
                                    className="bg-[#A25725] cursor-pointer hover:bg-[#bd7748] px-8 font-bold text-white rounded-3xl py-3 flex gap-4 justify-center items-center"
                                >
                                    <span className="hidden sm:inline text-lg">Peek Github</span>
                                    <span className="sm:hidden">Github</span>
                                    <GitHubLogoIcon className="h-6 w-6" />
                                </button>

                                {/* ThemeToggle for non-scrolled state */}
                                <div className={clsx("ml-2", invert ? "text-white" : "")}>
                                    <ThemeToggle />
                                    
                                </div>
                                <div><LanguageSwitcher /></div>
                            </motion.div>
                        )}
                    </AnimatePresence>


                    {/* Navigation toggle */}
                    <button
                        ref={toggleRef}
                        onMouseEnter={() => setExpanded(true)}
                        onClick={onToggle}
                        type="button"
                        aria-expanded={expanded ? "true" : "false"}
                        aria-controls={panelId}
                        className={clsx(
                            "group -m-2.5 cursor-pointer flex items-center gap-2 rounded-full p-2.5 transition",
                            invert ? "hover:bg-pink/10" : "hover:bg-[#A25725]/10"
                        )}
                    >
                        <Icon
                            className={clsx(
                                "h-6 w-6",
                                invert
                                    ? "fill-white group-hover:fill-neutral-200"
                                    : "fill-neutral-950 group-hover:fill-neutral-700"
                            )}
                        />
                        {/* Only show text if NOT scrolled or (Scrolled AND NOT Hovered) to avoid clutter */}
                        {(!isScrolled || !isHovered) && (
                            <span
                                className={clsx(
                                    "hidden sm:inline text-lg font-medium",
                                    invert ? "text-white group-hover:text-neutral-200" : "text-neutral-950 group-hover:text-neutral-700"
                                )}
                            >
                                {expanded ? "Click Or Leave Navigation Area To Close" : "Open Navigation Tabs"}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </Container>
    )
}


function NavigationRow({ children }: { children: React.ReactNode; }) {
    return (
        <div className="even:mt-px sm:bg-[#A25725]">
            <hr className='border-3 border-white' />
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
            </Container>
        </div>
    );
}

function NavigationItem({
    href,
    children,
    onClick,
}: {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="group relative isolate -mx-6 bg-[#A25725] px-6 py-3 sm:py-10 even:mt-px sm:mx-0 sm:px-0 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-pink-800 sm:even:pl-16 hover:text-[#A25725] transition-colors"
        >
            {children}
            <span className="absolute inset-y-0 -z-10 w-screen bg-white opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
        </Link>
    );
}

function Navigation({
    setExpanded, // ✅ receive setter
}: {
    setExpanded: React.Dispatch<React.SetStateAction<boolean>> // ✅ type setter
}) {
    return (
        <nav
            onMouseLeave={() => setExpanded(false)}
            className="mt-px font-display text-2xl sm:text-5xl font-medium tracking-tight text-white">
            <NavigationRow>
                <NavigationItem href="/about" onClick={() => setExpanded(false)}>About</NavigationItem>
                <NavigationItem href="/" onClick={() => setExpanded(false)}>Research</NavigationItem>
            </NavigationRow>
            <NavigationRow>
                <NavigationItem href="/projects" onClick={() => setExpanded(false)}>Projects</NavigationItem>
                <NavigationItem href="/hacks" onClick={() => setExpanded(false)}>Hacks</NavigationItem>
            </NavigationRow>
            <NavigationRow>
                <NavigationItem href="/experience" onClick={() => setExpanded(false)}>Experience</NavigationItem>
                <NavigationItem href="/contact" onClick={() => setExpanded(false)}>Contact</NavigationItem>
            </NavigationRow>
            <NavigationRow>
                <NavigationItem href="/activity" onClick={() => setExpanded(false)}>Activity</NavigationItem>
                <NavigationItem href="/blog" onClick={() => setExpanded(false)}>Blog</NavigationItem>
            </NavigationRow>
        </nav>
    );
}

// function RootLayoutInner({ children }: { children: React.ReactNode; }) {
//     let panelId = useId();
//     let [expanded, setExpanded] = useState(false);
//     let openRef = useRef<React.ElementRef<'button'>>(null);
//     let closeRef = useRef<React.ElementRef<'button'>>(null);
//     let navRef = useRef<React.ElementRef<'div'>>(null);
//     let shouldReduceMotion = useReducedMotion();

//     useEffect(() => {
//         function onClick(event: MouseEvent) {
//             if (
//                 event.target instanceof HTMLElement &&
//                 event.target.closest('a')?.href === window.location.href
//             ) {
//                 setExpanded(false);
//             }
//         }

//         window.addEventListener('click', onClick);

//         return () => {
//             window.removeEventListener('click', onClick);
//         };
//     }, []);

//     return (
//         <MotionConfig transition={shouldReduceMotion ? { duration: 0 } : undefined}>
//             <header>
//                 <div
//                     className="absolute left-0 right-0 top-2 z-40 pt-14"
//                     aria-hidden={expanded ? 'true' : undefined}
//                     // @ts-ignore (https://github.com/facebook/react/issues/17157)
//                     inert={expanded ? '' : undefined}
//                 >
//                     <Header
//                         panelId={panelId}
//                         icon={MenuIcon}
//                         toggleRef={openRef}
//                         expanded={expanded}
//                         onToggle={() => {
//                             setExpanded((expanded) => !expanded);
//                             window.setTimeout(
//                                 () => closeRef.current?.focus({ preventScroll: true }),
//                             );
//                         }}
//                     />
//                 </div>

//                 <motion.div
//                     layout
//                     id={panelId}
//                     style={{ height: expanded ? 'auto' : '0.5rem' }}
//                     className="relative z-50 overflow-hidden bg-[#A25725] pt-2 border border-b-white"
//                     aria-hidden={expanded ? undefined : 'true'}
//                     // @ts-ignore (https://github.com/facebook/react/issues/17157)
//                     inert={expanded ? undefined : ''}
//                 >
//                     <motion.div layout className="bg-[#A25725]">
//                         <div ref={navRef} className="bg-[#A25725] pb-16 pt-14">
//                             <Header
//                                 invert
//                                 panelId={panelId}
//                                 icon={XIcon}
//                                 toggleRef={closeRef}
//                                 expanded={expanded}
//                                 onToggle={() => {
//                                     setExpanded((expanded) => !expanded);
//                                     window.setTimeout(
//                                         () => openRef.current?.focus({ preventScroll: true }),
//                                     );
//                                 }}
//                             />
//                         </div>
//                         <Navigation />
//                         {/* <div className="relative bg-[#A25725] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-neutral-800">
//                             <Container>
//                                 <div className="grid grid-cols-1 gap-y-10 pb-16 pt-10 sm:grid-cols-2 sm:pt-16">
//                                     <div>
//                                         <h2 className="font-display text-base font-semibold text-white">
//                                             Our Locations
//                                         </h2>
//                                         <Offices
//                                             invert
//                                             className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
//                                         />
//                                     </div>
//                                     <div className="sm:border-l sm:border-transparent sm:pl-16">
//                                         <h2 className="font-display text-base font-semibold text-white">
//                                             Follow us
//                                         </h2>
//                                         <SocialMedia className="mt-6" invert />
//                                     </div>
//                                 </div>
//                             </Container>
//                         </div> */}
//                     </motion.div>
//                 </motion.div>
//             </header>

//             <motion.div
//                 layout
//                 style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
//                 className="relative flex flex-auto overflow-hidden bg-white pt-14"
//             >
//                 <motion.div
//                     layout
//                     className="relative isolate flex w-full flex-col pt-9"
//                 >
//                     <GridPattern
//                         className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-neutral-50 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
//                         yOffset={-96}
//                         interactive
//                     />

//                     <main className="w-full flex-auto">{children}</main>
//                 </motion.div>
//             </motion.div>
//         </MotionConfig>
//     );
// }



function RootLayoutInner({ children }: { children: React.ReactNode }) {
    let panelId = useId()
    let [expanded, setExpanded] = useState(false)
    let openRef = useRef<React.ElementRef<"button">>(null)
    let closeRef = useRef<React.ElementRef<"button">>(null)
    let navRef = useRef<React.ElementRef<"div">>(null)
    let shouldReduceMotion = useReducedMotion()
    const [isNavbarHovered, setIsNavbarHovered] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    // Click outside handler for mini-dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setIsNavbarHovered(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        function onClick(event: MouseEvent) {
            if (
                event.target instanceof HTMLElement &&
                event.target.closest("a")?.href === window.location.href
            ) {
                setExpanded(false)
            }
        }
        window.addEventListener("click", onClick)
        return () => window.removeEventListener("click", onClick)
    }, [])

    const { isTop } = useScrollDirection();

    // Always visible, but shrinks and blurs on scroll
    // If user wanted "horizontally on the right", we could layout items differently here,
    // but a slim sticky header is the most robust interpretation of "smaller version vertically".

    return (
        <MotionConfig transition={shouldReduceMotion ? { duration: 0 } : undefined}>
            <header>
                <motion.div
                    ref={headerRef}
                    className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-in-out ${!isTop
                        ? "bg-white/80 backdrop-blur-md shadow-sm py-2 mx-4 mt-4 border border-white/20 md:mx-auto"
                        : "bg-transparent py-8 mx-0 mt-0 rounded-none w-full"
                        } ${!isTop && isNavbarHovered ? 'max-w-[90%] rounded-2xl' : 'max-w-7xl rounded-full'} `}
                    onMouseEnter={() => setIsNavbarHovered(true)}
                    onMouseLeave={() => setIsNavbarHovered(false)}
                    aria-hidden={expanded ? "true" : undefined}
                    initial={{ y: 0 }}
                    animate={{ y: 0 }}
                    // @ts-ignore
                    inert={expanded ? "" : undefined}
                >
                    <Header
                        panelId={panelId}
                        icon={MenuIcon}
                        toggleRef={openRef}
                        expanded={expanded}
                        setExpanded={setExpanded}
                        isScrolled={!isTop}
                        isHovered={isNavbarHovered}
                        onLinkClick={() => setIsNavbarHovered(false)}
                        onToggle={() => {
                            setExpanded((expanded) => !expanded)
                            window.setTimeout(() =>
                                closeRef.current?.focus({ preventScroll: true })
                            )
                        }}
                    />
                </motion.div>

                <motion.div
                    layout
                    id={panelId}
                    style={{ height: expanded ? "auto" : "0.5rem" }}
                    className="relative z-50 overflow-hidden bg-[#A25725] pt-2 border border-b-white"
                    aria-hidden={expanded ? undefined : "true"}
                    // @ts-ignore
                    inert={expanded ? undefined : ""}
                >
                    <motion.div layout className="bg-[#A25725]">
                        <div ref={navRef} className="bg-[#A25725] pb-16 pt-14">
                            <Header
                                invert
                                panelId={panelId}
                                icon={XIcon}
                                toggleRef={closeRef}
                                expanded={expanded}
                                setExpanded={setExpanded} // ✅ pass setter down
                                onToggle={() => {
                                    setExpanded((expanded) => !expanded)
                                    window.setTimeout(() =>
                                        openRef.current?.focus({ preventScroll: true })
                                    )
                                }}
                            />
                        </div>

                        {/* 👇 Add hint before nav */}
                        {!expanded && (
                            <p className="text-center text-white text-sm py-2 opacity-80">
                                Click the menu icon to navigate
                            </p>
                        )}

                        <Navigation setExpanded={setExpanded} />
                    </motion.div>
                </motion.div>
            </header>

            <motion.div
                layout
                style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
                className="relative flex flex-auto overflow-hidden bg-white pt-14"
            >
                <motion.div layout className="relative isolate flex w-full flex-col pt-9">
                    <GridPattern
                        className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-neutral-50 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
                        yOffset={-96}
                        interactive
                    />
                    <main className="w-full flex-auto">
                        <PageTransition>
                            {children}
                        </PageTransition>
                    </main>
                </motion.div>
            </motion.div>
        </MotionConfig>
    )
}


export function RootLayout({ children }: { children: React.ReactNode; }) {
    let pathname = usePathname();
    let [logoHovered, setLogoHovered] = useState(false);

    return (
        <RootLayoutContext.Provider value={{ logoHovered, setLogoHovered }}>
            <RootLayoutInner key={pathname}>
                <div style={{ position: "relative", zIndex: 100 }}>''</div>
            </RootLayoutInner>
            <div>{children}</div>
            <Footer />
        </RootLayoutContext.Provider>
    );
}
