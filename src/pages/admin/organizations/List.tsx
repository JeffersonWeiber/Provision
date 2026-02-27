import { useState } from 'react';
import type { Organization } from '../../../hooks/useOrganizations';
import { useOrganizations } from '../../../hooks/useOrganizations';
import { supabase } from '../../../lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { Search, Building2, MapPin, MoreVertical, Plus, FileText, Globe, Mail, Settings } from 'lucide-react';
import Modal from '../../../components/ui/Modal';
import Drawer from '../../../components/ui/Drawer';

const OrganizationsList = () => {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState<any>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'geral' | 'membros' | 'historico' | 'config'>('geral');

    const { data: orgs = [], isLoading } = useOrganizations();

    // Form State
    const [newOrg, setNewOrg] = useState({
        name: '',
        cnpj: '',
        type: 'prefeitura',
        city: '',
        state: '',
        contact_email: ''
    });

    const filteredOrgs = orgs.filter((org: Organization) => {
        return (org.nomeFantasia && org.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (org.municipio && org.municipio.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (org.cnpj && org.cnpj.includes(searchTerm));
    });

    const handleCreateOrg = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!supabase) throw new Error('Supabase client not initialized');

            const dataToInsert = {
                cnpj: newOrg.cnpj,
                nomeFantasia: newOrg.name, // Mapping UI name to DB nomeFantasia
                municipio: newOrg.city,
                uf: newOrg.state,
                email: newOrg.contact_email,
                // other default fields like 'nomeRazaosocial' and 'status' can be handled as needed
            };

            await supabase.from('organizations').insert([dataToInsert]);
            queryClient.invalidateQueries({ queryKey: ['organizations'] });
            alert('Organização criada com sucesso!');
            setIsModalOpen(false);
            setNewOrg({
                name: '',
                cnpj: '',
                type: 'prefeitura',
                city: '',
                state: '',
                contact_email: ''
            });
        } catch (error) {
            console.error("Error creating organization", error);
            alert("Erro ao criar organização.");
        }
    };

    const handleUpdateOrg = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!supabase) throw new Error('Supabase client not initialized');

            const dataToUpdate = {
                cnpj: selectedOrg.cnpj,
                nomeFantasia: selectedOrg.name,
                municipio: selectedOrg.city,
                uf: selectedOrg.state,
                email: selectedOrg.contact_email,
            };

            await supabase.from('organizations').update(dataToUpdate).eq('id', selectedOrg.id);
            queryClient.invalidateQueries({ queryKey: ['organizations'] });

            alert('Dados atualizados com sucesso!');
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating organization", error);
            alert("Erro ao atualizar organização.");
        }
    };

    const handleToggleOrgStatus = async () => {
        // Implement status toggle logically depending on if `status` field exists in your actual db schema. 
        // For now simulating a local update if status doesn't exist.
        alert(`Recurso de status em desenvolvimento`);
    };

    const openOrgDetails = (org: any) => {
        setSelectedOrg(org);
        setActiveTab('geral');
        setIsDrawerOpen(true);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Organizações</h1>
                    <p className="text-slate-500">Gestão de Prefeituras, Câmaras e Autarquias parceiras.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors flex items-center shadow-lg shadow-brand-200"
                >
                    <Plus size={20} className="mr-2" />
                    Nova Organização
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nome, cidade ou CNPJ..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="p-12 text-center text-slate-500">
                    Carregando organizações...
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredOrgs.map((org: Organization) => (
                        <div
                            key={org.id}
                            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all cursor-pointer hover:-translate-y-1"
                            onClick={() => openOrgDetails(org)}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                                    <Building2 size={24} />
                                </div>
                                <button className="text-slate-400 hover:text-brand-600">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{org.nomeFantasia}</h3>
                            <p className="text-sm text-slate-500 mb-4">CNPJ: {org.cnpj}</p>

                            <div className="flex items-center text-sm text-slate-600 mb-2">
                                <MapPin size={16} className="mr-2 text-slate-400" />
                                {org.municipio} - {org.uf}
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-4">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800`}>
                                    Ativo
                                </span>
                                <span className="text-xs text-slate-500">
                                    0 contatos
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && filteredOrgs.length === 0 && (
                <div className="p-12 text-center bg-white rounded-xl border border-slate-200 text-slate-500">
                    Nenhuma organização encontrada.
                </div>
            )}

            {/* Create Organization Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Nova Organização"
            >
                <form onSubmit={handleCreateOrg} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                            <Building2 size={14} /> Nome da Organização
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Ex: Prefeitura Municipal de..."
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                            value={newOrg.name}
                            onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                                <FileText size={14} /> CNPJ
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="00.000.000/0001-00"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                value={newOrg.cnpj}
                                onChange={(e) => setNewOrg({ ...newOrg, cnpj: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Tipo</label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                value={newOrg.type}
                                onChange={(e) => setNewOrg({ ...newOrg, type: e.target.value })}
                            >
                                <option value="prefeitura">Prefeitura</option>
                                <option value="camara">Câmara</option>
                                <option value="autarquia">Autarquia</option>
                                <option value="privada">Empresa Privada</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                                <MapPin size={14} /> Cidade
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                value={newOrg.city}
                                onChange={(e) => setNewOrg({ ...newOrg, city: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                                <Globe size={14} /> Estado
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Ex: PR"
                                maxLength={2}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                value={newOrg.state}
                                onChange={(e) => setNewOrg({ ...newOrg, state: e.target.value.toUpperCase() })}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                            <Mail size={14} /> Email de Contato
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                            value={newOrg.contact_email}
                            onChange={(e) => setNewOrg({ ...newOrg, contact_email: e.target.value })}
                        />
                    </div>

                    <div className="pt-6 flex justify-end gap-3 border-t border-slate-100 mt-6">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-bold shadow-lg shadow-brand-200"
                        >
                            Salvar Organização
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Organization Details Drawer */}
            <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Detalhes da Organização"
            >
                {selectedOrg && (
                    <div className="space-y-6">
                        {/* Header Profile */}
                        <div className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="h-16 w-16 rounded-lg bg-slate-200 flex items-center justify-center text-slate-500 shadow-inner">
                                <Building2 size={32} />
                            </div>
                            <div className="ml-4">
                                <h4 className="text-lg font-bold text-slate-900">{selectedOrg.nomeFantasia}</h4>
                                <p className="text-sm text-slate-500">CNPJ: {selectedOrg.cnpj}</p>
                                <span className={`mt-2 px-2 py-0.5 inline-flex text-[10px] leading-5 font-semibold rounded-full bg-green-100 text-green-800 uppercase tracking-wider`}>
                                    Ativo
                                </span>
                            </div>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="flex border-b border-slate-200">
                            <button
                                onClick={() => setActiveTab('geral')}
                                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'geral' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                            >
                                Geral
                            </button>
                            <button
                                onClick={() => setActiveTab('membros')}
                                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'membros' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                            >
                                Membros
                            </button>
                            <button
                                onClick={() => setActiveTab('historico')}
                                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'historico' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                            >
                                Histórico
                            </button>
                            <button
                                onClick={() => setActiveTab('config')}
                                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'config' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                            >
                                Config
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="space-y-6 pt-2">
                            {activeTab === 'geral' && (
                                <div className="space-y-6">
                                    <div className="p-4 bg-brand-50 rounded-xl border border-brand-100 flex items-start">
                                        <MapPin size={20} className="text-brand-600 mr-3 mt-1" />
                                        <div>
                                            <h6 className="text-sm font-bold text-brand-900">Localização Principal</h6>
                                            <p className="text-sm text-brand-800 font-medium">{selectedOrg.municipio} - {selectedOrg.uf}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Informações de Contato</h5>
                                        <div className="p-4 rounded-xl border border-slate-100 bg-white space-y-3">
                                            <div className="flex items-center text-sm">
                                                <Mail size={16} className="text-slate-400 mr-3" />
                                                <span className="text-slate-600 font-medium">Email:</span>
                                                <span className="ml-auto text-slate-900 font-bold">{selectedOrg.email || 'contato@' + (selectedOrg.nomeFantasia || '').toLowerCase().split(' ').join('') + '.gov.br'}</span>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <Globe size={16} className="text-slate-400 mr-3" />
                                                <span className="text-slate-600 font-medium">Website:</span>
                                                <span className="ml-auto text-brand-600 underline text-xs">www.{(selectedOrg.nomeFantasia || '').toLowerCase().split(' ').join('')}.gov.br</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 flex gap-3">
                                        <button
                                            onClick={() => setIsEditModalOpen(true)}
                                            className="flex-1 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors"
                                        >
                                            Editar Dados
                                        </button>
                                        <button
                                            onClick={handleToggleOrgStatus}
                                            className={`px-4 py-2 border rounded-lg text-sm font-bold transition-colors ${selectedOrg.status === 'Ativo'
                                                ? 'border-red-200 text-red-600 hover:bg-red-50'
                                                : 'border-green-200 text-green-600 hover:bg-green-50'
                                                }`}
                                        >
                                            {selectedOrg.status === 'Ativo' ? 'Desativar' : 'Ativar'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'membros' && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Membros da Organização</h5>
                                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600">0 Total</span>
                                    </div>
                                    <div className="space-y-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center p-3 rounded-lg bg-white border border-slate-100 hover:border-brand-200 transition-colors cursor-pointer group">
                                                <div className="h-9 w-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-xs font-bold">
                                                    {i === 1 ? 'JS' : i === 2 ? 'MS' : 'RC'}
                                                </div>
                                                <div className="ml-3 flex-1">
                                                    <p className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                                                        {i === 1 ? 'João Silva' : i === 2 ? 'Maria Souza' : 'Ricardo Costa'}
                                                    </p>
                                                    <p className="text-[11px] text-slate-500">{i === 1 ? 'Procurador' : i === 2 ? 'Prefeita' : 'Contador'}</p>
                                                </div>
                                                <button className="text-slate-400 hover:text-slate-600">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        ))}
                                        <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm font-bold hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50/30 transition-all flex items-center justify-center">
                                            <Plus size={18} className="mr-2" /> Vincular Novo Contato
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'historico' && (
                                <div className="space-y-4">
                                    <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Histórico de Contratos & Atividades</h5>
                                    <div className="space-y-4 py-2 border-l-2 border-slate-100 ml-2 pl-6">
                                        <div className="relative">
                                            <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-green-500 ring-4 ring-white"></div>
                                            <p className="text-sm font-bold text-slate-900">Contrato de Consultoria Ativo</p>
                                            <p className="text-xs text-slate-500 mt-1">Vigência: FEV/2026 - JAN/2027</p>
                                            <div className="mt-2 text-[11px] bg-slate-50 p-2 rounded border border-slate-100 text-slate-600">
                                                Acompanhamento de Restos a Pagar e LRF.
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-[31px] top-1 h-3 h-3 h-3 w-3 rounded-full bg-slate-300 ring-4 ring-white"></div>
                                            <p className="text-sm font-bold text-slate-600">Revisão de PPA Finalizada</p>
                                            <p className="text-xs text-slate-400 mt-1">Concluído em 15/12/2025</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'config' && (
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Preferências de Exibição</h5>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">Visível no Portfólio</p>
                                                    <p className="text-[11px] text-slate-500">Exibir marca na Home Pública</p>
                                                </div>
                                                <div className="w-10 h-5 bg-brand-600 rounded-full relative cursor-pointer shadow-inner">
                                                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow"></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">Alertas de Vencimento</p>
                                                    <p className="text-[11px] text-slate-500">Notificar proximidade do fim do contrato</p>
                                                </div>
                                                <div className="w-10 h-5 bg-brand-600 rounded-full relative cursor-pointer shadow-inner">
                                                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                        <h6 className="text-sm font-bold text-red-900 mb-1 flex items-center">
                                            <Settings size={16} className="mr-2" /> Zona de Risco
                                        </h6>
                                        <p className="text-xs text-red-700 mb-3">Ações que podem afetar permanentemente o acesso aos dados desta organização.</p>
                                        <button className="w-full py-2 bg-white text-red-600 border border-red-200 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-all">
                                            Excluir Organização permanentemente
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Drawer>
            {/* Edit Organization Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Editar Organização"
            >
                {selectedOrg && (
                    <form onSubmit={handleUpdateOrg} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                                <Building2 size={14} /> Nome da Organização
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                value={selectedOrg.name}
                                onChange={(e) => setSelectedOrg({ ...selectedOrg, name: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                                    <FileText size={14} /> CNPJ
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                    value={selectedOrg.cnpj}
                                    onChange={(e) => setSelectedOrg({ ...selectedOrg, cnpj: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Tipo</label>
                                <select
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                    value={selectedOrg.type}
                                    onChange={(e) => setSelectedOrg({ ...selectedOrg, type: e.target.value })}
                                >
                                    <option value="prefeitura">Prefeitura</option>
                                    <option value="camara">Câmara</option>
                                    <option value="autarquia">Autarquia</option>
                                    <option value="privada">Empresa Privada</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                                    <MapPin size={14} /> Cidade
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                    value={selectedOrg.city}
                                    onChange={(e) => setSelectedOrg({ ...selectedOrg, city: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                                    <Globe size={14} /> Estado
                                </label>
                                <input
                                    type="text"
                                    required
                                    maxLength={2}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                    value={selectedOrg.state}
                                    onChange={(e) => setSelectedOrg({ ...selectedOrg, state: e.target.value.toUpperCase() })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                                <Mail size={14} /> Email de Contato
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                value={selectedOrg.contact_email}
                                onChange={(e) => setSelectedOrg({ ...selectedOrg, contact_email: e.target.value })}
                            />
                        </div>

                        <div className="pt-6 flex justify-end gap-3 border-t border-slate-100 mt-6">
                            <button
                                type="button"
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-bold shadow-lg shadow-brand-200"
                            >
                                Atualizar Dados
                            </button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default OrganizationsList;
