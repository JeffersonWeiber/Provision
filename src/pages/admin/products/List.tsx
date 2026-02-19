import { useState } from 'react';
import { MOCK_COURSES } from '../../../data/mocks';
import { Search, BookOpen, Calendar, MapPin, MoreVertical, Plus } from 'lucide-react';

const AdminCoursesList = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCourses = MOCK_COURSES.filter((course: any) => {
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
                <button className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors flex items-center">
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
                                        <button className="text-slate-400 hover:text-brand-600">
                                            <MoreVertical size={20} />
                                        </button>
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
        </div>
    );
};

export default AdminCoursesList;
