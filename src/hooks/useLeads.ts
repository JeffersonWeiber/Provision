import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface Lead {
    id: string;
    name: string;
    email: string;
    phone?: string;
    organization_name?: string;
    role_title?: string;
    source?: string;
    status: 'new' | 'contacted' | 'qualified' | 'converted';
    lgpd_consent: boolean;
    created_at: string;
}

export type CreateLeadInput = Omit<Lead, 'id' | 'created_at' | 'status'> & {
    status?: Lead['status'];
};

export const useLeads = () => {
    return useQuery({
        queryKey: ['leads'],
        queryFn: async () => {
            if (!supabase) throw new Error('Supabase client not initialized');

            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching leads:', error);
                throw error;
            }

            return data as Lead[];
        },
    });
};

export const useAddLead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newLead: CreateLeadInput) => {
            if (!supabase) throw new Error('Supabase client not initialized');

            const { data, error } = await supabase
                .from('leads')
                .upsert(
                    {
                        ...newLead,
                        status: newLead.status || 'new',
                    },
                    { onConflict: 'email' }
                )
                .select()
                .single();

            if (error) {
                console.error('Error creating lead:', error);
                throw error;
            }

            return data as Lead;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leads'] });
        },
    });
};

export const useUpdateLead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...updates }: Partial<Lead> & { id: string }) => {
            if (!supabase) throw new Error('Supabase client not initialized');

            const { data, error } = await supabase
                .from('leads')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                console.error('Error updating lead:', error);
                throw error;
            }

            return data as Lead;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leads'] });
        },
    });
};

export const useDeleteLead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            if (!supabase) throw new Error('Supabase client not initialized');

            const { error } = await supabase
                .from('leads')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting lead:', error);
                throw error;
            }

            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leads'] });
        },
    });
};
