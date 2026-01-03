'use client'

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
const portProject = "/placeholder.svg";
import { apiClient } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, LayoutGrid, List } from "lucide-react";

// Define types for the project and project items
export interface Project {
    id?: string;
    project_id?: string;
    name: string;
    description: string;
    tags: string[];
    category?: string;
    details: string;
    searchName?: string;
    languages?: string[];
    technologies?: string[];
    framework?: string;
    github?: string;
    demo?: string;
}

// Reusable Search Tab Component with Active Styling
interface SearchTabProps {
    content: string;
    onClick: () => void;
    isActive: boolean;
}

export const SearchTab: React.FC<SearchTabProps> = ({ content, onClick, isActive }) => {
    return (
        <button
            onClick={onClick}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${isActive
                    ? "bg-[#A25725] text-white shadow-lg shadow-[#A25725]/20 scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
        >
            {content}
            {isActive && <XIcon size={14} />}
        </button>
    );
};

import { useMotionValue, useSpring, useTransform } from "framer-motion";

export const ProjectItem = ({ project }: { project: Project }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleRedirect = (url: string) => () => {
        if (url) window.location.href = url;
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const projectUrl = project.searchName ? `/projects/${project.searchName}` : `/projects/${project.id}`;

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleRedirect(projectUrl)}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="relative p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl cursor-pointer overflow-hidden group min-h-[280px] flex flex-col border border-gray-100 transition-all duration-300"
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className="relative z-10 flex flex-col h-full"
            >
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold tracking-wider text-[#A25725] uppercase py-1 px-2 bg-[#A25725]/10 rounded-md">
                            {project.category || "Development"}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-[#A25725] transition-colors mb-3">
                        {project.name}
                    </h3>
                </div>

                <p className="text-gray-600 mb-6 text-sm flex-grow leading-relaxed line-clamp-4">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100/50">
                    {(project.tags || []).slice(0, 3).map((tag, i) => (
                        <span key={`${tag}-${i}`} className="inline-block bg-gray-50 rounded-md px-2 py-1 text-xs font-medium text-gray-500 border border-gray-100">
                            {tag}
                        </span>
                    ))}
                    {(project.tags?.length || 0) > 3 && (
                        <span className="inline-block px-2 py-1 text-xs text-gray-400">+{project.tags!.length - 3}</span>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

// Creative Project List Component
const categories = ["Backend", "Frontend", "ML", "Library", "Botany"];
const languages = ["JavaScript", "TypeScript", "Python", "Go", "Java", "R"];

export const ProjectSearch = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await apiClient.getProjects({ limit: 100 });
                const data = response.success ? response.data : [];
                const mappedProjects = (Array.isArray(data) ? data : []).map((p: any) => ({
                    ...p,
                    details: p.details || p.description,
                    searchName: p.searchName || p.id,
                }));

                setAllProjects(mappedProjects);
                setFilteredProjects(mappedProjects);
            } catch (err) {
                console.error("Failed to fetch projects", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleCategoryClick = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    };

    const handleLanguageClick = (language: string) => {
        setSelectedLanguages((prev) =>
            prev.includes(language)
                ? prev.filter((item) => item !== language)
                : [...prev, language]
        );
    };

    const filterProjects = () => {
        let filtered = allProjects;

        if (selectedCategories.length > 0) {
            filtered = filtered.filter((project) =>
                project.category && selectedCategories.includes(project.category)
            );
        }

        if (selectedLanguages.length > 0) {
            filtered = filtered.filter((project) =>
                project.languages && project.languages.some((lang: string) => selectedLanguages.includes(lang))
            );
        }

        setFilteredProjects(filtered);
    };

    useEffect(() => {
        filterProjects();
    }, [selectedCategories, selectedLanguages, allProjects]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-64 bg-gray-100 rounded-2xl"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div className="space-y-6 flex-1">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Filter by Category</h3>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <SearchTab
                                    key={category}
                                    content={category}
                                    isActive={selectedCategories.includes(category)}
                                    onClick={() => handleCategoryClick(category)}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Filter by Technology</h3>
                        <div className="flex flex-wrap gap-2">
                            {languages.map((language) => (
                                <SearchTab
                                    key={language}
                                    content={language}
                                    isActive={selectedLanguages.includes(language)}
                                    onClick={() => handleLanguageClick(language)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="min-h-[500px]">
                <CreativeProjectList theprojects={filteredProjects} />
            </div>
        </div>
    );
};

interface CreativeProjectListProps {
    theprojects: Project[];
}

export function CreativeProjectList({ theprojects = [] }: CreativeProjectListProps) {
    const [layout, setLayout] = useState<'grid' | 'flex'>('grid');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9; // Increased for better grid view

    // Removed the random sort MEMO to keep list stable and clear
    const projects = theprojects;

    const totalPages = Math.ceil(projects.length / itemsPerPage);
    const startIdx = currentPage * itemsPerPage;
    const endIdx = Math.min((currentPage + 1) * itemsPerPage, projects.length);

    const layoutClass = layout === 'grid'
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        : 'flex flex-col gap-4 max-w-4xl mx-auto';

    const handleTabClick = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-xl text-gray-500 font-medium">No projects found matching your criteria.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 text-[#A25725] hover:underline"
                >
                    Clear filters
                </button>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <span className="text-gray-500 font-medium">{projects.length} Projects</span>
                <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setLayout('grid')}
                        className={`p-2 rounded-md transition-all ${layout === 'grid' ? 'bg-white shadow-sm text-[#A25725]' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <LayoutGrid size={18} />
                    </button>
                    <button
                        onClick={() => setLayout('flex')}
                        className={`p-2 rounded-md transition-all ${layout === 'flex' ? 'bg-white shadow-sm text-[#A25725]' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <List size={18} />
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage + layout}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={layoutClass}
                >
                    {projects.slice(startIdx, endIdx).map((project, idx) => (
                        <ProjectItem key={project.id || idx} project={project} />
                    ))}
                </motion.div>
            </AnimatePresence>

            {totalPages > 1 && (
                <div className="mt-16 flex justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => handleTabClick(i)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                                ${currentPage === i
                                    ? 'bg-[#A25725] text-white shadow-lg shadow-[#A25725]/30 scale-110'
                                    : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
