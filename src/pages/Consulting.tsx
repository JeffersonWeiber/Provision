import PageHeader from '../components/ui/PageHeader';
import { HandCoins, BarChart3, Check } from 'lucide-react';
import ConsultingCTA from '../components/home/ConsultingCTA';

const Consulting = () => {
    const services = [
        {
            id: 'assessoria',
            title: 'Consultoria e Assessoria em Gestão Pública',
            icon: HandCoins,
            image: '/assets/images/assessoria.png',
            desc: 'Suporte estratégico e operacional para administrações municipais, câmaras e equipes técnicas.',
            details: [
                'Assessoria técnica especializada em planejamento e orçamento',
                'Elaboração e acompanhamento de instrumentos fundamentais (PPA, LDO, LOA)',
                'Suporte na tomada de decisões estratégicas',
                'Foco integral na legalidade, eficiência e clareza dos processos administrativo-financeiros',
                'Atendimento personalizado respeitando a realidade de cada órgão'
            ]
        },
        {
            id: 'in-company',
            title: 'Consultoria In Company',
            icon: BarChart3,
            image: '/assets/images/in-company.png',
            desc: 'Acompanhamento próximo, direto na estrutura do órgão, com análise prática das rotinas locais.',
            details: [
                'Apoio técnico contínuo presencial ou remoto dedicado',
                'Esclarecimento de dúvidas no dia a dia da administração',
                'Prevenção proativa de inconsistências e riscos fiscais',
                'Fortalecimento da autonomia técnica das equipes internas',
                'Análise prática das rotinas e orientação aplicada à realidade local'
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
                                    <div className="relative overflow-hidden rounded-2xl shadow-xl transition-transform hover:scale-[1.02] duration-500">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover aspect-video"
                                        />
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
