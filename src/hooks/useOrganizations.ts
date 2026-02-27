import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface Organization {
    id: string;
    cnpj: string;
    nomeRazaosocial: string;
    nomeFantasia: string;
    tipoLogradouro: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cep: string;
    uf: string;
    municipio: string;
    email: string;
    telefone: string;
    created_at: string;
}

export const useOrganizations = () => {
    return useQuery({
        queryKey: ['organizations'],
        queryFn: async () => {
            if (!supabase) throw new Error('Supabase client not initialized');

            const { data, error } = await supabase
                .from('organizations')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching organizations:', error);
                throw error;
            }

            return data as Organization[];
        },
    });
};
