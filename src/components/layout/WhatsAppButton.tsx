import { MessageCircle } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';

const WhatsAppButton = () => {
    const { data: settings } = useSettings();
    const whatsappNumber = settings?.contact_whatsapp || '5545999999999';
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all transform hover:scale-110 flex items-center justify-center group"
            title="Fale conosco no WhatsApp"
        >
            <MessageCircle size={32} />
            <span className="absolute right-full mr-3 bg-white text-slate-800 px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
                Falar com Consultor
            </span>
        </a>
    );
};

export default WhatsAppButton;
