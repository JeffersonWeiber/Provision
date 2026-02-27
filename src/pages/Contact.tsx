import { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { maskPhone } from '../utils/masks';
import { useAddLead } from '../hooks/useLeads';
import { useSettings } from '../hooks/useSettings';

const Contact = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const { data: settings } = useSettings();
    const addLeadMutation = useAddLead();

    const contactEmail = settings?.contact_email || 'contato@provision.com.br';
    const contactPhone = settings?.contact_whatsapp || '45999184518';
    const formattedPhone = contactPhone.length > 10
        ? `(${contactPhone.slice(2, 4)}) ${contactPhone.slice(4, 9)}-${contactPhone.slice(9)}`
        : contactPhone;

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        org: '',
        role: '',
        email: '',
        message: '',
        lgpd: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        addLeadMutation.mutate({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            organization_name: formData.org,
            role_title: formData.role,
            lgpd_consent: formData.lgpd,
            source: 'Formulário Contato',
        }, {
            onSuccess: () => {
                setStatus('success');
                setIsSubmitted(true);
            },
            onError: (error) => {
                console.error('Contact form error:', error);
                setStatus('error');
            }
        });
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-slate-50">
                <PageHeader
                    title="Mensagem Enviada"
                    subtitle="Agradecemos seu contato. Nossa equipe técnica retornará em breve."
                    backgroundImage="https://images.unsplash.com/photo-1423666639041-f14d70fa4c4d?auto=format&fit=crop&q=80&w=1920"
                />
                <section className="py-32 text-center">
                    <div className="container mx-auto px-4 flex flex-col items-center">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100 animate-bounce">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Solicitação Recebida!</h2>
                        <p className="text-slate-600 max-w-md mx-auto mb-8">
                            Seus dados foram registrados com sucesso. Um especialista entrará em contato pelo telefone ou email informado para dar continuidade ao atendimento.
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="bg-brand-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-700 transition-all"
                        >
                            Voltar para o formulário
                        </button>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <PageHeader
                title="Fale Conosco"
                subtitle="Estamos prontos para atender as demandas do seu município."
                backgroundImage="https://images.unsplash.com/photo-1423666639041-f14d70fa4c4d?auto=format&fit=crop&q=80&w=1920"
            />

            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Entre em contato</h2>
                            <p className="text-slate-600 mb-10 text-lg">
                                Utilize o formulário para solicitar orçamentos, tirar dúvidas sobre cursos ou agendar uma reunião com nossa equipe técnica.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600 flex-shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="text-lg font-bold text-slate-900">Telefone / WhatsApp</h3>
                                        <p className="text-slate-600 mt-1">{formattedPhone}</p>
                                        <p className="text-slate-500 text-sm">Segunda a Sexta, das 08:00 às 18:00</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600 flex-shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="text-lg font-bold text-slate-900">Email</h3>
                                        <p className="text-slate-600 mt-1">{contactEmail}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600 flex-shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="text-lg font-bold text-slate-900">Sede Administrativa</h3>
                                        <p className="text-slate-600 mt-1">
                                            Toledo - Paraná<br />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Nome Completo</label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Seu nome"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Telefone</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                                            placeholder="(00) 00000-0000"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: maskPhone(e.target.value) })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="org" className="block text-sm font-medium text-slate-700 mb-2">Órgão / Prefeitura</label>
                                        <input
                                            type="text"
                                            id="org"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Ex: Prefeitura de Toledo"
                                            value={formData.org}
                                            onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">Cargo / Função</label>
                                        <input
                                            type="text"
                                            id="role"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Ex: Secretário"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Institucional</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                                        placeholder="seu.email@toledo.pr.gov.br"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Mensagem ou Solicitação</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Como podemos ajudar?"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="flex items-start">
                                    <input
                                        type="checkbox"
                                        id="lgpd"
                                        required
                                        className="w-4 h-4 mt-1 text-brand-600 border-slate-300 rounded focus:ring-brand-500"
                                        checked={formData.lgpd}
                                        onChange={(e) => setFormData({ ...formData, lgpd: e.target.checked })}
                                    />
                                    <label htmlFor="lgpd" className="ml-2 text-sm text-slate-600">
                                        Concordo com a <a href="#" className="text-brand-600 hover:underline">Política de Privacidade</a> e autorizo o processamento dos meus dados para fins de atendimento técnico e comercial.
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full flex items-center justify-center bg-brand-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 disabled:opacity-50"
                                >
                                    {status === 'loading' ? (
                                        <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                    ) : (
                                        <Send size={20} className="mr-2" />
                                    )}
                                    {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
                                </button>
                                {status === 'error' && (
                                    <p className="text-center text-red-500 font-bold mt-4 animate-bounce">
                                        Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente via WhatsApp.
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
