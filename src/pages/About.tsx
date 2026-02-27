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
                            <h3 className="text-3xl font-bold text-slate-900 mb-6">Trajetória Pautada pela Confiança e Excelência</h3>
                            <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                                <p>
                                    A Provision Assessoria Ltda nasceu em 2013, com o propósito de apoiar a administração pública por meio de orientação técnica responsável, planejamento estruturado e compromisso com a boa gestão dos recursos públicos.
                                </p>
                                <p>
                                    Nossa experiência se traduz em números e resultados concretos:
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
                                    <li className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                                        <span className="block text-2xl font-bold text-brand-600">14</span>
                                        <span className="text-sm font-medium">PPAs elaborados</span>
                                    </li>
                                    <li className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                                        <span className="block text-2xl font-bold text-brand-600">44</span>
                                        <span className="text-sm font-medium">LDOs estruturadas</span>
                                    </li>
                                    <li className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                                        <span className="block text-2xl font-bold text-brand-600">45</span>
                                        <span className="text-sm font-medium">LOAs desenvolvidas</span>
                                    </li>
                                </ul>
                                <p>
                                    Em uma nova etapa da sua história, a Provision amplia sua atuação com treinamentos e capacitações, preparando servidores e equipes técnicas para administrações mais técnicas, responsáveis e preparadas para os desafios do presente e do futuro.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-brand-200 rounded-2xl transform rotate-3 scale-105"></div>
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
                                alt="Equipe reunida"
                                className="relative rounded-2xl shadow-xl w-full object-cover h-[450px]"
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
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Oferecer assessoria, consultoria e capacitação em planejamento, orçamento e gestão pública, apoiando gestores e equipes técnicas na tomada de decisões seguras, no fortalecimento institucional e na correta aplicação dos recursos públicos.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-brand-500 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 mb-6">
                                <Eye size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Visão</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Ser reconhecida como referência em consultoria, assessoria e capacitação em gestão pública municipal, contribuindo para administrações mais eficientes, técnicas e preparadas, por meio de soluções estratégicas e formação contínua de pessoas.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-brand-500 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 mb-6">
                                <Award size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Valores</h3>
                            <ul className="space-y-3 text-slate-600 text-xs">
                                <li className="flex items-start"><CheckCircle size={14} className="text-brand-500 mr-2 mt-0.5" /> <strong>Responsabilidade Pública:</strong> Compromisso com a legalidade e transparência.</li>
                                <li className="flex items-start"><CheckCircle size={14} className="text-brand-500 mr-2 mt-0.5" /> <strong>Excelência Técnica:</strong> Atuação baseada em conhecimento sólido.</li>
                                <li className="flex items-start"><CheckCircle size={14} className="text-brand-500 mr-2 mt-0.5" /> <strong>Ética:</strong> Integridade e respeito institucional.</li>
                                <li className="flex items-start"><CheckCircle size={14} className="text-brand-500 mr-2 mt-0.5" /> <strong>Clareza:</strong> Comunicação objetiva e didática.</li>
                                <li className="flex items-start"><CheckCircle size={14} className="text-brand-500 mr-2 mt-0.5" /> <strong>Comprometimento:</strong> Dedicação real a cada projeto.</li>
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
