import PageHeader from '../components/ui/PageHeader';
import { Target, Eye, Award, CheckCircle } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            <PageHeader
                title="A Provision"
                subtitle="Transformando a Gestão Pública através do conhecimento técnico e da inovação."
                backgroundImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1920"
            />

            {/* History & Methodology */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-2">Nossa História</h2>
                            <h3 className="text-3xl font-bold text-slate-900 mb-6">Compromisso com a Excelência Pública</h3>
                            <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                A Provision nasceu da necessidade de oferecer suporte técnico especializado e prático para gestores públicos municipais.
                                Entendemos os desafios diários das prefeituras, câmaras e autarquias, desde a complexidade normativa até a execução orçamentária.
                            </p>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                Nossa metodologia une a teoria jurídica e contábil com a prática administrativa, garantindo que nossos alunos e clientes
                                não apenas compreendam a lei, mas saibam como aplicá-la com segurança e eficiência.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-brand-200 rounded-2xl transform rotate-3 scale-105"></div>
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
                                alt="Equipe reunida"
                                className="relative rounded-2xl shadow-xl w-full object-cover h-[400px]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission, Vision, Values */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-brand-500 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 mb-6">
                                <Target size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Missão</h3>
                            <p className="text-slate-600">
                                Capacitar gestores e servidores públicos com conhecimento técnico de alta qualidade, promovendo uma administração eficiente e legalmente segura.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-brand-500 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 mb-6">
                                <Eye size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Visão</h3>
                            <p className="text-slate-600">
                                Ser a referência nacional em educação corporativa e consultoria para o setor público municipal, reconhecida pela inovação e resultados.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-brand-500 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 mb-6">
                                <Award size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Valores</h3>
                            <ul className="space-y-2 text-slate-600">
                                <li className="flex items-center"><CheckCircle size={16} className="text-brand-500 mr-2" /> Ética e Transparência</li>
                                <li className="flex items-center"><CheckCircle size={16} className="text-brand-500 mr-2" /> Excelência Técnica</li>
                                <li className="flex items-center"><CheckCircle size={16} className="text-brand-500 mr-2" /> Inovação Constante</li>
                                <li className="flex items-center"><CheckCircle size={16} className="text-brand-500 mr-2" /> Foco no Resultado</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Placeholder (Optional for Phase 1) */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12">Quem Faz a Provision</h2>
                    <div className="max-w-3xl mx-auto bg-slate-50 p-8 rounded-2xl border border-slate-200">
                        <p className="text-slate-600 italic text-lg">
                            "Contamos com uma equipe multidisciplinar formada por advogados, contadores e administradores com vasta experiência na gestão pública."
                        </p>
                        <div className="mt-6 flex items-center justify-center space-x-4">
                            <span className="font-bold text-slate-900">Dr. Nome do Fundador</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-brand-600">Diretor Técnico</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
