import { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    MoreHorizontal,
    FileText,
    CheckCircle,
    Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminArticlesList = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data for initial development
    const articles = [
        {
            id: '1',
            title: 'Impactos da Reforma Tributária na Arrecadação Municipal',
            author: 'Dr. Roberto Silva',
            category: 'Tributário',
            status: 'published',
            date: '2026-02-18',
            views: 452
        },
        {
            id: '2',
            title: 'Encerramento de Mandato: Cuidados com a LRF',
            author: 'Marcia Oliveira',
            category: 'Contabilidade',
            status: 'published',
            date: '2026-02-10',
            views: 289
        },
        {
            id: '3',
            title: 'Digitalização de Processos no Setor Público',
            author: 'João técnico',
            category: 'Tecnologia',
            status: 'draft',
            date: '2026-02-05',
            views: 0
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <FileText className="text-brand-600" size={28} />
                        Gestão de Artigos
                    </h1>
                    <p className="text-slate-500 text-sm">Crie, edite e gerencie o conteúdo do seu blog e atualizações normativas.</p>
                </div>
                <Link
                    to="/admin/articles/new"
                    className="bg-brand-600 text-white px-6 py-2.5 rounded-xl hover:bg-brand-700 transition-all flex items-center shadow-lg shadow-brand-200 text-sm font-bold"
                >
                    <Plus size={18} className="mr-2" />
                    Novo Artigo
                </Link>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total de Artigos', value: '24', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Publicados', value: '18', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Rascunhos', value: '6', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Visualizações Totais', value: '12.4k', icon: Eye, color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${stat.bg}`}>
                            <stat.icon className={stat.color} size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                            <p className="text-xl font-black text-slate-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between bg-slate-50/30">
                    <div className="relative flex-1 max-w-md">
                        <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar artigos por título ou autor..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm font-bold text-slate-600">
                            <Filter size={16} /> Filtros
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Artigo</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Categoria</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Data</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {articles.map((article) => (
                                <tr key={article.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{article.title}</span>
                                            <span className="text-xs text-slate-500">por {article.author}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">{article.category}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {article.status === 'published' ? (
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-green-600">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                                                Publicado
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                                Rascunho
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {new Date(article.date).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 text-slate-400">
                                            <Link
                                                to={`/admin/articles/${article.id}`}
                                                className="p-2 hover:bg-white hover:text-brand-600 rounded-lg hover:shadow-sm transition-all"
                                                title="Editar"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                className="p-2 hover:bg-white hover:text-red-600 rounded-lg hover:shadow-sm transition-all"
                                                title="Excluir"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            <button
                                                className="p-2 hover:bg-white hover:text-slate-600 rounded-lg hover:shadow-sm transition-all"
                                            >
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-medium">Mostrando 3 de 24 artigos</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-400 disabled:opacity-50" disabled>Anterior</button>
                        <button className="px-4 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white transition-colors">Próximo</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminArticlesList;
