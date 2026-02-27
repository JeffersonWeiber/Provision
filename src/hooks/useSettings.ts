import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface AppSettings {
    [key: string]: string;
}

export const useSettings = () => {
    return useQuery({
        queryKey: ['app-settings'],
        queryFn: async () => {
            if (!supabase) return {};

            const { data, error } = await supabase
                .from('app_settings')
                .select('key, value');

            if (error) throw error;

            const config: AppSettings = {};
            data?.forEach((s) => (config[s.key] = s.value));
            return config;
        },
        staleTime: 1000 * 60 * 10, // Cache settings for 10 minutes
    });
};

export const useUpdateSettings = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newSettings: AppSettings) => {
            if (!supabase) throw new Error('Supabase client not initialized');

            const updates = Object.entries(newSettings).map(([key, value]) => ({
                key,
                value,
            }));

            const { error } = await supabase
                .from('app_settings')
                .upsert(updates, { onConflict: 'key' });

            if (error) throw error;
            return newSettings;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['app-settings'] });
        },
    });
};
