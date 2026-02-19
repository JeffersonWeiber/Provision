
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Ativo 2.svg';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <img src={Logo} alt="Provision Logo" className="h-8 w-auto mb-4 invert brightness-0 filter" />
                        {/* Note: 'invert brightness-0' makes the logo white if it's black/colored, assuming it works with the SVG style 
                If the SVG has fixed colors, this might look weird. We'll check visually. 
            */}
                        <p className="text-sm leading-relaxed mb-4">
                            Soluções técnicas especializadas para uma gestão pública segura, eficiente e transparente.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Institucional</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/sobre" className="hover:text-white transition-colors">Quem Somos</Link></li>
                            <li><Link to="/consultoria" className="hover:text-white transition-colors">Consultoria</Link></li>
                            <li><Link to="/cursos" className="hover:text-white transition-colors">Cursos Presenciais</Link></li>
                            <li><Link to="/blog" className="hover:text-white transition-colors">Blog Normativo</Link></li>
                            <li><Link to="/politica-privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contato</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start">
                                <MapPin size={18} className="mr-2 mt-0.5 text-brand-400" />
                                <span>Rua Exemplo, 123 - Centro<br />Toledo - PR</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={18} className="mr-2 text-brand-400" />
                                <span>(45) 99999-9999</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={18} className="mr-2 text-brand-400" />
                                <span>contato@provision.com.br</span>
                            </li>
                        </ul>
                    </div>

                    {/* Transformation/Newsletter Placeholder */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Atualizações</h3>
                        <p className="text-sm mb-4">Receba novidades e atualizações normativas no seu email.</p>
                        <form className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="Seu email institucional"
                                className="bg-slate-800 text-white px-4 py-2 rounded border border-slate-700 focus:outline-none focus:border-brand-500 text-sm"
                            />
                            <button className="bg-brand-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-brand-700 transition-colors">
                                Inscrever-se
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Provision Consultoria. Todos os direitos reservados. CNPJ: XX.XXX.XXX/0001-XX</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
