"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProjectSidebar } from "@/components/project/project-sidebar";
import { ProjectContent } from "@/components/project/project-content";
import { apiClient } from "@/lib/api";
import { Preloader } from "@/components/preloader";

export default function ProjectPage() {
    const params = useParams();
    const id = params?.id as string;
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                // In a real app, you might have getProjectById. 
                // Here we fetch all and find, or assume the API has it.
                // Reusing getProjects for now or assuming the structure.
                const response = await apiClient.getProjects({ limit: 100 });
                if (response.success) {
                    // Clean fuzzy match or direct ID match
                    const found = response.data.find((p: any) =>
                        p.id === id || p.searchName === id ||
                        p.name.toLowerCase().replace(/ /g, "-") === id
                    );
                    setProject(found || {
                        name: "Project Not Found",
                        description: "This project could not be located.",
                        details: "Please check the URL or go back to projects.",
                        year: "N/A",
                        role: "N/A",
                        technologies: []
                    });
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProject();
        }
    }, [id]);

    if (loading) {
        return <div className="min-h-screen bg-background flex items-center justify-center text-foreground font-medium">Loading Project...</div>;
    }

    if (!project) return null;

    return (
        <main className="min-h-screen bg-background text-foreground relative selection:bg-[#1DB954] selection:text-black pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    {/* Sticky Sidebar Column */}
                    <aside className="lg:w-1/3 min-w-[320px]">
                        <ProjectSidebar project={project} />
                    </aside>

                    {/* Scrollable Content Column */}
                    <div className="lg:w-2/3 pt-4">
                        <ProjectContent project={project} />
                    </div>

                </div>
            </div>
        </main>
    );
}
