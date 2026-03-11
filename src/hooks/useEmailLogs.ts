import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface EmailLog {
    id: string;
    to_email: string;
    event_type: string;
    resend_id: string;
    created_at: string;
}

export const useEmailLogs = () => {
    return useQuery({
        queryKey: ['email_logs'],
        queryFn: async () => {
            if (!supabase) throw new Error('Supabase client not initialized');

            const { data, error } = await supabase
                .from('email_logs')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching email logs:', error);
                throw error;
            }

            return data as EmailLog[];
        },
    });
};
