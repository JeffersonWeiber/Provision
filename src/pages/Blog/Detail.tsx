import SEO from '../../components/SEO';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Calendar } from 'lucide-react';
import { useArticleBySlug } from '../../hooks/useArticles';
import { marked } from 'marked';
import { useMemo, useState } from 'react';

const BlogDetail = () => {
    const { slug } = useParams();
    const { data: article, isLoading } = useArticleBySlug(slug);
    const [imgError, setImgError] = useState(false);

    const articleContent = article?.content;
    // Parse markdown content to HTML (also handle stored \\n literal strings)
    const parsedContent = useMemo(() => {
        if (!articleContent) return null;
        // Unescape literal \n sequences stored as strings in the DB
        const unescaped = articleContent
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t');
        return marked.parse(unescaped, { breaks: true }) as string;
    }, [articleContent]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Artigo não encontrado</h2>
                <Link to="/conteudos" className="text-brand-600 font-bold hover:underline flex items-center">
                    <ArrowLeft size={18} className="mr-2" /> Voltar para o Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <SEO
                title={article.title}
                description={article.summary}
            />
            {/* Header */}
            <div className="bg-white border-b border-slate-200 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                    <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 font-bold text-xs uppercase tracking-wider rounded-full">
                        {article.category}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                        {article.title}
                    </h1>
                    <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                        <span className="flex items-center gap-2"><User size={16} /> {article.author}</span>
                        <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(article.published_at || article.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <article className="prose prose-slate prose-lg max-w-none">
                    {/* Featured Image — only show if URL is valid and loads successfully */}
                    {article.featured_image && !imgError && (
                        <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                            <img src={article.featured_image} alt={article.title} onError={() => setImgError(true)} className="w-full h-auto object-cover max-h-[500px]" />
                        </div>
                    )}

                    <div className="text-xl text-slate-600 leading-relaxed mb-8 italic border-l-4 border-brand-500 pl-6">
                        {article.summary}
                    </div>

                    {/* Content rendering: parsed Markdown as HTML */}
                    {parsedContent ? (
                        <div
                            dangerouslySetInnerHTML={{ __html: parsedContent }}
                            className="prose prose-slate prose-lg max-w-none
                                       prose-headings:font-bold prose-headings:text-slate-900
                                       prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                                       prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                                       prose-p:leading-relaxed prose-p:text-slate-700
                                       prose-strong:text-slate-900 prose-strong:font-bold
                                       prose-ul:list-disc prose-ul:pl-6
                                       prose-ol:list-decimal prose-ol:pl-6
                                       prose-li:text-slate-700 prose-li:mb-1
                                       prose-blockquote:border-l-4 prose-blockquote:border-brand-500 prose-blockquote:pl-4 prose-blockquote:italic"
                        />
                    ) : (
                        <p className="text-slate-600">
                            A Provision está comprometida em trazer as melhores atualizações normativas e conteúdos técnicos para auxiliar gestores municipais em todo o Brasil.
                        </p>
                    )}
                </article>
            </div>
        </div>
    );
};

export default BlogDetail;
