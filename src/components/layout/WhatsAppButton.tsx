import { useSettings } from '../../hooks/useSettings';

const WHATSAPP_LOGO_URL = 'https://wyskqemodtuxxnfpxshl.supabase.co/storage/v1/object/public/public-assets/WhatsApp-Logo.wine.svg';

const WhatsAppButton = () => {
    const { data: settings } = useSettings();
    const whatsappNumber = settings?.contact_whatsapp || '5545999999999';
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 hover:scale-110 transition-transform flex items-center justify-center group"
            title="Fale conosco no WhatsApp"
        >
            <img
                src={WHATSAPP_LOGO_URL}
                alt="WhatsApp"
                className="w-24 h-24 object-contain drop-shadow-xl"
            />
            <span className="absolute right-full mr-3 bg-white text-slate-800 px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
                Falar com Consultor
            </span>
        </a>
    );
};

export default WhatsAppButton;
