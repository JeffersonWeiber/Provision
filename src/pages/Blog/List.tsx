import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import { useArticles } from '../../hooks/useArticles';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';
import { Search, User, ArrowRight } from 'lucide-react';

const BlogList = () => {
    const { data: articles = [], isLoading } = useArticles();
    const [filter, setFilter] = useState('Todos');

    const categories = ['Todos', ...Array.from(new Set(articles.map(a => a.category)))];

    const filteredArticles = filter === 'Todos'
        ? articles
        : articles.filter(a => a.category === filter);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <SEO
                title="Blog e Atualizações Normativas"
                description="Acompanhe as últimas atualizações legislativas, artigos técnicos e orientações para a gestão pública municipal."
            />
            <PageHeader
                title="Conteúdos & Normativas"
                subtitle="Artigos técnicos, atualizações legislativas e conteúdos exclusivos."
                backgroundImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1920"
            />

            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Controls */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-5 py-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors ${filter === cat
                                        ? 'bg-slate-900 text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-72">
                            <input
                                type="text"
                                placeholder="Pesquisar por tema..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                            />
                            <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
                        </div>
                    </div>

                    {/* Articles List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredArticles.length === 0 && !isLoading && (
                            <div className="col-span-full py-12 text-center text-slate-500">
                                Nenhum artigo encontrado nesta categoria.
                            </div>
                        )}
                        {filteredArticles.map(article => (
                            <div key={article.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-brand-500/5 transition-all group flex flex-col h-full">
                                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                                    {article.featured_image && (
                                        <img
                                            src={article.featured_image}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur text-brand-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-3">
                                        <span>{new Date(article.published_at || article.created_at).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><User size={12} /> {article.author}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors line-clamp-2">
                                        <Link to={`/conteudos/${article.slug}`}>{article.title}</Link>
                                    </h2>
                                    <p className="text-slate-600 mb-6 line-clamp-3 flex-1">{article.summary}</p>

                                    <Link to={`/conteudos/${article.slug}`} className="text-brand-600 font-bold hover:text-brand-700 transition-colors flex items-center gap-2 group/link mt-auto">
                                        Ler Artigo <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogList;
