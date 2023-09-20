import ProfileAdmin from '../Components/ProfileAdmin';
import ProfileUser from '../Components/ProfileUser';
import { useAuth } from '../Contexts/AuthProvider';

export default function Profile() {
    const { user } = useAuth();

    return (
        <div className="mt-16 min-h-screen p-10">
            <h1 className="text-center text-4xl">Welcome to your profile</h1>
            <div className="">
                {user.app_metadata.claims_admin ? (
                    <ProfileAdmin />
                ) : (
                    <ProfileUser />
                )}
            </div>
        </div>
    );
}
