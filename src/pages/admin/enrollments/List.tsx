import { useState } from 'react';
import type { Enrollment } from '../../../hooks/useEnrollments';
import { useEnrollments } from '../../../hooks/useEnrollments';
import { Search, GraduationCap, CheckCircle, XCircle, Clock, MoreVertical } from 'lucide-react';

const EnrollmentsList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: enrollments = [], isLoading } = useEnrollments();

    const filtered = enrollments.filter((item: Enrollment) => {
        const courseTitle = item.product?.title || '';
        const leadName = item.lead?.name || '';

        return courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            leadName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const getStatusIcon = (status: string) => {
        if (status === 'confirmed') return <CheckCircle size={16} className="text-green-500" />;
        if (status === 'cancelled') return <XCircle size={16} className="text-red-500" />;
        return <Clock size={16} className="text-orange-500" />;
    };

    const translateStatus = (status: string) => {
        const map: Record<string, string> = {
            'confirmed': 'Confirmado',
            'cancelled': 'Cancelado',
            'pending': 'Pendente'
        };
        return map[status] || status;
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Matrículas</h1>
                    <p className="text-slate-500">Gestão de inscrições em cursos.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por aluno ou curso..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Aluno</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Curso</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Carregando matrículas...</td>
                                </tr>
                            ) : filtered.map((item: Enrollment) => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                                        {item.lead?.name || 'Lead Desconhecido'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        <div className="flex items-center">
                                            <GraduationCap size={16} className="mr-2 text-slate-400" />
                                            {item.product?.title || 'Curso Desconhecido'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            {getStatusIcon(item.status)}
                                            <span className="text-sm text-slate-700">{translateStatus(item.status)}</span>
                                        </div>
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
                {!isLoading && filtered.length === 0 && (
                    <div className="p-8 text-center text-slate-500 border-t border-slate-200">
                        Nenhuma matrícula encontrada.
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnrollmentsList;
