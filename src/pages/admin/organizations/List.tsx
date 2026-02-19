import { useState } from 'react';
import { MOCK_ORGANIZATIONS } from '../../../data/mocks';
import { Search, Building2, MapPin, MoreVertical, Plus, FileText, Globe, Mail, Users, History, Settings } from 'lucide-react';
import Modal from '../../../components/ui/Modal';
import Drawer from '../../../components/ui/Drawer';

const OrganizationsList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState<any>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Form State
    const [newOrg, setNewOrg] = useState({
        name: '',
        cnpj: '',
        type: 'prefeitura',
        city: '',
        state: '',
        contact_email: ''
    });

    const filteredOrgs = MOCK_ORGANIZATIONS.filter((org: any) => {
        return org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            org.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            org.cnpj.includes(searchTerm);
    });

    const handleCreateOrg = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Criando organização:', newOrg);
        alert('Organização criada com sucesso! (Simulação)');
        setIsModalOpen(false);
        setNewOrg({
            name: '',
            cnpj: '',
            type: 'prefeitura',
            city: '',
            state: '',
            contact_email: ''
        });
    };

    const openOrgDetails = (org: any) => {
        setSelectedOrg(org);
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

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOrgs.map((org: any) => (
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
                            {org.city} - {org.state}
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-4">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${org.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {org.status}
                            </span>
                            <span className="text-xs text-slate-500">
                                {org.contacts} contatos
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {filteredOrgs.length === 0 && (
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
                    <div className="space-y-8">
                        {/* Header Profile */}
                        <div className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="h-16 w-16 rounded-lg bg-slate-200 flex items-center justify-center text-slate-500 shadow-inner">
                                <Building2 size={32} />
                            </div>
                            <div className="ml-4">
                                <h4 className="text-lg font-bold text-slate-900">{selectedOrg.name}</h4>
                                <p className="text-sm text-slate-500">CNPJ: {selectedOrg.cnpj}</p>
                                <span className={`mt-2 px-2 py-0.5 inline-flex text-[10px] leading-5 font-semibold rounded-full ${selectedOrg.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} uppercase tracking-wider`}>
                                    {selectedOrg.status}
                                </span>
                            </div>
                        </div>

                        {/* Localização */}
                        <div className="p-4 bg-brand-50 rounded-xl border border-brand-100 flex items-start">
                            <MapPin size={20} className="text-brand-600 mr-3 mt-1" />
                            <div>
                                <h6 className="text-sm font-bold text-brand-900">Localização</h6>
                                <p className="text-sm text-brand-800">{selectedOrg.city} - {selectedOrg.state}</p>
                            </div>
                        </div>

                        {/* Tabs / Sections */}
                        <div className="space-y-6">
                            <div>
                                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Administração</h5>
                                <div className="grid grid-cols-1 gap-2">
                                    <button className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors">
                                        <span className="flex items-center"><Users size={18} className="mr-2 text-brand-600" /> Contatos Vinculados</span>
                                        <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-600">{selectedOrg.contacts}</span>
                                    </button>
                                    <button className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors">
                                        <span className="flex items-center"><History size={18} className="mr-2 text-brand-600" /> Histórico de Contratos</span>
                                        <span className="text-xs text-slate-400">Ver todos</span>
                                    </button>
                                    <button className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors">
                                        <span className="flex items-center"><Settings size={18} className="mr-2 text-brand-600" /> Configurações Gerais</span>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Membros Recentes</h5>
                                <div className="space-y-3">
                                    {[1, 2].map((i) => (
                                        <div key={i} className="flex items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                                            <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-xs font-bold">
                                                {i === 1 ? 'J' : 'M'}
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <p className="text-sm font-medium text-slate-900">{i === 1 ? 'João Silva' : 'Maria Souza'}</p>
                                                <p className="text-xs text-slate-500">{i === 1 ? 'Secretário' : 'Assessora'}</p>
                                            </div>
                                            <button className="text-slate-400 hover:text-brand-600">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-sm hover:border-brand-300 hover:text-brand-500 transition-all flex items-center justify-center">
                                        <Plus size={16} className="mr-1" /> Vincular Novo Contato
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="pt-8 border-t border-slate-100 flex gap-3">
                            <button className="flex-1 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">
                                Editar Dados
                            </button>
                            <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-bold hover:bg-red-50 transition-colors">
                                Desativar
                            </button>
                        </div>
                    </div>
                )}
            </Drawer>
        </div>
    );
};

export default OrganizationsList;
