import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
    userName: string | null;
    setUserName: (name: string) => void;
    totalNotes: number;
    setTotalNotes: (count: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [userName, setUserName] = useState<string | null>(null);
    const [totalNotes, setTotalNotes] = useState<number>(0);

    return (
        <AppContext.Provider value={{ userName, setUserName, totalNotes, setTotalNotes }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
