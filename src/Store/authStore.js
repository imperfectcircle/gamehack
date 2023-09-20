import { create } from 'zustand';
import { supabase } from '../Supabase/client';

const initialState = {
    session: null,
    profile: null,
    isLoggedIn: false,
    isAdmin: false,
};

const useAuthStore = create((set) => ({
    ...initialState,
    setLoggedIn: async (session) => {
        const { data } = await supabase
            .from('profiles')
            .select(
                `
        *,
        favorites: favorites(*)
      `,
            )
            .eq('id', session.user.id)
            .single();

        if (data.banned_until) return;

        set((state) => ({
            ...state,
            session: session,
            profile: data,
            isLoggedIn: true,
            isAdmin: session.user.app_metadata.claims_admin,
        }));
    },
    setProfile: async (profile) =>
        set((state) => ({
            ...state,
            profile,
        })),
    setLoggedOut: () =>
        set(() => ({
            ...initialState,
        })),
}));

export default useAuthStore;
