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
    const parsedContent = useMemo(() => {
        if (!articleContent) return null;
        // Unescape literal \n sequences stored as strings in the DB
        const unescaped = articleContent
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t');

        // Handle paragraph spacing smartly without spacing out Markdown lists
        const lines = unescaped.split('\n').map(line => line.trim()).filter(Boolean);
        let formatted = '';
        for (let i = 0; i < lines.length; i++) {
            formatted += lines[i];
            if (i < lines.length - 1) {
                // Check if current or next line is a list item or blockquote
                const isListItem = (str: string) => /^[-*>]\s|^\d+\.\s/.test(str);
                const currentIsList = isListItem(lines[i]);
                const nextIsList = isListItem(lines[i + 1]);
                
                if (currentIsList && nextIsList) {
                    formatted += '\n'; // Keep tight spacing between consecutive list items
                } else {
                    formatted += '\n\n'; // Add full paragraph spacing otherwise
                }
            }
        }

        return marked.parse(formatted, { breaks: true }) as string;
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
                            className="text-lg text-slate-700 max-w-none
                                       [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:mb-6
                                       [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-4
                                       [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-6 [&_h3]:mb-3
                                       [&_p]:leading-relaxed [&_p]:text-slate-700 [&_p]:mb-6
                                       [&_strong]:text-slate-900 [&_strong]:font-bold
                                       [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6
                                       [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6
                                       [&_li]:mb-2
                                       [&_blockquote]:border-l-4 [&_blockquote]:border-brand-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:mb-6
                                       [&_a]:text-brand-600 [&_a]:underline"
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
