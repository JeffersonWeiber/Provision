import { useState, useRef } from 'react';
import type { Product } from '../../../hooks/useProducts';
import { useProducts } from '../../../hooks/useProducts';
import { supabase } from '../../../lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { Search, BookOpen, Calendar, MapPin, MoreVertical, Plus, UploadCloud, FileText } from 'lucide-react';
import Modal from '../../../components/ui/Modal';
import { maskDate, maskCurrency } from '../../../utils/masks';

const AdminCoursesList = () => {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const { data: courses = [], isLoading } = useProducts('all');
    const [isEditing, setIsEditing] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [courseForm, setCourseForm] = useState({
        title: '',
        category: 'Presencial',
        city: '',
        location: '',
        date: '',
        time: '',
        investment: '',
        description: '',
        thumbnail_url: '',
        syllabus_url: '',
        program: ''
    });

    const handleEditClick = (course: any) => {
        setCourseForm({
            title: course.title || '',
            category: course.settings?.category || 'Presencial',
            city: course.settings?.city || '',
            location: course.settings?.location || '',
            date: course.settings?.date || '',
            time: course.settings?.time || '',
            investment: course.price ? `R$ ${course.price.toFixed(2).replace('.', ',')}` : '',
            description: course.description || '',
            thumbnail_url: course.thumbnail_url || '',
            syllabus_url: course.settings?.syllabus_url || '',
            program: course.settings?.program || ''
        });
        setSelectedCourse(course);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setUploadingImage(true);

        try {
            if (!supabase) throw new Error('Supabase não está configurado.');
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('course-images')
                .upload(fileName, file);

            if (uploadError) {
                console.error('Erro no upload para course-images:', uploadError);
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('course-images')
                .getPublicUrl(fileName);

            setCourseForm(prev => ({ ...prev, thumbnail_url: publicUrl }));
        } catch (err: any) {
            console.error('Upload error:', err);
            alert(`Erro no upload: ${err?.message || 'Tente novamente.'}`);
        } finally {
            setUploadingImage(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleSyllabusUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];

        try {
            if (!supabase) throw new Error('Supabase não está configurado.');
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('course-docs')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('course-docs')
                .getPublicUrl(fileName);

            setCourseForm(prev => ({ ...prev, syllabus_url: publicUrl }));
            alert('PDF enviado com sucesso!');
        } catch (err: any) {
            console.error('Upload error:', err);
            alert(`Erro no upload do PDF: ${err?.message || 'Tente novamente.'}`);
        }
    };

    const handleDeleteCourse = async (id: string) => {
        if (!supabase) return;
        if (confirm('Tem certeza que deseja excluir este curso?')) {
            try {
                await supabase.from('products').delete().eq('id', id);
                queryClient.invalidateQueries({ queryKey: ['products'] });
                alert('Curso excluído com sucesso!');
            } catch (error) {
                console.error("Erro ao excluir", error);
                alert("Falha ao excluir o curso.");
            }
        }
    };

    const handleCourseSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const productData = {
                title: courseForm.title,
                slug: courseForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
                type: 'presential',
                status: 'published',
                price: parseFloat(courseForm.investment.replace(/[^0-9,]/g, '').replace(',', '.')) || null,
                description: courseForm.description,
                thumbnail_url: courseForm.thumbnail_url || null,
                settings: {
                    category: courseForm.category,
                    city: courseForm.city,
                    location: courseForm.location,
                    date: courseForm.date,
                    time: courseForm.time,
                    program: courseForm.program,
                    syllabus_url: courseForm.syllabus_url
                }
            };

            if (!supabase) throw new Error('Supabase client not initialized');

            if (isEditing && selectedCourse?.id) {
                const { error } = await supabase.from('products').update(productData).eq('id', selectedCourse.id);
                if (error) throw error;
                alert('Curso atualizado com sucesso!');
            } else {
                const { error } = await supabase.from('products').insert([productData]);
                if (error) throw error;
                alert('Curso criado com sucesso!');
            }

            queryClient.invalidateQueries({ queryKey: ['products'] });
            setIsModalOpen(false);
        } catch (error: any) {
            console.error("Erro ao salvar", error);
            alert(`Falha ao salvar o curso: ${error?.message || 'Erro desconhecido'}`);
        }
    };

    const filteredCourses = courses.filter((course: Product) => {
        return course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (course.settings?.city || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (course.settings?.category || '').toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Cursos e Treinamentos</h1>
                    <p className="text-slate-500">Gerencie a grade de cursos presenciais e online.</p>
                </div>
                <button
                    onClick={() => {
                        setIsEditing(false);
                        setCourseForm({
                            title: '',
                            category: 'Presencial',
                            city: '',
                            location: '',
                            date: '',
                            time: '',
                            investment: '',
                            description: '',
                            thumbnail_url: '',
                            syllabus_url: '',
                            program: ''
                        });
                        setIsModalOpen(true);
                    }}
                    className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors flex items-center shadow-lg shadow-brand-200"
                >
                    <Plus size={20} className="mr-2" />
                    Novo Curso
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por título, cidade ou categoria..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Curso</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data / Horário</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Local</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Categoria</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                        Carregando cursos...
                                    </td>
                                </tr>
                            ) : filteredCourses.map((course: Product) => (
                                <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-lg bg-brand-100 flex items-center justify-center text-brand-600 mr-3 flex-shrink-0 relative overflow-hidden">
                                                {course.thumbnail_url ? (
                                                    <img src={course.thumbnail_url} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <BookOpen size={20} />
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-slate-900 line-clamp-1">{course.title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-slate-600">
                                            <Calendar size={14} className="mr-2" /> {course.settings?.date || '-'}
                                        </div>
                                        <div className="text-xs text-slate-400 ml-6">{course.settings?.time || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-slate-600">
                                            <MapPin size={14} className="mr-2" /> {course.settings?.city || '-'}
                                        </div>
                                        <div className="text-xs text-slate-400 ml-6 truncate max-w-[150px]">{course.settings?.location || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${course.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
                                            {course.settings?.category || 'Geral'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEditClick(course)}
                                                className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                                                title="Editar"
                                            >
                                                <MoreVertical size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCourse(course.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Excluir"
                                            >
                                                <Plus size={18} className="rotate-45" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {!isLoading && filteredCourses.length === 0 && (
                    <div className="p-8 text-center text-slate-500">
                        Nenhum curso encontrado.
                    </div>
                )}
            </div>

            {/* Course Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isEditing ? "Editar Curso" : "Novo Curso"}
            >
                <form onSubmit={handleCourseSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Título do Curso</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                            value={courseForm.title}
                            onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Categoria</label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                value={courseForm.category}
                                onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                            >
                                <option value="Presencial">Presencial</option>
                                <option value="Online">Online</option>
                                <option value="Hibrido">Híbrido</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Cidade</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                value={courseForm.city}
                                onChange={(e) => setCourseForm({ ...courseForm, city: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Local (Endereço/Link)</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                            value={courseForm.location}
                            onChange={(e) => setCourseForm({ ...courseForm, location: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Data</label>
                            <input
                                type="text"
                                required
                                placeholder="Ex: 25/03/2026"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                value={courseForm.date}
                                onChange={(e) => setCourseForm({ ...courseForm, date: maskDate(e.target.value) })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Horário</label>
                            <input
                                type="text"
                                required
                                placeholder="Ex: 08:30 às 17:30"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                value={courseForm.time}
                                onChange={(e) => setCourseForm({ ...courseForm, time: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Investimento</label>
                            <input
                                type="text"
                                required
                                placeholder="R$ 0,00"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                value={courseForm.investment}
                                onChange={(e) => setCourseForm({ ...courseForm, investment: maskCurrency(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Descrição do Curso</label>
                        <textarea
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                            value={courseForm.description}
                            onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                            placeholder="Descreva o objetivo do curso..."
                        ></textarea>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Conteúdo Programático (um por linha)</label>
                        <textarea
                            rows={4}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                            value={courseForm.program}
                            onChange={(e) => setCourseForm({ ...courseForm, program: e.target.value })}
                            placeholder="Introdução à Gestão Pública&#10;Licitações e Contratos&#10;Responsabilidade Fiscal"
                        ></textarea>
                        <p className="text-[10px] text-slate-400">Cada linha se tornará um item com check na página do curso.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        {/* Thumbnail section */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-slate-700">Imagem de Capa</label>

                            {courseForm.thumbnail_url ? (
                                <div className="relative group rounded-xl overflow-hidden aspect-video border border-slate-100">
                                    <img src={courseForm.thumbnail_url} alt="Capa" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setCourseForm(p => ({ ...p, thumbnail_url: '' }))}
                                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold"
                                    >
                                        ✕ Remover
                                    </button>
                                </div>
                            ) : (
                                <div
                                    onClick={() => !uploadingImage && fileInputRef.current?.click()}
                                    className="aspect-video bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 p-4 hover:bg-slate-100 hover:border-brand-300 transition-all cursor-pointer"
                                >
                                    {uploadingImage ? (
                                        <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <UploadCloud size={24} className="mb-2 opacity-40" />
                                            <p className="text-[10px] font-medium text-center">Upload Imagem</p>
                                        </>
                                    )}
                                </div>
                            )}

                            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                        </div>

                        {/* PDF section */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-slate-700">Cronograma (PDF)</label>

                            {courseForm.syllabus_url ? (
                                <div className="p-4 rounded-xl border border-brand-100 bg-brand-50 flex items-center justify-between">
                                    <div className="flex items-center text-brand-700">
                                        <FileText size={20} className="mr-2" />
                                        <span className="text-xs font-bold truncate max-w-[100px]">PDF Selecionado</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setCourseForm(p => ({ ...p, syllabus_url: '' }))}
                                        className="text-slate-400 hover:text-red-500"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ) : (
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleSyllabusUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <div className="aspect-video bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 p-4 hover:bg-slate-100 hover:border-brand-300 transition-all">
                                        <UploadCloud size={24} className="mb-2 opacity-40" />
                                        <p className="text-[10px] font-medium text-center">Upload Cronograma PDF</p>
                                    </div>
                                </div>
                            )}
                            <p className="text-[10px] text-slate-400 italic">Disponível para download na página do curso.</p>
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end gap-3 border-t border-slate-100 mt-6">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-bold shadow-lg shadow-brand-200"
                        >
                            {isEditing ? "Salvar Alterações" : "Criar Curso"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AdminCoursesList;
