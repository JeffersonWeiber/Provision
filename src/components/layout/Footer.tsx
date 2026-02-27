import { Phone, Mail, Instagram, Linkedin, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo-provision.svg';
import { useSettings } from '../../hooks/useSettings';
import { useAddLead } from '../../hooks/useLeads';
import { useState } from 'react';

const Footer = () => {
    const { data: settings } = useSettings();
    const addLeadMutation = useAddLead();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const contactEmail = settings?.contact_email || 'contato@provision.com.br';
    const contactPhone = settings?.contact_whatsapp || '45999184518';
    const formattedPhone = contactPhone.length >= 11
        ? `(${contactPhone.slice(0, 2)}) ${contactPhone.slice(2, 7)}-${contactPhone.slice(7)}`
        : contactPhone.length === 10
            ? `(${contactPhone.slice(0, 2)}) ${contactPhone.slice(2, 6)}-${contactPhone.slice(6)}`
            : contactPhone;

    const socialLinks = [
        { icon: Instagram, url: settings?.instagram_url || 'https://instagram.com/provision', label: 'Instagram' },
        { icon: Facebook, url: settings?.facebook_url || 'https://facebook.com/provision', label: 'Facebook' },
        { icon: Linkedin, url: settings?.linkedin_url || 'https://linkedin.com/company/provision', label: 'LinkedIn' },
        { icon: Youtube, url: settings?.youtube_url || 'https://youtube.com/provision', label: 'YouTube' }
    ];

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        addLeadMutation.mutate({
            name: 'Inscrito Newsletter',
            email: email,
            source: 'Newsletter Footer',
            lgpd_consent: true,
        }, {
            onSuccess: () => {
                setStatus('success');
                setEmail('');
                setTimeout(() => setStatus('idle'), 5000);
            },
            onError: (error) => {
                console.error('Newsletter error:', error);
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        });
    };
    return (
        <footer className="bg-slate-900 text-slate-300">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <img src={Logo} alt="Provision Logo" className="h-8 w-auto mb-4" />
                        <p className="text-sm leading-relaxed mb-4">
                            {settings?.site_description || 'Soluções técnicas especializadas para uma gestão pública segura, eficiente e transparente.'}
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                    title={social.label}
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Institucional</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/sobre" className="hover:text-white transition-colors">Quem Somos</Link></li>
                            <li><Link to="/consultoria" className="hover:text-white transition-colors">Consultoria</Link></li>
                            <li><Link to="/cursos" className="hover:text-white transition-colors">Cursos Presenciais</Link></li>
                            <li><Link to="/conteudos" className="hover:text-white transition-colors">Conteúdos Normativos</Link></li>
                            <li><Link to="/politica-privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contato</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center">
                                <Phone size={18} className="mr-2 text-brand-400" />
                                <span>{formattedPhone}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter opacity-70">CNPJ: 18.269.031/0001-08</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={18} className="mr-2 text-brand-400" />
                                <span>{contactEmail}</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Atualizações</h3>
                        <p className="text-sm mb-4">Receba novidades e atualizações normativas no seu email.</p>

                        {status === 'success' ? (
                            <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-3 rounded text-sm animate-in fade-in duration-300">
                                📩 Inscrição confirmada com sucesso!
                            </div>
                        ) : (
                            <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-2">
                                <input
                                    type="email"
                                    required
                                    placeholder="Seu email institucional"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={status === 'loading'}
                                    className="bg-slate-800 text-white px-4 py-2 rounded border border-slate-700 focus:outline-none focus:border-brand-500 text-sm disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="bg-brand-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-brand-700 transition-colors flex items-center justify-center disabled:opacity-50"
                                >
                                    {status === 'loading' ? (
                                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        'Inscrever-se'
                                    )}
                                </button>
                                {status === 'error' && (
                                    <p className="text-xs text-red-400 mt-1">Ocorreu um erro. Tente novamente.</p>
                                )}
                            </form>
                        )}
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Provision Consultoria. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
