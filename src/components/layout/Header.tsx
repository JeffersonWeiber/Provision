import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../../assets/Ativo 2.svg';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'A Provision', path: '/sobre' },
        { name: 'Consultoria', path: '/consultoria' },
        { name: 'Cursos', path: '/cursos' },
        { name: 'Contato', path: '/contato' },
    ];

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/">
                            <img className="h-10 w-auto" src={Logo} alt="Provision Logo" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Home</Link>
                        <Link to="/sobre" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">A Provision</Link>
                        <Link to="/consultoria" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Consultoria</Link>
                        <Link to="/cursos" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Cursos</Link>
                        <Link to="/conteudos" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Conteúdos</Link>
                        <Link to="/contato" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Contato</Link>
                        <a
                            href="https://wa.me/5545999999999" // Placeholder WhatsApp
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-brand-600 text-white px-5 py-2.5 rounded-md font-semibold hover:bg-brand-700 transition-colors shadow-md"
                        >
                            Falar com Consultor
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-slate-600 hover:text-brand-700 focus:outline-none"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-700 hover:bg-slate-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a
                            href="https://wa.me/5545999999999"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center mt-4 bg-brand-600 text-white px-5 py-3 rounded-md font-semibold hover:bg-brand-700 transition-colors"
                        >
                            Falar com Consultor
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
