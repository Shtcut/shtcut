'use client';

import { useAuth } from '@shtcut/hooks';
import { logout } from '@shtcut/redux/slices/auth';
import { useAppDispatch } from '@shtcut/redux/store';
import Cookies from 'js-cookie';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SidebarContextProps {
    isSideBarOpen: boolean;
    toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);
const AUTH_TOKEN_KEY = 'shtcut';
const USER_KEY = `${AUTH_TOKEN_KEY}_user`;

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const token = Cookies.get(AUTH_TOKEN_KEY);
        if (!token) {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            sessionStorage.removeItem(AUTH_TOKEN_KEY);
            sessionStorage.removeItem(USER_KEY);
            dispatch(logout());
        }
    }, [dispatch]);
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
