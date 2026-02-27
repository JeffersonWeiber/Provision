import React, { useState, useEffect, useRef } from 'react';
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
    UploadCloud
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useArticle } from '../../../hooks/useArticles';
import { supabase } from '../../../lib/supabase';
import { useQueryClient } from '@tanstack/react-query';

const ArticleEditor = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;
    const { data: dbArticle, isLoading: isLoadingArticle } = useArticle(id);
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
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

    // Populate form when editing an existing article
    useEffect(() => {
        if (isEditing && dbArticle) {
            setArticle({
                title: dbArticle.title || '',
                slug: dbArticle.slug || '',
                category: dbArticle.category || '',
                content: dbArticle.content || '',
                summary: dbArticle.summary || '',
                featured_image: dbArticle.featured_image || '',
                author: dbArticle.author || 'Admin Provision',
                status: dbArticle.status || 'draft',
                // Pre-fill SEO from the article content if not already set
                meta_title: dbArticle.meta_title || dbArticle.title || '',
                meta_description: dbArticle.meta_description || dbArticle.summary || '',
                keywords: dbArticle.keywords || ''
            });
        }
    }, [isEditing, dbArticle]);

    // Converts text to a URL-friendly slug (handles pt-BR accents)
    const toSlug = (text: string) =>
        text
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setArticle(prev => {
            const next = { ...prev, [name]: value };

            if (name === 'title') {
                // Auto-generate slug if it hasn't been manually changed
                if (prev.slug === '' || prev.slug === toSlug(prev.title)) {
                    next.slug = toSlug(value);
                }
                // Auto-fill meta_title if it's still in sync with title
                if (prev.meta_title === '' || prev.meta_title === prev.title) {
                    next.meta_title = value;
                }
            }

            if (name === 'summary') {
                // Auto-fill meta_description from summary (max 160 chars)
                if (prev.meta_description === '' || prev.meta_description === prev.summary.slice(0, 160)) {
                    next.meta_description = value.slice(0, 160);
                }
            }

            return next;
        });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!article.title.trim() || !article.category || !article.slug.trim()) {
            alert('Preencha ao menos o Título, Categoria e Slug para salvar o artigo.');
            return;
        }
        setLoading(true);
        if (!supabase) {
            alert('Supabase não configurado.');
            setLoading(false);
            return;
        }

        try {
            const payload = {
                title: article.title,
                slug: article.slug,
                category: article.category,
                content: article.content,
                summary: article.summary,
                featured_image: article.featured_image || null,
                author: article.author,
                status: article.status,
                meta_title: article.meta_title || article.title,
                meta_description: article.meta_description || article.summary,
                keywords: article.keywords,
                // Set published_at when status changes to published
                ...(article.status === 'published' && !isEditing
                    ? { published_at: new Date().toISOString() }
                    : {}),
            };

            let error;
            if (isEditing && id) {
                const res = await supabase.from('articles').update(payload).eq('id', id);
                error = res.error;
            } else {
                const res = await supabase.from('articles').insert([payload]);
                error = res.error;
            }

            if (error) throw error;

            queryClient.invalidateQueries({ queryKey: ['articles'] });
            if (isEditing && id) {
                queryClient.invalidateQueries({ queryKey: ['article', id] });
            }

            alert(`Artigo ${isEditing ? 'atualizado' : 'criado'} com sucesso!`);
            navigate('/admin/articles');
        } catch (err) {
            console.error('Erro ao salvar:', err);
            const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
            alert(`Falha ao salvar: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setUploadingImage(true);

        try {
            if (!supabase) throw new Error('Supabase não está configurado.');
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('blog-images')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('blog-images')
                .getPublicUrl(fileName);

            setArticle(prev => ({ ...prev, featured_image: publicUrl }));
        } catch (err) {
            console.error('Upload error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Tente novamente';
            alert(`Erro no upload: ${errorMessage}`);
        } finally {
            setUploadingImage(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    if (isEditing && isLoadingArticle) {
        return (
            <div className="p-12 text-center text-slate-500 flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                <span>Carregando artigo...</span>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Top Bar */}
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
                        <p className="text-slate-500 text-sm">
                            {isEditing ? 'Atualize as informações abaixo.' : 'Preencha os campos para publicar seu artigo.'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {article.slug && (
                        <button
                            type="button"
                            className="px-4 py-2 text-slate-600 font-bold text-sm hover:bg-white rounded-xl transition-colors flex items-center gap-2"
                            onClick={() => window.open(`/conteudos/${article.slug}`, '_blank')}
                        >
                            <Eye size={18} /> Pré-visualizar
                        </button>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-brand-600 text-white px-6 py-2 rounded-xl hover:bg-brand-700 transition-all flex items-center shadow-lg shadow-brand-200 font-bold text-sm disabled:opacity-60"
                    >
                        {loading
                            ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" /> Salvando...</>
                            : <><Save size={18} className="mr-2" /> Salvar Artigo</>
                        }
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Editor */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                                <Type size={12} /> Título do Artigo *
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
                            <textarea
                                name="content"
                                rows={18}
                                value={article.content}
                                onChange={handleChange}
                                placeholder="Escreva o conteúdo completo aqui. Suporta Markdown (## Título, **negrito**, *itálico*, - lista)..."
                                className="w-full px-4 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-colors text-slate-700 font-mono text-sm"
                            />
                        </div>
                    </div>

                    {/* SEO Block */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-5">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                            <Search className="text-brand-600" size={20} />
                            Otimização SEO
                            <span className="text-xs font-normal text-slate-400 ml-1">(preenchido automaticamente do título e resumo)</span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Meta Título</label>
                                <input
                                    type="text"
                                    name="meta_title"
                                    value={article.meta_title}
                                    onChange={handleChange}
                                    placeholder="Auto-gerado do título acima..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow text-sm"
                                />
                                <p className={`text-[10px] ${article.meta_title.length > 60 ? 'text-red-500' : 'text-slate-400'}`}>
                                    {article.meta_title.length}/60 caracteres recomendados.
                                </p>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">URL Amigável (Slug)</label>
                                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50">
                                    <LinkIcon size={14} className="text-slate-400 flex-shrink-0" />
                                    <span className="text-xs text-slate-400">/conteudos/</span>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={article.slug}
                                        onChange={handleChange}
                                        className="bg-transparent border-none outline-none text-xs font-medium text-slate-600 w-full"
                                        placeholder="meu-artigo"
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
                                placeholder="Auto-gerada do resumo acima..."
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow text-sm"
                            />
                            <p className={`text-[10px] ${article.meta_description.length > 160 ? 'text-red-500' : 'text-slate-400'}`}>
                                {article.meta_description.length}/160 caracteres recomendados.
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Palavras-chave (separadas por vírgula)</label>
                            <input
                                type="text"
                                name="keywords"
                                value={article.keywords}
                                onChange={handleChange}
                                placeholder="gestão pública, orçamento, prefeitura..."
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Publication */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">Publicação</h3>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500">Status</label>
                            <select
                                name="status"
                                value={article.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-white text-sm"
                            >
                                <option value="draft">📋 Rascunho</option>
                                <option value="published">🟢 Publicado</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500">Categoria *</label>
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
                                <option value="Gestão">Gestão</option>
                                <option value="Orçamento">Orçamento</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500">Autor</label>
                            <input
                                type="text"
                                name="author"
                                value={article.author}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                            />
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-50">
                            <span className="flex items-center gap-1"><Calendar size={12} /> Criado:</span>
                            <span>{new Date().toLocaleDateString('pt-BR')}</span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center justify-between">
                            Imagem de Destaque
                            <ImageIcon size={16} className="text-slate-400" />
                        </h3>

                        {article.featured_image ? (
                            <div className="relative group rounded-xl overflow-hidden aspect-video border border-slate-100">
                                <img src={article.featured_image} alt="Destaque" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setArticle(p => ({ ...p, featured_image: '' }))}
                                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold"
                                >
                                    ✕ Remover Imagem
                                </button>
                            </div>
                        ) : (
                            <div
                                onClick={() => !uploadingImage && fileInputRef.current?.click()}
                                className="aspect-video bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 p-4 hover:bg-slate-100 hover:border-brand-300 transition-all cursor-pointer"
                            >
                                {uploadingImage ? (
                                    <>
                                        <div className="w-7 h-7 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mb-2" />
                                        <p className="text-[10px] font-medium">Enviando imagem...</p>
                                    </>
                                ) : (
                                    <>
                                        <UploadCloud size={32} className="mb-2 opacity-40" />
                                        <p className="text-[10px] font-medium text-center">Clique para selecionar<br />ou cole uma URL abaixo</p>
                                    </>
                                )}
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            disabled={uploadingImage}
                        />

                        <div className="space-y-1.5 pt-1 border-t border-slate-50">
                            <label className="text-xs font-bold text-slate-500">URL Externa (Opcional)</label>
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


                </div>
            </div>
        </div>
    );
};

export default ArticleEditor;
