import React from 'react';

interface InfoItem {
    label: string;
    subLabel?: string;
    link?: string;
}

interface InfoListProps {
    title: string;
    items: InfoItem[];
}

export function InfoList({ title, items }: InfoListProps) {
    return (
        <div className="py-12 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-4">
                    <h3 className="text-2xl font-medium text-[var(--lando-text)] sticky top-24">{title}</h3>
                </div>

                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-8">
                    {items.map((item, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div className="text-2xl md:text-2xl text-[var(--lando-muted)] group-hover:text-[var(--lando-text)] transition-colors duration-300">
                                {item.label}
                            </div>
                            {item.subLabel && (
                                <div className="text-base md:text-sm text-[var(--lando-muted)]/60 mt-1">
                                    {item.subLabel}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
