'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextProps {
    isSideBarOpen: boolean;
    toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSideBarOpen((prevState) => !prevState);
    };

    return <SidebarContext.Provider value={{ isSideBarOpen, toggleSidebar }}>{children}</SidebarContext.Provider>;
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};
