import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

interface User {
    id: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
    setAuth: (user: User | null) => void;
    logout: () => Promise<void>;
    initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isInitialized: false,
            setAuth: (user) => set({ user, isAuthenticated: !!user, isInitialized: true }),
            logout: async () => {
                if (supabase) {
                    await supabase.auth.signOut();
                }
                set({ user: null, isAuthenticated: false });
            },
            initialize: () => {
                if (!supabase) {
                    set({ isInitialized: true });
                    return;
                }

                // Check initial session
                supabase.auth.getSession().then(({ data: { session } }) => {
                    if (session?.user) {
                        set({
                            user: {
                                id: session.user.id,
                                email: session.user.email || '',
                                role: 'admin' // Or extract from metadata
                            },
                            isAuthenticated: true,
                            isInitialized: true
                        });
                    } else {
                        set({ user: null, isAuthenticated: false, isInitialized: true });
                    }
                });

                // Listen for changes
                supabase.auth.onAuthStateChange((_event, session) => {
                    if (session?.user) {
                        set({
                            user: {
                                id: session.user.id,
                                email: session.user.email || '',
                                role: 'admin'
                            },
                            isAuthenticated: true,
                            isInitialized: true
                        });
                    } else {
                        set({ user: null, isAuthenticated: false, isInitialized: true });
                    }
                });
            }
        }),
        {
            name: 'provision-auth-storage',
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
        }
    )
);
