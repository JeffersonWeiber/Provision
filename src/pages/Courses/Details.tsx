import { useParams, Link } from 'react-router-dom';
import { MOCK_COURSES } from '../../data/mocks';
import { Calendar, MapPin, Clock, ArrowLeft, CheckCircle, FileText } from 'lucide-react';

const CourseDetails = () => {
    const { id } = useParams<{ id: string }>();
    const course = MOCK_COURSES.find(c => c.id === id);

    if (!course) {
        return <div className="container mx-auto py-20 text-center">Curso não encontrado.</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header / Hero */}
            <div className="bg-slate-900 text-white relative py-20">
                <div className="absolute inset-0 overflow-hidden">
                    <img src={course.image} className="w-full h-full object-cover opacity-10 blur-sm" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <Link to="/cursos" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
                        <ArrowLeft size={18} className="mr-2" /> Voltar para lista
                    </Link>
                    <div className="flex items-center space-x-4 mb-4">
                        <span className="bg-brand-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-wide">{course.category}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-6 max-w-4xl leading-tight">{course.title}</h1>

                    <div className="flex flex-wrap gap-6 text-sm md:text-base text-slate-300">
                        <span className="flex items-center"><Calendar className="mr-2 text-brand-400" /> {course.date}</span>
                        <span className="flex items-center"><Clock className="mr-2 text-brand-400" /> {course.time}</span>
                        <span className="flex items-center"><MapPin className="mr-2 text-brand-400" /> {course.city}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-8 border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Sobre o Curso</h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p className="mb-4">
                                Este curso tem como objetivo capacitar os servidores públicos na compreensão e aplicação prática das normas vigentes.
                                Abordaremos estudos de caso reais, jurisprudência atualizada do TCE/PR e TCU, além de oficinas para resolução de problemas cotidianos.
                            </p>
                            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Conteúdo Programático</h3>
                            <ul className="grid gap-3">
                                <li className="flex items-start"><CheckCircle size={18} className="text-green-500 mr-3 mt-1" /> Introdução e Conceitos Fundamentais</li>
                                <li className="flex items-start"><CheckCircle size={18} className="text-green-500 mr-3 mt-1" /> Legislação Aplicada e Atualizações recentes</li>
                                <li className="flex items-start"><CheckCircle size={18} className="text-green-500 mr-3 mt-1" /> Procedimentos Administrativos Passo-a-passo</li>
                                <li className="flex items-start"><CheckCircle size={18} className="text-green-500 mr-3 mt-1" /> Análise de Riscos e Pontos de Controle</li>
                                <li className="flex items-start"><CheckCircle size={18} className="text-green-500 mr-3 mt-1" /> Estudo de Casos Práticos</li>
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar / Actions */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-brand-100 sticky top-24">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Inscreva-se Agora</h3>
                            <div className="mb-6">
                                <span className="block text-sm text-slate-500 mb-1">Local do evento:</span>
                                <p className="font-semibold text-slate-800">{course.location}</p>
                                <p className="text-slate-600 text-sm">{course.city}</p>
                            </div>

                            <a
                                href="https://wa.me/5545999999999"
                                target="_blank"
                                rel="noreferrer"
                                className="w-full flex items-center justify-center bg-brand-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 mb-3"
                            >
                                Garantir minha vaga
                            </a>
                            <button className="w-full flex items-center justify-center bg-white border border-slate-300 text-slate-700 py-3 px-4 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                                <FileText size={18} className="mr-2" />
                                Baixar cronograma (PDF)
                            </button>
                            <p className="text-xs text-center text-slate-400 mt-4">
                                Vagas limitadas. Inscrição sujeita a confirmação.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
