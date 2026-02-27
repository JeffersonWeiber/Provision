import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Building2,
    BookOpen,
    GraduationCap,
    Settings,
    LogOut,
    Menu,
    FileText
} from 'lucide-react';
import { useState } from 'react';
import Logo from '../../assets/logo-provision.svg';

import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    const menuItems = [
        { path: '/admin/dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/leads', name: 'CRM (Leads)', icon: Users },
        { path: '/admin/organizations', name: 'Organizações', icon: Building2 },
        { path: '/admin/products', name: 'Cursos', icon: BookOpen },
        { path: '/admin/enrollments', name: 'Matrículas', icon: GraduationCap },
        { path: '/admin/articles', name: 'Artigos (Blog)', icon: FileText },
        { path: '/admin/settings', name: 'Configurações', icon: Settings },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Get initials for avatar
    const userInitials = user?.email?.substring(0, 2).toUpperCase() || 'AD';
    const userEmail = user?.email || 'admin@provision.com.br';

    return (
        <div className="flex h-screen bg-slate-100">
            {/* Sidebar Mobile Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={toggleSidebar}></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 flex flex-col
            `}>
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <img src={Logo} alt="Admin Logo" className="h-8 w-auto" />
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors group ${isActive
                                    ? 'bg-brand-600 text-white'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <item.icon size={20} className={`mr-3 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <LogOut size={20} className="mr-3" />
                        Sair
                    </button>
                    <div className="mt-4 px-4 flex items-center">
                        <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-xs font-bold">
                            {userInitials}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-white max-w-[140px] truncate" title={userEmail}>Admin</p>
                            <p className="text-xs text-slate-500 max-w-[140px] truncate" title={userEmail}>{userEmail}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 md:px-8 border-b border-slate-200">
                    <button onClick={toggleSidebar} className="md:hidden text-slate-500 hover:text-slate-700">
                        <Menu size={24} />
                    </button>
                    <div className="flex items-center ml-auto">
                        <span className="text-sm text-slate-500 mr-4">v2.1 (Beta)</span>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
