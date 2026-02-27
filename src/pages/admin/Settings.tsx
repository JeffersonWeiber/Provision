import React, { useState, useEffect } from 'react';
import {
    Settings as SettingsIcon,
    Save,
    Globe,
    ShieldCheck,
    Share2,
    Mail,
    Phone,
    MessageSquare,
    CheckCircle2,
    AlertCircle,
    BarChart3
} from 'lucide-react';
import { useSettings, useUpdateSettings } from '../../hooks/useSettings';

const Settings = () => {
    const { data: initialSettings, isLoading: isFetching } = useSettings();
    const updateSettingsMutation = useUpdateSettings();

    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [activeTab, setActiveTab] = useState<'geral' | 'lgpd' | 'social' | 'marketing'>('geral');

    // State for local editing
    const [settings, setSettings] = useState({
        site_title: '',
        site_description: '',
        contact_email: '',
        contact_whatsapp: '',
        cookie_banner_text: '',
        privacy_policy: '',
        terms_of_use: '',
        instagram_url: '',
        facebook_url: '',
        linkedin_url: '',
        youtube_url: '',
        google_analytics_id: '',
        google_tag_manager_id: '',
        meta_pixel_id: ''
    });

    useEffect(() => {
        if (initialSettings) {
            setSettings(prev => ({ ...prev, ...initialSettings }));
        }
    }, [initialSettings]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        updateSettingsMutation.mutate(settings, {
            onSuccess: () => {
                setMessage({ type: 'success', text: 'Configurações salvas com sucesso!' });
                setTimeout(() => setMessage(null), 3000);
            },
            onError: (error: any) => {
                console.error('Erro ao salvar:', error);
                setMessage({ type: 'error', text: 'Erro ao salvar as configurações. Tente novamente.' });
            }
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    if (isFetching) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
            </div>
        );
    }

    const tabs = [
        { id: 'geral', label: 'Geral', icon: Globe },
        { id: 'lgpd', label: 'LGPD & Privacidade', icon: ShieldCheck },
        { id: 'social', label: 'Redes Sociais', icon: Share2 },
        { id: 'marketing', label: 'Marketing & SEO', icon: BarChart3 }
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <SettingsIcon className="text-brand-600" size={28} />
                        Configurações do Sistema
                    </h1>
                    <p className="text-slate-500 text-sm">Gerencie as informações institucionais e regulatórias do site.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={updateSettingsMutation.isPending}
                    className="bg-brand-600 text-white px-6 py-2.5 rounded-xl hover:bg-brand-700 transition-all flex items-center shadow-lg shadow-brand-200 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    {updateSettingsMutation.isPending ? (
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    ) : (
                        <Save size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                    )}
                    Salvar Alterações
                </button>
            </div>

            {/* Notification Toast */}
            {message && (
                <div className={`mb-6 p-4 rounded-xl border flex items-center gap-3 animate-in slide-in-from-top-full duration-300 ${message.type === 'success'
                    ? 'bg-green-50 border-green-100 text-green-800 shadow-sm'
                    : 'bg-red-50 border-red-100 text-red-800 shadow-sm'
                    }`}>
                    {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <span className="font-medium">{message.text}</span>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden flex flex-col md:flex-row">
                {/* Tabs Sidebar */}
                <div className="w-full md:w-64 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-4 shrink-0">
                    <nav className="space-y-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                                    ? 'bg-white text-brand-600 shadow-sm border border-slate-200'
                                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                                    }`}
                            >
                                <tab.icon size={18} className={activeTab === tab.id ? 'text-brand-600' : 'text-slate-400'} />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Form Content */}
                <div className="flex-1 p-6 md:p-8">
                    <form onSubmit={handleSave} className="space-y-8">
                        {/* Tab: Geral */}
                        {activeTab === 'geral' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Informações Institucionais</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Título do Site (SEO)</label>
                                            <input
                                                type="text"
                                                name="site_title"
                                                value={settings.site_title}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-slate-50/50"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Descrição Curta (Hero)</label>
                                            <textarea
                                                name="site_description"
                                                rows={3}
                                                value={settings.site_description}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-slate-50/50"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Contato Direto</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                                <Mail size={12} /> E-mail de Suporte
                                            </label>
                                            <input
                                                type="email"
                                                name="contact_email"
                                                value={settings.contact_email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-slate-50/50"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                                <Phone size={12} /> WhatsApp (apenas números)
                                            </label>
                                            <input
                                                type="text"
                                                name="contact_whatsapp"
                                                value={settings.contact_whatsapp}
                                                onChange={handleChange}
                                                placeholder="Ex: 554599999999"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-slate-50/50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab: LGPD */}
                        {activeTab === 'lgpd' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                                        <ShieldCheck className="text-green-600" size={20} />
                                        Configurações de Privacidade
                                    </h3>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mensagem do Banner de Cookies</label>
                                        <textarea
                                            name="cookie_banner_text"
                                            rows={2}
                                            value={settings.cookie_banner_text}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-slate-50/50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <MessageSquare size={12} /> Política de Privacidade (Markdown/HTML)
                                        </label>
                                        <textarea
                                            name="privacy_policy"
                                            rows={8}
                                            value={settings.privacy_policy}
                                            onChange={handleChange}
                                            placeholder="Insira o texto legal aqui..."
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-slate-50/50 font-mono text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <MessageSquare size={12} /> Termos de Uso (Markdown/HTML)
                                        </label>
                                        <textarea
                                            name="terms_of_use"
                                            rows={8}
                                            value={settings.terms_of_use}
                                            onChange={handleChange}
                                            placeholder="Insira os termos de uso aqui..."
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-slate-50/50 font-mono text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab: Social */}
                        {activeTab === 'social' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Presença Digital</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Instagram</label>
                                            <input
                                                type="url"
                                                name="instagram_url"
                                                value={settings.instagram_url}
                                                onChange={handleChange}
                                                placeholder="https://instagram.com/perfil"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-slate-50/50"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">LinkedIn</label>
                                            <input
                                                type="url"
                                                name="linkedin_url"
                                                value={settings.linkedin_url}
                                                onChange={handleChange}
                                                placeholder="https://linkedin.com/company/perfil"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-slate-50/50"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Facebook</label>
                                            <input
                                                type="url"
                                                name="facebook_url"
                                                value={settings.facebook_url}
                                                onChange={handleChange}
                                                placeholder="https://facebook.com/perfil"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-slate-50/50"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">YouTube</label>
                                            <input
                                                type="url"
                                                name="youtube_url"
                                                value={settings.youtube_url}
                                                onChange={handleChange}
                                                placeholder="https://youtube.com/c/canal"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-slate-50/50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab: Marketing & SEO */}
                        {activeTab === 'marketing' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Rastreamento e Conversão</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Google Analytics (UA/GA4)</label>
                                            <input
                                                type="text"
                                                name="google_analytics_id"
                                                value={settings.google_analytics_id}
                                                onChange={handleChange}
                                                placeholder="Ex: G-XXXXXXXXXX"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-slate-50/50"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Google Tag Manager ID</label>
                                            <input
                                                type="text"
                                                name="google_tag_manager_id"
                                                value={settings.google_tag_manager_id}
                                                onChange={handleChange}
                                                placeholder="Ex: GTM-XXXXXXX"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-slate-50/50"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Meta Pixel ID</label>
                                            <input
                                                type="text"
                                                name="meta_pixel_id"
                                                value={settings.meta_pixel_id}
                                                onChange={handleChange}
                                                placeholder="Ex: 1234567890"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-slate-50/50"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                                        <p className="text-xs text-amber-800 flex items-start gap-2">
                                            <AlertCircle size={14} className="shrink-0 mt-0.5" />
                                            Certifique-se de inserir apenas as IDs. O sistema cuidará da injeção correta dos scripts no cabeçalho do site.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={18} />
                <p className="text-xs text-blue-700 leading-relaxed">
                    <strong>Dica Técnica:</strong> Estas configurações afetam metadados globais e conteúdos legais do site. Alterações nas Redes Sociais e Contatos são refletidas imediatamente no Rodapé e na página de Contato da área pública.
                </p>
            </div>
        </div>
    );
};

export default Settings;
