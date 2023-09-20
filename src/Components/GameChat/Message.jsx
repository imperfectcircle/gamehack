import getProfileImage from '../../Utilities/getProfileImage';

export default function Message({ message, profile }) {
    return (
        <div
            className={`mb-4 flex flex-col ${
                message.profile_id === profile.id ? 'items-end' : ''
            }`}
        >
            <div className="flex items-center">
                <img
                    className="h-8 w-8 rounded-full border border-orange-500 bg-black object-cover"
                    src={getProfileImage(message.profile.avatar_url)}
                />
                <p className="ml-4">{message.profile.username}</p>
            </div>
            <p className="ml-12 italic">{message.text}</p>
        </div>
    );
}
