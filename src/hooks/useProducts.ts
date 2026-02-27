import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface Product {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail_url: string;
    type: 'online' | 'presential';
    status: 'draft' | 'published' | 'archived';
    price: number | null;
    settings: any;
    created_at: string;
}

export const useProducts = (statusFilter?: 'published' | 'draft' | 'archived' | 'all') => {
    return useQuery({
        queryKey: ['products', statusFilter],
        queryFn: async () => {
            if (!supabase) throw new Error('Supabase client not initialized');

            let query = supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (statusFilter && statusFilter !== 'all') {
                query = query.eq('status', statusFilter);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching products:', error);
                throw error;
            }

            return data as Product[];
        },
    });
};

export const useProduct = (idOrSlug: string, isSlug = false) => {
    return useQuery({
        queryKey: ['product', idOrSlug],
        queryFn: async () => {
            if (!supabase) throw new Error('Supabase client not initialized');

            let query = supabase.from('products').select('*');

            if (isSlug) {
                query = query.eq('slug', idOrSlug);
            } else {
                query = query.eq('id', idOrSlug);
            }

            const { data, error } = await query.single();

            if (error) {
                console.error('Error fetching product details:', error);
                throw error;
            }

            return data as Product;
        },
        enabled: !!idOrSlug,
    });
};
