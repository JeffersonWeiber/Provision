import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import Home from './pages/Home';
import About from './pages/About';
import Consulting from './pages/Consulting';
import CoursesList from './pages/Courses/List';
import CourseDetails from './pages/Courses/Details';
import Contact from './pages/Contact';
import BlogList from './pages/Blog/List';

// Admin Imports
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import LeadsList from './pages/admin/leads/List';
import OrganizationsList from './pages/admin/organizations/List';
import AdminCoursesList from './pages/admin/products/List';
import EnrollmentsList from './pages/admin/enrollments/List';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/consultoria" element={<Consulting />} />
          <Route path="/cursos" element={<CoursesList />} />
          <Route path="/cursos/:id" element={<CourseDetails />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/conteudos" element={<BlogList />} />
          <Route path="*" element={<div className="container mx-auto py-20 text-center">Página não encontrada (404)</div>} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="leads" element={<LeadsList />} />
            <Route path="organizations" element={<OrganizationsList />} />
            <Route path="products" element={<AdminCoursesList />} />
            <Route path="enrollments" element={<EnrollmentsList />} />
            <Route path="settings" element={<div className="p-8">Configurações (Em construção)</div>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
