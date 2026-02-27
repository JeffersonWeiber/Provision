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
                .insert([
                    {
                        ...newLead,
                        status: newLead.status || 'new',
                    },
                ])
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
