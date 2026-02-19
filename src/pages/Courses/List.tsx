import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import { MOCK_COURSES } from '../../data/mocks';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Search } from 'lucide-react';

const CoursesList = () => {
    const [filter, setFilter] = useState('Todos');

    // Unique categories from mock data
    const categories = ['Todos', ...Array.from(new Set(MOCK_COURSES.map(c => c.category)))];

    const filteredCourses = filter === 'Todos'
        ? MOCK_COURSES
        : MOCK_COURSES.filter(c => c.category === filter);

    return (
        <div className="min-h-screen bg-slate-50">
            <PageHeader
                title="Cursos Presenciais"
                subtitle="Capacitação técnica de alto nível para gestores públicos."
                backgroundImage="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1920"
            />

            <section className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${filter === cat
                                            ? 'bg-brand-600 text-white shadow-md'
                                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Buscar cursos..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                            />
                            <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
                        </div>
                    </div>

                    {/* Courses Grid */}
                    {filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCourses.map((course) => (
                                <div key={course.id} className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100">
                                    <div className="h-56 overflow-hidden relative">
                                        <div className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 uppercase tracking-wide">
                                            {course.category}
                                        </div>
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex-1 p-6 flex flex-col">
                                        <div className="flex items-center text-sm text-slate-500 mb-3 space-x-4">
                                            <span className="flex items-center"><Calendar size={16} className="mr-1.5 text-brand-500" /> {course.date}</span>
                                            <span className="flex items-center"><MapPin size={16} className="mr-1.5 text-brand-500" /> {course.city}</span>
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 hover:text-brand-700 transition-colors">
                                            <Link to={`/cursos/${course.id}`}>{course.title}</Link>
                                        </h4>
                                        <p className="text-slate-600 text-sm mb-6 flex-grow">
                                            Local: {course.location} • Horário: {course.time}
                                        </p>
                                        <Link
                                            to={`/cursos/${course.id}`}
                                            className="w-full block text-center bg-brand-50 border-2 border-brand-100 text-brand-700 py-2.5 rounded-lg font-bold hover:bg-brand-600 hover:border-brand-600 hover:text-white transition-all duration-300"
                                        >
                                            Ver Detalhes e Inscrever-se
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-slate-500">
                            Nenhum curso encontrado nesta categoria.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CoursesList;
