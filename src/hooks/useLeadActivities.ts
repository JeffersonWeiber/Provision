import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface LeadActivity {
    id: string;
    lead_id: string;
    type: string; // ex: 'status_change', 'note_added', 'email_sent', etc.
    description: string;
    created_at: string;
}

export type CreateLeadActivityInput = Omit<LeadActivity, 'id' | 'created_at'>;

export const useLeadActivities = (leadId?: string) => {
    return useQuery({
        queryKey: ['lead_activities', leadId],
        queryFn: async () => {
            if (!supabase) throw new Error('Supabase client not initialized');
            if (!leadId) return [];

            const { data, error } = await supabase
                .from('lead_activities')
                .select('*')
                .eq('lead_id', leadId)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching lead activities:', error);
                throw error;
            }

            return data as LeadActivity[];
        },
        enabled: !!leadId,
    });
};

export const useAddLeadActivity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newActivity: CreateLeadActivityInput) => {
            if (!supabase) throw new Error('Supabase client not initialized');

            const { data, error } = await supabase
                .from('lead_activities')
                .insert([newActivity])
                .select()
                .single();

            if (error) {
                console.error('Error creating lead activity:', error);
                throw error;
            }

            return data as LeadActivity;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['lead_activities', variables.lead_id] });
        },
    });
};
