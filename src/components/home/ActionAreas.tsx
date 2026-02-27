import { HandCoins, FileCheck, GraduationCap } from 'lucide-react';

const ActionAreas = () => {
  const products = [
    {
      title: 'Consultoria e Assessoria',
      desc: 'Suporte técnico especializado em planejamento, orçamento e gestão pública para prefeituras e câmaras.',
      icon: HandCoins,
    },
    {
      title: 'Consultoria In Company',
      desc: 'Acompanhamento próximo e orientação técnica aplicada diretamente na rotina da sua equipe.',
      icon: FileCheck,
    },
    {
      title: 'Cursos e Capacitações',
      desc: 'Desenvolvimento prático e formação contínua de servidores com foco na legislação vigente.',
      icon: GraduationCap,
    },
  ];

  const expertise = [
    { title: 'Planejamento Governamental', areas: 'PPA, LDO, LOA' },
    { title: 'Orçamento Público', areas: 'Execução e Fiscalização' },
    { title: 'Apoio Técnico', areas: 'Acompanhamento e Gestão' },
    { title: 'Capacitação', areas: 'Gestores e Equipes' },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-700 font-semibold tracking-wide uppercase text-sm mb-2">O Que Fazemos</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 border-b-2 border-brand-500 inline-block pb-2 mb-6">Nossos Serviços</h3>
          <p className="text-slate-600 text-lg italic">
            "Soluções técnicas especializadas para uma gestão pública segura, eficiente e transparente."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {products.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group"
            >
              <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-6 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <item.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-brand-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-brand-300 font-semibold tracking-wide uppercase text-sm mb-2">Expertise Técnica</h2>
              <h3 className="text-3xl font-bold mb-6">Áreas de Atuação</h3>
              <p className="text-brand-100 mb-8 leading-relaxed">
                Orientação técnica para processos e rotinas, garantindo conformidade e eficiência administrativa em cada etapa govenamental.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expertise.map((item, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-brand-200 text-sm">{item.areas}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionAreas;
