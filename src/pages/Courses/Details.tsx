import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../../hooks/useProducts';
import { Calendar, MapPin, Clock, ArrowLeft, CheckCircle, FileText } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Modal from '../../components/ui/Modal';
import { maskPhone } from '../../utils/masks';

const CourseDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data: course, isLoading, error } = useProduct(id || '', true);

    const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
    const [enrollForm, setEnrollForm] = useState({ name: '', email: '', phone: '', org: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (isLoading) {
        return <div className="container mx-auto py-20 text-center">Carregando detalhes do curso...</div>;
    }

    if (error || !course) {
        return <div className="container mx-auto py-20 text-center text-red-500">Curso não encontrado.</div>;
    }

    const handleEnrollSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (!supabase) throw new Error('Supabase client not initialized');

            // 1. CRM - Lead
            const { data: lead, error: leadError } = await supabase
                .from('leads')
                .upsert({
                    name: enrollForm.name,
                    email: enrollForm.email,
                    phone: enrollForm.phone,
                    organization_name: enrollForm.org,
                    source: 'enrollment',
                    lgpd_consent: true,
                    status: 'new'
                }, { onConflict: 'email' })
                .select()
                .single();

            if (leadError) throw leadError;

            // 2. Enrollment
            const { error: enrollError } = await supabase
                .from('enrollments')
                .insert({
                    lead_id: lead.id,
                    product_id: course.id,
                    status: 'pending'
                });

            if (enrollError) throw enrollError;

            setIsSuccess(true);
            setTimeout(() => {
                setIsEnrollModalOpen(false);
                setIsSuccess(false);
                setEnrollForm({ name: '', email: '', phone: '', org: '' });
            }, 5000);
        } catch (err) {
            console.error('Erro na inscrição:', err);
            alert('Erro ao realizar inscrição. Por favor, tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const programItems = course.settings?.program
        ? course.settings.program.split('\n').filter((i: string) => i.trim() !== '')
        : [];

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header / Hero */}
            <div className="bg-slate-900 text-white relative py-20">
                <div className="absolute inset-0 overflow-hidden">
                    <img src={course.thumbnail_url || 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1920'} className="w-full h-full object-cover opacity-10 blur-sm" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <Link to="/cursos" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors font-medium">
                        <ArrowLeft size={18} className="mr-2" /> Voltar para lista
                    </Link>
                    <div className="flex items-center space-x-4 mb-4">
                        <span className="bg-brand-600 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">{course.settings?.category || 'Geral'}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-6 max-w-4xl leading-tight">{course.title}</h1>

                    <div className="flex flex-wrap gap-6 text-sm md:text-base text-slate-300">
                        <span className="flex items-center"><Calendar className="mr-2 text-brand-400" size={20} /> {course.settings?.date || 'A definir'}</span>
                        <span className="flex items-center"><Clock className="mr-2 text-brand-400" size={20} /> {course.settings?.time || 'A definir'}</span>
                        <span className="flex items-center"><MapPin className="mr-2 text-brand-400" size={20} /> {course.settings?.city || 'Online'}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-8 border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Sobre o Curso</h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <div className="whitespace-pre-wrap mb-10">
                                {course.description || 'Nenhuma descrição disponível para este curso.'}
                            </div>

                            {programItems.length > 0 && (
                                <>
                                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Conteúdo Programático</h3>
                                    <ul className="grid gap-3">
                                        {programItems.map((item: string, idx: number) => (
                                            <li key={idx} className="flex items-start">
                                                <CheckCircle size={18} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Sidebar / Actions */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-brand-100 sticky top-24">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Inscreva-se Agora</h3>
                            <div className="mb-6">
                                <span className="block text-sm text-slate-500 mb-1">Local do evento:</span>
                                <p className="font-semibold text-slate-800">{course.settings?.location || 'A definir'}</p>
                                <p className="text-slate-600 text-sm">{course.settings?.city || 'Online / A definir'}</p>
                            </div>

                            <button
                                onClick={() => setIsEnrollModalOpen(true)}
                                className="w-full flex items-center justify-center bg-brand-600 text-white py-4 px-4 rounded-lg font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 mb-3 text-lg"
                            >
                                Garantir minha vaga
                            </button>

                            {course.settings?.syllabus_url && (
                                <a
                                    href={course.settings.syllabus_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full flex items-center justify-center bg-white border border-slate-300 text-slate-700 py-3 px-4 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                                >
                                    <FileText size={18} className="mr-2" />
                                    Baixar cronograma (PDF)
                                </a>
                            )}

                            <p className="text-xs text-center text-slate-400 mt-4">
                                Vagas limitadas. Inscrição sujeita a confirmação.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enrollment Modal */}
            <Modal
                isOpen={isEnrollModalOpen}
                onClose={() => setIsEnrollModalOpen(false)}
                title="Inscrição no Curso"
            >
                {isSuccess ? (
                    <div className="py-8 text-center">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100 animate-bounce">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Inscrição Recebida!</h3>
                        <p className="text-slate-600 mb-8">
                            Obrigado pelo seu interesse! Nossa equipe técnica entrará em contato em breve para finalizar os detalhes da sua matrícula e enviar as informações complementares.
                        </p>
                        <button
                            onClick={() => {
                                setIsEnrollModalOpen(false);
                                setIsSuccess(false); // Reset success state for next time
                                setEnrollForm({ name: '', email: '', phone: '', org: '' }); // Reset form
                            }}
                            className="bg-brand-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-700 transition-all w-full"
                        >
                            Entendido
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleEnrollSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Nome Completo</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                value={enrollForm.name}
                                onChange={e => setEnrollForm({ ...enrollForm, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Órgão / Prefeitura</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                value={enrollForm.org}
                                onChange={e => setEnrollForm({ ...enrollForm, org: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">E-mail</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                    value={enrollForm.email}
                                    onChange={e => setEnrollForm({ ...enrollForm, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Telefone / WhatsApp</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                    value={enrollForm.phone}
                                    onChange={e => setEnrollForm({ ...enrollForm, phone: maskPhone(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setIsEnrollModalOpen(false)}
                                className="flex-1 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors font-bold"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-brand-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Processando...' : 'Confirmar Inscrição'}
                            </button>
                        </div>
                        <p className="text-[10px] text-center text-slate-400">
                            Ao se inscrever, você concorda com nossa Política de Privacidade.
                        </p>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default CourseDetails;
