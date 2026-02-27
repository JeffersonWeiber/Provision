import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Lead } from './useLeads';
import type { Product } from './useProducts';

export interface Enrollment {
    id: string;
    product_id: string;
    lead_id: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
    notes: string;
    created_at: string;

    // Joined data
    product?: Product;
    lead?: Lead;
}

export const useEnrollments = () => {
    return useQuery({
        queryKey: ['enrollments'],
        queryFn: async () => {
            if (!supabase) throw new Error('Supabase client not initialized');

            // Fetch enrollments with joined product and lead data
            const { data, error } = await supabase
                .from('enrollments')
                .select(`
                    *,
                    product:product_id (*),
                    lead:lead_id (*)
                `)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching enrollments:', error);
                throw error;
            }

            return data as Enrollment[];
        },
    });
};
