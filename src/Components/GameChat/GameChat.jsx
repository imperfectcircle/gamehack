import useAuthStore from '../../Store/authStore';
import { useEffect, useState } from 'react';
import { supabase } from '../../Supabase/client';
import Button from '../UI/Button';
import Message from './Message';

export default function GameChat({ game }) {
    const [messages, setMessages] = useState(null);
    const [message, setMessage] = useState('');

    const profile = useAuthStore((state) => state.profile);

    const fetchMessages = async () => {
        const { data } = await supabase
            .from('messages')
            .select(
                `
      *,
      profile: profiles(id,username,avatar_url)
      `,
            )
            .eq('game_id', game)
            .order('id', { ascending: false })
            .limit(10);

        if (data) {
            setMessages(data);
        }
    };

    useEffect(() => {
        fetchMessages();

        const subscription = supabase
            .channel('table-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'messages',
                },
                (payload) => {
                    fetchMessages();
                },
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const addMessage = async () => {
        if (message) {
            await supabase
                .from('messages')
                .insert([
                    { text: message, game_id: game, profile_id: profile.id },
                ]);

            await fetchMessages();
            setMessage('');
        }
    };

    return (
        <div className="ml-auto md:sticky md:top-24 md:w-96 ">
            <div className="pt-24">
                {messages && messages.length > 0 ? (
                    <div className="flex flex-col-reverse text-xs">
                        {messages.map((el) => (
                            <Message
                                key={el.id}
                                message={el}
                                profile={profile}
                            />
                        ))}
                    </div>
                ) : (
                    'No message in this chat'
                )}
                <div className="">
                    <br />
                    <br />

                    <textarea
                        name=""
                        id=""
                        rows="4"
                        placeholder="Add Note"
                        className="w-full resize-none rounded-lg bg-white p-2 text-black dark:bg-slate-300"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                    ></textarea>

                    <div className="mt-4 text-right">
                        <Button content="Send message" onClick={addMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
}
