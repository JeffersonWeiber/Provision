import { Link } from 'react-router-dom';
import { MOCK_ARTICLES } from '../../data/mocks';
import { ArrowRight, BookOpen } from 'lucide-react';

const NormativeUpdates = () => {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-brand-700 font-semibold tracking-wide uppercase text-sm mb-2">Conteúdo Técnico</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Atualizações Normativas</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Featured Article (Left) */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full border border-slate-100">
                        <img src={MOCK_ARTICLES[0].image} alt={MOCK_ARTICLES[0].title} className="h-64 object-cover w-full" />
                        <div className="p-8 flex-1 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full uppercase">{MOCK_ARTICLES[0].category}</span>
                                <span className="text-sm text-slate-500">{MOCK_ARTICLES[0].date}</span>
                            </div>
                            <Link to={`/blog/${MOCK_ARTICLES[0].id}`} className="block group">
                                <h4 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand-700 transition-colors">{MOCK_ARTICLES[0].title}</h4>
                            </Link>
                            <p className="text-slate-600 mb-6 flex-grow">{MOCK_ARTICLES[0].summary}</p>
                            <Link to={`/blog/${MOCK_ARTICLES[0].id}`} className="inline-flex items-center font-semibold text-brand-600 hover:text-brand-800">
                                Ler artigo completo <ArrowRight size={18} className="ml-2" />
                            </Link>
                        </div>
                    </div>

                    {/* List of other articles (Right) */}
                    <div className="flex flex-col space-y-6">
                        {MOCK_ARTICLES.slice(1).map((article) => (
                            <div key={article.id} className="bg-white p-6 rounded-xl border border-slate-100 hover:border-brand-200 transition-colors flex gap-6 items-start">
                                <div className="hidden sm:block flex-shrink-0">
                                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                                        <BookOpen size={24} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className="text-xs font-bold text-brand-600 uppercase">{article.category}</span>
                                        <span className="text-xs text-slate-400">•</span>
                                        <span className="text-xs text-slate-500">{article.date}</span>
                                    </div>
                                    <Link to={`/blog/${article.id}`} className="block group">
                                        <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors">{article.title}</h4>
                                    </Link>
                                    <p className="text-sm text-slate-600 line-clamp-2">{article.summary}</p>
                                </div>
                            </div>
                        ))}

                        <div className="mt-4 pt-4 text-center lg:text-left">
                            <Link to="/blog" className="inline-flex items-center px-6 py-3 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500">
                                Ver todos os artigos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NormativeUpdates;
