import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { MOCK_ARTICLES } from '../data/mocks';

export interface Article {
    id: string;
    title: string;
    date: string;
    category: string;
    summary: string;
    author: string;
    image: string;
    content?: string;
}

export const useArticles = () => {
    return useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            if (!supabase) return MOCK_ARTICLES;

            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .order('date', { ascending: false });

            if (error) {
                console.error('Error fetching articles:', error);
                return MOCK_ARTICLES;
            }

            return data && data.length > 0 ? data : MOCK_ARTICLES;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useArticle = (id: string | undefined) => {
    return useQuery({
        queryKey: ['article', id],
        queryFn: async () => {
            if (!id) return null;
            if (!supabase) return MOCK_ARTICLES.find(a => a.id === id) || null;

            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error(`Error fetching article ${id}:`, error);
                return MOCK_ARTICLES.find(a => a.id === id) || null;
            }

            return data || MOCK_ARTICLES.find(a => a.id === id) || null;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};
