import { HandCoins, FileCheck, BarChart3, GraduationCap } from 'lucide-react';

const ActionAreas = () => {
  const areas = [
    {
      title: 'Planejamento Orçamentário',
      desc: 'Elaboração e revisão de PPA, LDO e LOA com rigor técnico e alinhamento estratégico.',
      icon: HandCoins,
    },
    {
      title: 'Prestação de Contas',
      desc: 'Suporte completo para conformidade com TCE/TCU, análise de riscos e defesa técnica.',
      icon: FileCheck,
    },
    {
      title: 'Gestão Estratégica',
      desc: 'Implementação de indicadores, governança e modernização da estrutura administrativa.',
      icon: BarChart3,
    },
    {
      title: 'Capacitação Técnica',
      desc: 'Treinamentos presenciais e online focados na prática do servidor público municipal.',
      icon: GraduationCap,
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-700 font-semibold tracking-wide uppercase text-sm mb-2">O Que Fazemos</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Áreas de Atuação</h3>
          <p className="mt-4 text-slate-600 text-lg">
            Combinamos conhecimento jurídico, contábil e administrativo para entregar resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {areas.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group"
            >
              <div className="w-14 h-14 bg-brand-50 rounded-lg flex items-center justify-center mb-6 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <item.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionAreas;
