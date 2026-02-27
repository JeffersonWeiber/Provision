import SEO from '../components/SEO';
import ActionAreas from '../components/home/ActionAreas';
import UpcomingCourses from '../components/home/UpcomingCourses';
import NormativeUpdates from '../components/home/NormativeUpdates';
import ConsultingCTA from '../components/home/ConsultingCTA';

const Home = () => {
    return (
        <div className="min-h-screen">
            <SEO
                title="Início"
                description="Soluções Técnicas para uma Gestão Pública Segura e Eficiente. Referência em capacitação e consultoria para municípios."
            />
            {/* HERO SECTION */}
            <section className="relative bg-slate-900 text-white pt-32 pb-40 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-slate-900 to-brand-900 opacity-100"></div>
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-20 pointer-events-none">
                        <div className="absolute top-20 right-10 w-96 h-96 bg-brand-500 rounded-full blur-[128px]"></div>
                        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-600 rounded-full blur-[100px]"></div>
                    </div>
                </div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
                        <span className="text-brand-300 text-sm font-medium tracking-wide">Excelência em Gestão Pública</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                        Gestão pública com <br className="hidden lg:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500">
                            clareza, técnica e confiança.
                        </span>
                    </h1>
                    <p className="mt-0 max-w-2xl mx-auto text-xl text-slate-300 mb-12 leading-relaxed">
                        Referência em capacitação e consultoria estratégica para uma gestão pública eficiente e segura.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="/cursos" className="bg-brand-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-brand-500 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]">
                            Ver Cursos Disponíveis
                        </a>
                        <a href="https://wa.me/5545999999999" className="bg-white/5 text-white backdrop-blur-sm border border-white/10 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors">
                            Falar com Consultor
                        </a>
                    </div>
                </div>
            </section>

            {/* SECTIONS */}
            <ActionAreas />
            <UpcomingCourses />
            <NormativeUpdates />
            <ConsultingCTA />
        </div>
    );
};

export default Home;
