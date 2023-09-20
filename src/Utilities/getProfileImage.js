export default function getProfileImage(url) {
    if (!url) return 'https://picsum.photos/500';

    return `${
        import.meta.env.VITE_SUPABASE_PROJECT_URL
    }/storage/v1/object/public/avatars/${url}`;
}
