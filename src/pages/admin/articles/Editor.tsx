import React, { useState } from 'react';
import {
    Save,
    ArrowLeft,
    Eye,
    Image as ImageIcon,
    Search,
    Type,
    FileText,
    Link as LinkIcon,
    Calendar,
    User,
    CheckCircle,
    Info
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const ArticleEditor = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [article, setArticle] = useState({
        title: '',
        slug: '',
        category: '',
        content: '',
        summary: '',
        featured_image: '',
        author: 'Admin Provision',
        status: 'draft',
        meta_title: '',
        meta_description: '',
        keywords: ''
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate save
        setTimeout(() => {
            setLoading(false);
            navigate('/admin/articles');
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setArticle(prev => {
            const newState = { ...prev, [name]: value };
            // Auto-generate slug from title if title changes and slug is empty or matches previous title
            if (name === 'title' && (!prev.slug || prev.slug === prev.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''))) {
                newState.slug = value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            }
            return newState;
        });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/articles')}
                        className="p-2 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-slate-200"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            {isEditing ? 'Editar Artigo' : 'Novo Artigo'}
                        </h1>
                        <p className="text-slate-500 text-sm">Preencha os campos abaixo para {isEditing ? 'atualizar' : 'publicar'} seu artigo.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        className="px-4 py-2 text-slate-600 font-bold text-sm hover:bg-white rounded-xl transition-colors flex items-center gap-2"
                        onClick={() => { }}
                    >
                        <Eye size={18} /> Pré-visualizar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-brand-600 text-white px-6 py-2 rounded-xl hover:bg-brand-700 transition-all flex items-center shadow-lg shadow-brand-200 font-bold text-sm"
                    >
                        {loading ? 'Salvando...' : 'Salvar Artigo'}
                        {!loading && <Save size={18} className="ml-2" />}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Editor */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                                <Type size={12} /> Título do Artigo
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={article.title}
                                onChange={handleChange}
                                placeholder="Insira um título impactante..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-lg font-bold outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                                <FileText size={12} /> Resumo (para listagens)
                            </label>
                            <textarea
                                name="summary"
                                rows={3}
                                value={article.summary}
                                onChange={handleChange}
                                placeholder="Uma breve descrição que aparecerá nos cards do blog..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                                <FileText size={12} /> Conteúdo do Artigo
                            </label>
                            <div className="border border-slate-200 rounded-xl overflow-hidden">
                                <div className="bg-slate-50 p-2 border-b border-slate-100 flex gap-1">
                                    {/* Toolbar simulation */}
                                    {['B', 'I', 'U', 'H1', 'H2', 'Link', 'Img'].map(tool => (
                                        <button key={tool} className="w-8 h-8 flex items-center justify-center text-xs font-bold text-slate-500 hover:bg-white rounded hover:shadow-sm" type="button">{tool}</button>
                                    ))}
                                </div>
                                <textarea
                                    name="content"
                                    rows={15}
                                    value={article.content}
                                    onChange={handleChange}
                                    placeholder="Comece a escrever seu conteúdo aqui (suporta Markdown)..."
                                    className="w-full px-4 py-4 outline-none focus:bg-slate-50/10 transition-colors text-slate-700 min-h-[400px] font-serif"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEO Block */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-50 pb-3">
                            <Search className="text-brand-600" size={20} />
                            Otimização SEO
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Meta Título</label>
                                <input
                                    type="text"
                                    name="meta_title"
                                    value={article.meta_title}
                                    onChange={handleChange}
                                    placeholder="Título para buscadores..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow text-sm"
                                />
                                <p className="text-[10px] text-slate-400">Recomendado: 50-60 caracteres.</p>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">URL Amigável (Slug)</label>
                                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50">
                                    <LinkIcon size={14} className="text-slate-400" />
                                    <span className="text-xs text-slate-400">/blog/</span>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={article.slug}
                                        onChange={handleChange}
                                        className="bg-transparent border-none outline-none text-xs font-medium text-slate-600 w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Meta Descrição</label>
                            <textarea
                                name="meta_description"
                                rows={2}
                                value={article.meta_description}
                                onChange={handleChange}
                                placeholder="Descrição que aparecerá no Google..."
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow text-sm"
                            />
                            <p className="text-[10px] text-slate-400">Recomendado: 150-160 caracteres.</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Controls */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-3">Publicação</h3>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500">Status</label>
                                <select
                                    name="status"
                                    value={article.status}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-white text-sm"
                                >
                                    <option value="draft">Rascunho</option>
                                    <option value="published">Publicado</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500">Categoria</label>
                                <select
                                    name="category"
                                    value={article.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-white text-sm"
                                >
                                    <option value="">Selecionar...</option>
                                    <option value="Tributário">Tributário</option>
                                    <option value="Contabilidade">Contabilidade</option>
                                    <option value="Tecnologia">Tecnologia</option>
                                    <option value="Legislação">Legislação</option>
                                </select>
                            </div>

                            <div className="pt-4 flex items-center justify-between text-xs text-slate-400">
                                <span className="flex items-center gap-1"><Calendar size={12} /> Criado em:</span>
                                <span>{new Date().toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-slate-400">
                                <span className="flex items-center gap-1"><User size={12} /> Autor:</span>
                                <span>{article.author}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-3 flex items-center justify-between">
                            Imagem de Destaque
                            <ImageIcon size={16} className="text-slate-400" />
                        </h3>

                        {article.featured_image ? (
                            <div className="relative group rounded-xl overflow-hidden aspect-video border border-slate-100">
                                <img src={article.featured_image} alt="Destaque" className="w-full h-full object-cover" />
                                <button
                                    onClick={() => setArticle({ ...article, featured_image: '' })}
                                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold"
                                >
                                    Remover Imagem
                                </button>
                            </div>
                        ) : (
                            <div className="aspect-video bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 p-4">
                                <ImageIcon size={32} className="mb-2 opacity-50" />
                                <p className="text-[10px] text-center font-medium">Arraste ou clique para upload</p>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 tracking-tight">URL da Imagem (Opcional)</label>
                            <input
                                type="url"
                                name="featured_image"
                                value={article.featured_image}
                                onChange={handleChange}
                                placeholder="https://exemplo.com/imagem.jpg"
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 text-xs"
                            />
                        </div>
                    </div>

                    <div className="bg-brand-50 p-4 rounded-2xl border border-brand-100">
                        <h4 className="text-brand-900 font-bold text-sm mb-2 flex items-center gap-2">
                            <Info size={16} /> Qualidade SEO
                        </h4>
                        <div className="space-y-2">
                            {[
                                { label: 'Slug amigável definido', ok: !!article.slug },
                                { label: 'Meta título configurado', ok: !!article.meta_title },
                                { label: 'Meta descrição preenchida', ok: !!article.meta_description },
                                { label: 'Imagem de destaque', ok: !!article.featured_image }
                            ].map((check, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <span className="text-[10px] text-brand-700 font-medium">{check.label}</span>
                                    {check.ok ? <CheckCircle size={12} className="text-green-500" /> : <div className="w-3 h-3 rounded-full border border-brand-200" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleEditor;
