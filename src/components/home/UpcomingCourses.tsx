import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { MOCK_COURSES } from '../../data/mocks';
import { Link } from 'react-router-dom';

const UpcomingCourses = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-brand-700 font-semibold tracking-wide uppercase text-sm mb-2">Agenda</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Próximos Cursos</h3>
            <p className="mt-4 text-slate-600">
              Garanta sua vaga nos principais temas da gestão pública.
            </p>
          </div>
          <Link
            to="/cursos"
            className="group flex items-center text-brand-600 font-semibold hover:text-brand-800 transition-colors"
          >
            Ver agenda completa
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_COURSES.map((course) => (
            <div key={course.id} className="flex flex-col bg-slate-50 rounded-xl overflow-hidden border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden relative">
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
                  className="w-full block text-center bg-white border-2 border-brand-600 text-brand-600 py-2.5 rounded-lg font-semibold hover:bg-brand-600 hover:text-white transition-all duration-300"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingCourses;
