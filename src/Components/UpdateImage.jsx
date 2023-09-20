import { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthProvider';

import Button from './UI/Button';
import getProfileImage from '../Utilities/getProfileImage';
import { supabase } from '../Supabase/client';

export default function UpdateImage() {
    const { user } = useAuth();
    const [profile, setProfile] = useState();
    const [preview, setPreview] = useState();
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState();

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

    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const handleFile = (event) => {
        if (!event.target.files) {
            setFile(() => null);
            return;
        }
        setFile(() => event.target.files[0]);
    };

    const submit = async (event) => {
        event.preventDefault();
        setUploading(() => true);
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id + Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(fileName, file);

        if (uploadError) {
            throw uploadError;
        }

        const updated_at = new Date();
        const { error } = await supabase.from('profiles').upsert({
            id: user.id,
            updated_at,
            avatar_url: fileName,
        });

        const { errorUser } = await supabase.auth.updateUser({
            id: user.id,
            updated_at,
        });

        if (error || errorUser) {
            alert('Non va');
        } else {
            setUploading(() => false);
            setFile(() => null);
            setPreview(() => null);
        }
    };

    return (
        <div className="mt-16 flex flex-col items-center space-y-5 md:flex-row md:justify-around">
            <div className="my-5 max-h-[300px] max-w-[300px]">
                {profile && (
                    <img
                        className="h-[300px] w-[300px] rounded-full border-4 border-orange-500 object-cover"
                        src={getProfileImage(profile.avatar_url)}
                        alt="profile avatar"
                    />
                )}
            </div>
            <div className="flex flex-col justify-center">
                <div className="mx-auto mb-5 w-[300px]">
                    {preview && <img src={preview} alt="" />}
                </div>
                <form className="" onSubmit={submit}>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="file"
                            accept="image/*"
                            disabled={uploading}
                            onChange={handleFile}
                        />
                        <Button content="Upload" />
                    </div>
                </form>
            </div>
        </div>
    );
}
