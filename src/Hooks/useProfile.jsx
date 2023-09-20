import { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthProvider';
import { supabase } from '../Supabase/client';
export default function useProfile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState();

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select()
                    .eq('id', user.id)
                    .single();

                if (error) throw error;
                setProfile(() => data);
            } catch (error) {
                console.log(error);
            }
        };
        if (user) {
            getUserInfo();
        } else {
            setProfile(null);
        }
    }, [user]);

    return profile;
}
