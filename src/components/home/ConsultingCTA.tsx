import { MessageCircle } from 'lucide-react';

const ConsultingCTA = () => {
  return (
    <section className="py-20 bg-brand-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-800 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-700 rounded-full opacity-50 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Precisa de suporte técnico especializado?
        </h2>
        <p className="text-brand-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Nossa equipe está pronta para realizar um diagnóstico completo da situação administrativa do seu município.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://wa.me/5545999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-lg text-lg font-bold transition-all shadow-lg hover:shadow-[#25d366]/30"
          >
            <MessageCircle className="mr-2" size={24} />
            Conversar no WhatsApp
          </a>
          <a
            href="/contato"
            className="inline-flex items-center justify-center bg-white text-brand-900 hover:bg-brand-50 px-8 py-4 rounded-lg text-lg font-bold transition-colors shadow-md"
          >
            Solicitar Diagnóstico
          </a>
        </div>
      </div>
    </section>
  );
};

export default ConsultingCTA;
