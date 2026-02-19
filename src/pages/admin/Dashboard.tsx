import { Users, Building2, BookOpen, TrendingUp } from 'lucide-react';
import { MOCK_COURSES } from '../../data/mocks';

const Dashboard = () => {
    // Mock Stats
    const stats = [
        { title: 'Total de Leads (CRM)', value: '142', icon: Users, change: '+12%', color: 'blue' },
        { title: 'Organizações Ativas', value: '28', icon: Building2, change: '+3', color: 'green' },
        { title: 'Cursos Publicados', value: MOCK_COURSES.length.toString(), icon: BookOpen, change: '0', color: 'purple' },
        { title: 'Matrículas Pendentes', value: '15', icon: TrendingUp, change: '-2', color: 'orange' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-8">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

            {/* Recent Activity (Placeholder) */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Atividade Recente</h2>
                <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                            <div>
                                <p className="text-sm font-medium text-slate-900">Novo lead cadastrado: João Silva</p>
                                <p className="text-xs text-slate-500">Interesse em: Gestão de Contratos</p>
                            </div>
                            <span className="text-xs text-slate-400">Há 2 horas</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
