import { useState } from 'react';
import { MOCK_COURSES } from '../../../data/mocks';
import { Search, BookOpen, Calendar, MapPin, MoreVertical, Plus } from 'lucide-react';
import Modal from '../../../components/ui/Modal';

const AdminCoursesList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [courses, setCourses] = useState<any[]>(MOCK_COURSES);
    const [isEditing, setIsEditing] = useState(false);

    const [courseForm, setCourseForm] = useState({
        title: '',
        category: 'Presencial',
        city: '',
        location: '',
        date: '',
        time: '',
        investment: '',
        description: ''
    });

    const handleEditClick = (course: any) => {
        setCourseForm({ ...course });
        setSelectedCourse(course);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDeleteCourse = (id: number) => {
        if (confirm('Tem certeza que deseja excluir este curso?')) {
            setCourses(courses.filter(c => c.id !== id));
        }
    };

    const handleCourseSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            const updatedCourses = courses.map(c => c.id === selectedCourse.id ? { ...courseForm, id: c.id } : c);
            setCourses(updatedCourses);
            alert('Curso atualizado com sucesso!');
        } else {
            const newCourse = {
                ...courseForm,
                id: courses.length > 0 ? Math.max(...courses.map((c: any) => c.id)) + 1 : 1
            };
            setCourses([newCourse, ...courses]);
            alert('Curso criado com sucesso!');
        }
        setIsModalOpen(false);
    };

    const filteredCourses = courses.filter((course: any) => {
        return course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.category.toLowerCase().includes(searchTerm.toLowerCase());
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
                            description: ''
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
                            {filteredCourses.map((course: any) => (
                                <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-lg bg-brand-100 flex items-center justify-center text-brand-600 mr-3 flex-shrink-0">
                                                <BookOpen size={20} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-slate-900 line-clamp-1">{course.title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-slate-600">
                                            <Calendar size={14} className="mr-2" /> {course.date}
                                        </div>
                                        <div className="text-xs text-slate-400 ml-6">{course.time}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-slate-600">
                                            <MapPin size={14} className="mr-2" /> {course.city}
                                        </div>
                                        <div className="text-xs text-slate-400 ml-6">{course.location}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">
                                            {course.category}
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
                {filteredCourses.length === 0 && (
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
                                placeholder="Ex: 25 e 26 de Março"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                value={courseForm.date}
                                onChange={(e) => setCourseForm({ ...courseForm, date: e.target.value })}
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
                                placeholder="R$ 850,00"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                                value={courseForm.investment}
                                onChange={(e) => setCourseForm({ ...courseForm, investment: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Descrição/Conteúdo</label>
                        <textarea
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                            value={courseForm.description}
                            onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                        ></textarea>
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
