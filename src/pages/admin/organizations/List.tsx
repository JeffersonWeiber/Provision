import { useState } from 'react';
import type { Organization } from '../../../hooks/useOrganizations';
import { useOrganizations } from '../../../hooks/useOrganizations';
import { supabase } from '../../../lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { Search, Building2, MapPin, MoreVertical, Plus, FileText, Globe, Mail, Settings, AlertCircle } from 'lucide-react';
import Modal from '../../../components/ui/Modal';
import Drawer from '../../../components/ui/Drawer';

const OrganizationsList = () => {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'geral' | 'membros' | 'historico' | 'config'>('geral');

    const { data: orgs = [], isLoading } = useOrganizations();

    // Form State
    const [newOrg, setNewOrg] = useState({
        name: '',
        cnpj: '',
        type: 'prefeitura' as 'prefeitura' | 'camara' | 'autarquia' | 'privada',
        city: '',
        state: '',
        contact_email: ''
    });

    const filteredOrgs = orgs.filter((org: Organization) => {
        return (org.name && org.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (org.city && org.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (org.cnpj && org.cnpj.includes(searchTerm));
    });

    const handleCreateOrg = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!supabase) throw new Error('Supabase client not initialized');

            const dataToInsert = {
                name: newOrg.name,
                cnpj: newOrg.cnpj,
                type: newOrg.type,
                city: newOrg.city,
                state: newOrg.state,
                contact_email: newOrg.contact_email,
                status: 'pending'
            };

            const { error } = await supabase.from('organizations').insert([dataToInsert]);
            if (error) throw error;

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
        if (!selectedOrg) return;
        try {
            if (!supabase) throw new Error('Supabase client not initialized');

            const dataToUpdate = {
                cnpj: selectedOrg.cnpj,
                name: selectedOrg.name,
                city: selectedOrg.city,
                state: selectedOrg.state,
                contact_email: selectedOrg.contact_email,
                type: selectedOrg.type,
                status: selectedOrg.status
            };

            const { error } = await supabase.from('organizations').update(dataToUpdate).eq('id', selectedOrg.id);
            if (error) throw error;

            queryClient.invalidateQueries({ queryKey: ['organizations'] });

            alert('Dados atualizados com sucesso!');
            setIsEditModalOpen(false);
            setIsDrawerOpen(false);
        } catch (error) {
            console.error("Error updating organization", error);
            alert("Erro ao atualizar organização.");
        }
    };

    const handleToggleOrgStatus = async () => {
        if (!selectedOrg) return;
        try {
            if (!supabase) throw new Error('Supabase client not initialized');

            const newStatus = selectedOrg.status === 'active' ? 'inactive' : 'active';
            const { error } = await supabase.from('organizations').update({ status: newStatus }).eq('id', selectedOrg.id);
            if (error) throw error;

            queryClient.invalidateQueries({ queryKey: ['organizations'] });
            setSelectedOrg({ ...selectedOrg, status: newStatus as Organization['status'] });
            alert(`Organização ${newStatus === 'active' ? 'ativada' : 'desativada'} com sucesso!`);
        } catch (error) {
            console.error("Error toggling organization status", error);
            alert("Erro ao alterar status da organização.");
        }
    };

    const openOrgDetails = (org: Organization) => {
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
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{org.name}</h3>
                            <p className="text-sm text-slate-500 mb-4">CNPJ: {org.cnpj}</p>

                            <div className="flex items-center text-sm text-slate-600 mb-2">
                                <MapPin size={16} className="mr-2 text-slate-400" />
                                {org.city || 'Cidade não informada'} - {org.state || 'UF'}
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-4">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${org.status === 'active' ? 'bg-green-100 text-green-800' :
                                    org.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                                    }`}>
                                    {org.status === 'active' ? 'Ativo' : org.status === 'pending' ? 'Pendente' : 'Inativo'}
                                </span>
                                <span className="text-xs text-slate-500">
                                    {org.type}
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
                                onChange={(e) => setNewOrg({ ...newOrg, type: e.target.value as Organization['type'] })}
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
                            <div className="h-16 w-16 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 text-2xl font-bold">
                                {selectedOrg.name?.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="ml-4">
                                <h4 className="text-lg font-bold text-slate-900">{selectedOrg.name}</h4>
                                <p className="text-sm text-slate-500">CNPJ: {selectedOrg.cnpj}</p>
                                <span className={`mt-1 px-2 py-0.5 inline-flex text-[10px] leading-5 font-semibold rounded-full ${selectedOrg.status === 'active' ? 'bg-green-100 text-green-800' :
                                    selectedOrg.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                                    } uppercase tracking-wider`}>
                                    {selectedOrg.status === 'active' ? 'Ativo' : selectedOrg.status === 'pending' ? 'Pendente' : 'Inativo'}
                                </span>
                            </div>
                        </div>

                        {/* Custom Tabs Navigation */}
                        <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar">
                            {(['geral', 'membros', 'historico', 'config'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${activeTab === tab
                                        ? 'border-brand-600 text-brand-600'
                                        : 'border-transparent text-slate-400 hover:text-slate-600'
                                        }`}
                                >
                                    {tab === 'geral' ? 'Geral' : tab === 'membros' ? 'Membros' : tab === 'historico' ? 'Histórico' : 'Config'}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="pt-2">
                            {activeTab === 'geral' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="p-4 bg-white rounded-xl border border-slate-100 space-y-3">
                                            <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Localização</h5>
                                            <div className="flex items-center text-sm text-slate-600">
                                                <MapPin size={16} className="text-slate-400 mr-3" />
                                                <span>{selectedOrg.city} - {selectedOrg.state}</span>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-white rounded-xl border border-slate-100 space-y-3">
                                            <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contato</h5>
                                            <div className="flex items-center text-sm text-slate-600">
                                                <Mail size={16} className="text-slate-400 mr-3" />
                                                <span>{selectedOrg.contact_email}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-slate-600">
                                                <Globe size={16} className="text-slate-400 mr-3" />
                                                <span className="text-brand-600 truncate">www.{selectedOrg.name?.toLowerCase().replace(/\s+/g, '')}.gov.br</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-100 flex gap-3">
                                        <button
                                            onClick={() => setIsEditModalOpen(true)}
                                            className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors flex items-center justify-center"
                                        >
                                            <Settings size={16} className="mr-2" /> Editar Dados
                                        </button>
                                        <button
                                            onClick={handleToggleOrgStatus}
                                            className={`px-4 py-2 border rounded-lg text-sm font-bold transition-all ${selectedOrg.status === 'active'
                                                ? 'border-rose-200 text-rose-600 hover:bg-rose-50'
                                                : 'border-green-200 text-green-600 hover:bg-green-50'
                                                }`}
                                        >
                                            {selectedOrg.status === 'active' ? 'Desativar' : 'Ativar'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'membros' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h5 className="text-sm font-bold text-slate-900">Membros da Equipe</h5>
                                        <button className="flex items-center text-xs font-bold text-brand-600 hover:text-brand-700">
                                            <Plus size={14} className="mr-1" /> Convidar
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                            <Building2 size={32} className="text-slate-300 mb-3" />
                                            <p className="text-slate-500 text-sm italic">Nenhum membro vinculado ainda</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'historico' && (
                                <div className="space-y-6">
                                    <h5 className="text-sm font-bold text-slate-900">Atividades Recentes</h5>
                                    <div className="space-y-4 border-l-2 border-slate-100 pl-4 ml-2">
                                        <div className="relative">
                                            <div className="absolute -left-[22px] top-1 h-3 w-3 rounded-full bg-brand-500 ring-4 ring-white"></div>
                                            <p className="text-sm font-bold text-slate-900">Organização Cadastrada</p>
                                            <p className="text-xs text-slate-500">Cadastrado em {new Date(selectedOrg.created_at).toLocaleDateString('pt-BR')}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'config' && (
                                <div className="space-y-6">
                                    <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
                                        <h6 className="text-sm font-bold text-rose-900 mb-1 flex items-center">
                                            <AlertCircle size={16} className="mr-2" /> Zona de Risco
                                        </h6>
                                        <p className="text-xs text-rose-700 mb-4">Ações irreversíveis que impactam esta organização.</p>
                                        <button className="w-full py-2 bg-white text-rose-600 border border-rose-200 rounded-lg text-xs font-bold hover:bg-rose-600 hover:text-white transition-all">
                                            Excluir Permanentemente
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
                                    onChange={(e) => setSelectedOrg({ ...selectedOrg, type: e.target.value as Organization['type'] })}
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
