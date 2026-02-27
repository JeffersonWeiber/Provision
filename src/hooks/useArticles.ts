import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface Article {
    id: string;
    title: string;
    slug: string;
    category: string;
    summary: string;
    author: string;
    featured_image?: string;
    content?: string;
    status: 'draft' | 'published';
    meta_title?: string;
    meta_description?: string;
    keywords?: string;
    created_at: string;
    published_at?: string;
}

export const useArticles = () => {
    return useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            if (!supabase) throw new Error('Supabase client not initialized');

            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching articles:', error);
                throw error;
            }

            return (data || []) as Article[];
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useArticle = (id: string | undefined) => {
    return useQuery({
        queryKey: ['article', id],
        queryFn: async () => {
            if (!id) return null;
            if (!supabase) throw new Error('Supabase client not initialized');

            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error(`Error fetching article ${id}:`, error);
                throw error;
            }

            return (data || null) as Article | null;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 10,
    });
};

export const useArticleBySlug = (slug: string | undefined) => {
    return useQuery({
        queryKey: ['article-slug', slug],
        queryFn: async () => {
            if (!slug) return null;
            if (!supabase) throw new Error('Supabase client not initialized');

            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) {
                console.error(`Error fetching article by slug "${slug}":`, error);
                throw error;
            }

            return (data || null) as Article | null;
        },
        enabled: !!slug,
        staleTime: 1000 * 60 * 10,
    });
};
