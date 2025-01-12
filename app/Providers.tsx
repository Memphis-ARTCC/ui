"use client";

import { Token } from "@/models/auth/token";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

type AuthContextProps = {
    children: React.ReactNode;
}

type AuthContextType = {
    user: Token | null;
    setUser: (user: Token | null) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
    isMember: () => boolean;
    hasRoles: (role: string[]) => boolean;
    isStaff: () => boolean;
    isFullStaff: () => boolean;
    isSeniorStaff: () => boolean;
    isTrainingStaff: () => boolean;
    isSeniorTrainingStaff: () => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = (props: AuthContextProps) => {
    const [user, setUser] = useState<Token | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            setUser(jwtDecode(token));
        }
    }, []);

    const logout = () => {
        setUser(null);
    };

    const isLoggedIn = () => {
        if (typeof window === "undefined") {
            return false;
        }
        return window.localStorage.getItem("accessToken") !== null;
    };

    const isMember = () => {
        return user?.isMember ?? false;
    };

    const hasRoles = (roles: string[]) => {
        if (!Array.isArray(user?.roles)) {
            return false;
        }
        return user?.roles.some((role) => roles.includes(role)) ?? false;
    };

    const isStaff = () => {
        if (!Array.isArray(user?.roles)) {
            return false;
        }
        return user?.roles.some((role) => ["ATM", "DATM", "TA", "ATA", "WM", "AWM", "EC", "AEC", "FE", "AFE"].includes(role)) ?? false;
    };

    const isFullStaff = () => {
        if (!Array.isArray(user?.roles)) {
            return false;
        }
        return user?.roles.some((role) => ["ATM", "DATM", "TA", "WM", "EC", "FE"].includes(role)) ?? false;
    };

    const isSeniorStaff = () => {
        if (!Array.isArray(user?.roles)) {
            return false;
        }
        return user?.roles.some((role) => ["ATM", "DATM", "TA", "WM"].includes(role)) ?? false;
    };

    const isTrainingStaff = () => {
        if (!Array.isArray(user?.roles)) {
            return false;
        }
        return user?.roles.some((role) => ["ATM", "DATM", "TA", "ATA", "WM", "INS", "MTR"].includes(role)) ?? false;
    };

    const isSeniorTrainingStaff = () => {
        if (!Array.isArray(user?.roles)) {
            return false;
        }
        return user?.roles.some((role) => ["ATM", "DATM", "TA", "ATA", "WM", "INS"].includes(role)) ?? false;
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, isLoggedIn, isMember, hasRoles, isStaff, isFullStaff, isSeniorStaff, isTrainingStaff, isSeniorTrainingStaff }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const HeaderContext = createContext<string | undefined>(undefined);

export const HeaderProvider = (props: AuthContextProps) => {
    const [image, setImage] = useState("");

    useEffect(() => {
        setImage(`header-image-${Math.floor(Math.random() * 4) + 1}`);
    }, [image]);

    return (
        <HeaderContext.Provider value={image}>
            {props.children}
        </HeaderContext.Provider>
    );
};

const Providers = ({children}: Readonly<{children: React.ReactNode}>) => {
    return (
        <AuthProvider>
            <HeaderProvider>
                {children}
            </HeaderProvider>
        </AuthProvider>
    );
};

export default Providers;