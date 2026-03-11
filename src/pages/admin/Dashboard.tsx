import { Users, Building2, BookOpen, TrendingUp, Mail } from 'lucide-react';
import { useLeads } from '../../hooks/useLeads';
import { useOrganizations } from '../../hooks/useOrganizations';
import { useProducts } from '../../hooks/useProducts';
import { useEnrollments } from '../../hooks/useEnrollments';
import { useEmailLogs } from '../../hooks/useEmailLogs';

const Dashboard = () => {
    const { data: leads = [], isLoading: loadingLeads } = useLeads();
    const { data: orgs = [], isLoading: loadingOrgs } = useOrganizations();
    const { data: products = [], isLoading: loadingProducts } = useProducts();
    const { data: enrollments = [], isLoading: loadingEnrollments } = useEnrollments();
    const { data: emailLogs = [], isLoading: loadingEmails } = useEmailLogs();

    const stats = [
        { title: 'Total de Leads (CRM)', value: loadingLeads ? '...' : leads.length.toString(), icon: Users, change: '+12%', color: 'blue' },
        { title: 'Organizações', value: loadingOrgs ? '...' : orgs.length.toString(), icon: Building2, change: '+3', color: 'green' },
        { title: 'Cursos Publicados', value: loadingProducts ? '...' : products.filter(p => p.status === 'published').length.toString(), icon: BookOpen, change: '0', color: 'purple' },
        { title: 'Matrículas', value: loadingEnrollments ? '...' : enrollments.length.toString(), icon: TrendingUp, change: '-2', color: 'orange' },
        { title: 'E-mails Enviados', value: loadingEmails ? '...' : emailLogs.length.toString(), icon: Mail, change: 'Mensal', color: 'indigo' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-8">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                                <stat.icon size={24} />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium">{stat.title}</h3>
                        <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex justify-between items-center">
                        Novos Leads Cadastrados
                        {loadingLeads && <span className="text-xs font-normal text-slate-400">Atualizando...</span>}
                    </h2>
                    <div className="space-y-4">
                        {!loadingLeads && leads.length === 0 ? (
                            <p className="text-sm text-slate-500 py-2">Nenhum lead encontrado.</p>
                        ) : (
                            leads.slice(0, 5).map((lead) => (
                                <div key={lead.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors rounded-lg px-2 -mx-2">
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">{lead.name}</p>
                                        <p className="text-xs text-slate-500">{lead.email}</p>
                                    </div>
                                    <span className="text-xs text-slate-400 font-medium">
                                        {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex justify-between items-center">
                        Últimos E-mails
                        {loadingEmails && <span className="text-xs font-normal text-slate-400">Atualizando...</span>}
                    </h2>
                    <div className="space-y-4">
                        {!loadingEmails && emailLogs.length === 0 ? (
                            <p className="text-sm text-slate-500 py-2">Nenhum disparo registrado ainda.</p>
                        ) : (
                            emailLogs.slice(0, 5).map((log) => (
                                <div key={log.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors rounded-lg px-2 -mx-2">
                                    <div className="flex items-start">
                                        <div className="mt-1 mr-3 p-1.5 rounded bg-indigo-50 text-indigo-600">
                                            <Mail size={14} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{log.to_email}</p>
                                            <p className="text-xs text-slate-500 mt-0.5"><span className="font-medium text-slate-700">{log.event_type}</span></p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-slate-400 font-medium block">
                                            {new Date(log.created_at).toLocaleDateString('pt-BR')}
                                        </span>
                                        <span className="text-[10px] text-slate-400">
                                            {new Date(log.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
