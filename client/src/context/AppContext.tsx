import { createContext, useContext, useState } from "react";

// Add Typing
export interface AppContextType {
    isSignUpActive: boolean;
    setIsSignUpActive: React.Dispatch<React.SetStateAction<boolean>>;
    isLoginActive: boolean;
    setIsLoginActive: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AppProviderProps {
    children: React.ReactNode;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: AppProviderProps) {
    //States you want to pass in the context
    const [isSignUpActive, setIsSignUpActive] = useState<boolean>(false);
    const [isLoginActive, setIsLoginActive] = useState<boolean>(false);

    return (
        <AppContext.Provider
            value={{
                isSignUpActive,
                setIsSignUpActive,
                isLoginActive,
                setIsLoginActive,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

// Call this custom hook to safely consume the context in your components
export function useAppContext() {
    const context = useContext(AppContext);
    if (context === null) {
        throw new Error("Context is null");
    }
    return context;
}
