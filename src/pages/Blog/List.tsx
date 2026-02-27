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
                        {filteredArticles.map((article) => (
                            <div key={article.id} className="group flex flex-col h-full rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 bg-white border border-slate-100">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center space-x-4 text-xs text-slate-500 mb-4 font-medium uppercase tracking-wider">
                                        <span className="text-brand-600">{article.category}</span>
                                        <span>•</span>
                                        <span>{article.date}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                                        <Link to={`/blog/${article.id}`}>{article.title}</Link>
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                                        {article.summary}
                                    </p>
                                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                                        <div className="flex items-center text-xs text-slate-500">
                                            <User size={14} className="mr-2" /> {article.author}
                                        </div>
                                        <Link to={`/blog/${article.id}`} className="text-brand-600 font-bold text-sm flex items-center hover:translate-x-1 transition-transform">
                                            Ler mais <ArrowRight size={16} className="ml-1" />
                                        </Link>
                                    </div>
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
