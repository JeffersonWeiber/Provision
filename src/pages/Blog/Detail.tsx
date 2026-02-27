import SEO from '../../components/SEO';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Tag } from 'lucide-react';
import { useArticle } from '../../hooks/useArticles';

const BlogDetail = () => {
    const { slug } = useParams();
    const { data: article, isLoading } = useArticle(slug);

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
                <Link to="/blog" className="text-brand-600 font-bold hover:underline flex items-center">
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
            <div className="bg-slate-900 py-20 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <Link to="/blog" className="inline-flex items-center text-brand-400 font-bold mb-8 hover:text-brand-300 transition-colors">
                        <ArrowLeft size={18} className="mr-2" /> Voltar para o Blog
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                        Detalhe do Artigo: {slug}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm">
                        <span className="flex items-center gap-2"><User size={16} /> Dr. Roberto Silva</span>
                        <span className="flex items-center gap-2"><Calendar size={16} /> 12 de Fevereiro, 2026</span>
                        <span className="flex items-center gap-2"><Tag size={16} /> Tributário</span>
                    </div>
                </div>
            </div>

            <article className="container mx-auto max-w-4xl py-16 px-4">
                <div className="prose prose-slate lg:prose-xl mx-auto">
                    <p className="text-xl text-slate-600 leading-relaxed mb-8 italic border-l-4 border-brand-500 pl-6">
                        Este é um conteúdo preparado para demonstração. Em breve, os artigos reais serão exibidos aqui com toda a riqueza técnica necessária para a gestão pública.
                    </p>
                    <p>
                        A Provision está comprometida em trazer as melhores atualizações normativas e conteúdos técnicos para auxiliar gestores municipais em todo o Brasil.
                    </p>
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 my-12">
                        <h3 className="text-xl font-bold mb-4">Aviso Técnico</h3>
                        <p className="text-sm text-slate-500">
                            Nossas atualizações normativas seguem os padrões do TCE e TCU, garantindo conformidade legal em todas as orientações prestadas.
                        </p>
                    </div>
                </div>
            </article>
        </div >
    );
};

export default BlogDetail;
