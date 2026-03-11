import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface LeadNote {
    id: string;
    lead_id: string;
    content: string;
    created_at: string;
}

export type CreateLeadNoteInput = Omit<LeadNote, 'id' | 'created_at'>;

export const useLeadNotes = (leadId?: string) => {
    return useQuery({
        queryKey: ['lead_notes', leadId],
        queryFn: async () => {
            if (!supabase) throw new Error('Supabase client not initialized');
            if (!leadId) return [];

            const { data, error } = await supabase
                .from('lead_notes')
                .select('*')
                .eq('lead_id', leadId)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching lead notes:', error);
                throw error;
            }

            return data as LeadNote[];
        },
        enabled: !!leadId,
    });
};

export const useAddLeadNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newNote: CreateLeadNoteInput) => {
            if (!supabase) throw new Error('Supabase client not initialized');

            const { data, error } = await supabase
                .from('lead_notes')
                .insert([newNote])
                .select()
                .single();

            if (error) {
                console.error('Error creating lead note:', error);
                throw error;
            }

            return data as LeadNote;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['lead_notes', variables.lead_id] });
        },
    });
};
