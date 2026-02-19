import PageHeader from '../components/ui/PageHeader';
import { HandCoins, FileCheck, BarChart3, Check } from 'lucide-react';
import ConsultingCTA from '../components/home/ConsultingCTA';

const Consulting = () => {
    const services = [
        {
            id: 'financeiro',
            title: 'Planejamento Orçamentário',
            icon: HandCoins,
            desc: 'Suporte integral na elaboração e execução das peças orçamentárias obrigatórias.',
            details: [
                'Elaboração do Plano Plurianual (PPA)',
                'Lei de Diretrizes Orçamentárias (LDO)',
                'Lei Orçamentária Anual (LOA)',
                'Audiências Públicas de Metas Fiscais',
                'Acompanhamento da Execução Orçamentária'
            ]
        },
        {
            id: 'contas',
            title: 'Prestação de Contas',
            icon: FileCheck,
            desc: 'Segurança jurídica nas prestações de contas junto aos Tribunais (TCE/TCU).',
            details: [
                'Análise prévia de conformidade',
                'Instrução de processos licitatórios',
                'Defesa técnica em processos administrativos',
                'Resposta a diligências do Tribunal de Contas',
                'Organização documental preventiva'
            ]
        },
        {
            id: 'gestao',
            title: 'Gestão Estratégica',
            icon: BarChart3,
            desc: 'Modernização administrativa e implementação de governança.',
            details: [
                'Reforma Administrativa e Organogramas',
                'Implantação de indicadores de desempenho',
                'Mapeamento e otimização de processos',
                'Consultoria em Recursos Humanos (Estatutos)',
                'Implantação de controles internos'
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <PageHeader
                title="Consultoria & Assessoria"
                subtitle="Apoio técnico especializado para tomadas de decisão seguras e eficientes."
                backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1920"
            />

            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-24">
                        {services.map((service, index) => (
                            <div key={service.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className="flex-1">
                                    <div className="w-16 h-16 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600 mb-6">
                                        <service.icon size={32} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 mb-4">{service.title}</h2>
                                    <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                                        {service.desc}
                                    </p>
                                    <ul className="space-y-4">
                                        {service.details.map((detail, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 text-green-600 mr-3">
                                                    <Check size={14} />
                                                </div>
                                                <span className="text-slate-700">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex-1 relative w-full">
                                    <div className="absolute inset-0 bg-slate-100 rounded-2xl transform rotate-3 scale-[0.98]"></div>
                                    <div className="relative bg-white p-2 rounded-2xl shadow-lg border border-slate-100">
                                        {/* Placeholder for service specific image */}
                                        <div className="aspect-video bg-slate-200 rounded-xl flex items-center justify-center text-slate-400">
                                            Imagem Ilustrativa: {service.title}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ConsultingCTA />
        </div>
    );
};

export default Consulting;
