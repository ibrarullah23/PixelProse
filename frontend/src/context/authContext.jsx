import React, { createContext } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import { fetchAuth } from '../helper/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    
    const { data: auth, error, isLoading } = useQuery('auth', fetchAuth,
        { refetchOnWindowFocus: true });

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // default: true
            staleTime: 1 * 60 * 1000,
            retry: 0,
        },
    },
})


const AppWrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            {children}
        </AuthProvider>
    </QueryClientProvider>
);

export { AuthContext, AppWrapper };
