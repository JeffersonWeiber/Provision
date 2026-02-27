import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Consulting from './pages/Consulting';
import Courses from './pages/Courses/List';
import CourseDetail from './pages/Courses/Details';
import BlogList from './pages/Blog/List';
import BlogDetail from './pages/Blog/Detail';
import Contact from './pages/Contact';

// Admin Pages (Lazy Loaded for Performance)
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const LeadsList = lazy(() => import('./pages/admin/leads/List'));
const OrganizationsList = lazy(() => import('./pages/admin/organizations/List'));
const AdminCoursesList = lazy(() => import('./pages/admin/products/List'));
const EnrollmentsList = lazy(() => import('./pages/admin/enrollments/List'));
const Settings = lazy(() => import('./pages/admin/Settings'));
const AdminArticlesList = lazy(() => import('./pages/admin/articles/List'));
const ArticleEditor = lazy(() => import('./pages/admin/articles/Editor'));
const Login = lazy(() => import('./pages/admin/auth/Login'));

import TrackingScripts from './components/TrackingScripts';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';

// Loading Component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
  </div>
);

function App() {
  const initializeAuth = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Router>
            <TrackingScripts />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<Home />} />
                  <Route path="sobre" element={<About />} />
                  <Route path="consultoria" element={<Consulting />} />
                  <Route path="cursos" element={<Courses />} />
                  <Route path="cursos/:id" element={<CourseDetail />} />
                  <Route path="conteudos" element={<BlogList />} />
                  <Route path="conteudos/:slug" element={<BlogDetail />} />
                  <Route path="contato" element={<Contact />} />
                </Route>

                <Route path="/admin/login" element={<Login />} />

                <Route path="/admin" element={<ProtectedRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="leads" element={<LeadsList />} />
                    <Route path="organizations" element={<OrganizationsList />} />
                    <Route path="products" element={<AdminCoursesList />} />
                    <Route path="enrollments" element={<EnrollmentsList />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="articles" element={<AdminArticlesList />} />
                    <Route path="articles/new" element={<ArticleEditor />} />
                    <Route path="articles/:id" element={<ArticleEditor />} />
                  </Route>
                </Route>
              </Routes>
            </Suspense>
          </Router>
        </HelmetProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
