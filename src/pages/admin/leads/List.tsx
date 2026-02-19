import { useState } from 'react';
import { MOCK_LEADS } from '../../../data/mocks';
import { Search, Filter, MoreVertical, Phone, Mail, Building2, User, Briefcase, Plus, Calendar, Clock, MessageSquare, Tag } from 'lucide-react';
import Modal from '../../../components/ui/Modal';
import Drawer from '../../../components/ui/Drawer';

const LeadsList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<any>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Form State
    const [newLead, setNewLead] = useState({
        name: '',
        role: '',
        email: '',
        phone: '',
        organization: '',
        source: 'Cadastro Manual'
    });

    const filteredLeads = MOCK_LEADS.filter((lead: any) => {
        const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'Todos' || lead.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Novo': return 'bg-blue-100 text-blue-800';
            case 'Qualificado': return 'bg-yellow-100 text-yellow-800';
            case 'Contatado': return 'bg-purple-100 text-purple-800';
            case 'Convertido': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleCreateLead = (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would normally save to backend/supabase
        console.log('Criando lead:', newLead);
        alert('Lead criado com sucesso! (Simulação)');
        setIsModalOpen(false);
        setNewLead({
            name: '',
            role: '',
            email: '',
            phone: '',
            organization: '',
            source: 'Cadastro Manual'
        });
    };

    const openLeadDetails = (lead: any) => {
        setSelectedLead(lead);
        setIsDrawerOpen(true);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Gestão de Leads (CRM)</h1>
                    <p className="text-slate-500">Gerencie contatos e oportunidades com órgãos públicos.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors flex items-center shadow-lg shadow-brand-200"
                >
                    <Plus size={20} className="mr-2" />
                    Novo Lead
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nome, órgão ou email..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter size={20} className="text-slate-500" />
                    <select
                        className="border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-brand-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="Todos">Todos os Status</option>
                        <option value="Novo">Novo</option>
                        <option value="Qualificado">Qualificado</option>
                        <option value="Contatado">Contatado</option>
                        <option value="Convertido">Convertido</option>
                    </select>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nome / Cargo</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contato</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Organização</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Origem</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {filteredLeads.map((lead: any) => (
                                <tr
                                    key={lead.id}
                                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                                    onClick={() => openLeadDetails(lead)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold mr-3">
                                                {lead.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-slate-900">{lead.name}</div>
                                                <div className="text-xs text-slate-500">{lead.role}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col space-y-1">
                                            <div className="flex items-center text-sm text-slate-600">
                                                <Mail size={14} className="mr-2" /> {lead.email}
                                            </div>
                                            <div className="flex items-center text-sm text-slate-600">
                                                <Phone size={14} className="mr-2" /> {lead.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-slate-700">
                                            <Building2 size={16} className="mr-2 text-slate-400" />
                                            {lead.organization}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        {lead.source}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-slate-400 hover:text-brand-600">
                                            <MoreVertical size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredLeads.length === 0 && (
                    <div className="p-8 text-center text-slate-500">
                        Nenhum lead encontrado com os filtros atuais.
                    </div>
                )}
            </div>

            {/* Create Lead Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Novo Lead"
            >
                <form onSubmit={handleCreateLead} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                                <User size={14} /> Nome Completo
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                value={newLead.name}
                                onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                                <Briefcase size={14} /> Cargo / Função
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                value={newLead.role}
                                onChange={(e) => setNewLead({ ...newLead, role: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                            <Building2 size={14} /> Órgão / Organização
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                            value={newLead.organization}
                            onChange={(e) => setNewLead({ ...newLead, organization: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                                <Mail size={14} /> Email Institucional
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                value={newLead.email}
                                onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                                <Phone size={14} /> Telefone
                            </label>
                            <input
                                type="tel"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                value={newLead.phone}
                                onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                            />
                        </div>
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
                            Salvar Lead
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Lead Details Drawer */}
            <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Detalhes do Lead"
            >
                {selectedLead && (
                    <div className="space-y-8">
                        {/* Header Profile */}
                        <div className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="h-16 w-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                {selectedLead.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                                <h4 className="text-lg font-bold text-slate-900">{selectedLead.name}</h4>
                                <p className="text-sm text-slate-500">{selectedLead.role}</p>
                                <span className={`mt-2 px-2 py-0.5 inline-flex text-[10px] leading-5 font-semibold rounded-full ${getStatusColor(selectedLead.status)} uppercase tracking-wider`}>
                                    {selectedLead.status}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-3">
                            <a href={`mailto:${selectedLead.email}`} className="flex items-center justify-center p-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors">
                                <Mail size={18} className="mr-2 text-brand-600" /> Email
                            </a>
                            <a href={`tel:${selectedLead.phone}`} className="flex items-center justify-center p-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors">
                                <Phone size={18} className="mr-2 text-brand-600" /> Ligar
                            </a>
                        </div>

                        {/* Information Sections */}
                        <div className="space-y-6">
                            <div>
                                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Informações Gerais</h5>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <Building2 size={18} className="text-slate-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium">Organização</p>
                                            <p className="text-sm text-slate-900 font-semibold">{selectedLead.organization}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Tag size={18} className="text-slate-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium">Origem do Lead</p>
                                            <p className="text-sm text-slate-900">{selectedLead.source}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Calendar size={18} className="text-slate-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium">Data de Cadastro</p>
                                            <p className="text-sm text-slate-900">18/02/2026</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Histórico de Atividade</h5>
                                <div className="space-y-4 py-2 border-l-2 border-slate-100 ml-2 pl-6">
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-brand-500 ring-4 ring-white"></div>
                                        <p className="text-sm font-medium text-slate-900">Download de Conteúdo Programático</p>
                                        <p className="text-xs text-slate-500 flex items-center mt-1">
                                            <Clock size={12} className="mr-1" /> Ontem às 14:30
                                        </p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-slate-300 ring-4 ring-white"></div>
                                        <p className="text-sm font-medium text-slate-900">Interesse via Landing Page</p>
                                        <p className="text-xs text-slate-500 flex items-center mt-1">
                                            <Clock size={12} className="mr-1" /> 18/02/2026 às 10:15
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Notas e Observações</h5>
                                <div className="space-y-4">
                                    <div className="p-3 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-100 text-sm italic">
                                        <div className="flex items-center mb-1 text-yellow-900 not-italic font-bold">
                                            <MessageSquare size={14} className="mr-1" /> Nota Adicional
                                        </div>
                                        "Interessado na nova lei de licitações para treinamento in-company da equipe de compras."
                                    </div>
                                    <textarea
                                        placeholder="Adicionar uma nova nota..."
                                        className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none h-24"
                                    ></textarea>
                                    <button className="w-full py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">
                                        Adicionar Nota
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Drawer>
        </div>
    );
};

export default LeadsList;
