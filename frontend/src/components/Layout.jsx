import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/reels/IMG_5372.PNG';
import { Dumbbell, User, LogOut, Menu, X, LayoutDashboard, Shield, MessageSquare, CreditCard, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Layout = ({ children }) => {
    const { user, logout } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col bg-background text-textWhite font-inter">
            {/* Navbar */}
            <header className="bg-secondary border-b border-gray-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link to="/" className="flex items-center space-x-3">
                            <img src={logo} alt="Bal Fitness Zone" className="h-12 w-12 object-cover rounded-full shadow-md border-2 border-primary/80" />
                            <span className="font-bebas text-2xl tracking-wider text-white hidden sm:block mt-1">Bal Fitness Zone</span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link to="/" className="text-gray-300 hover:text-primary transition-colors">Home</Link>
                            
                            {user ? (
                                user.role === 'admin' ? (
                                    <>
                                        <Link to="/admin" className="text-accent hover:text-white transition-colors flex items-center gap-1">
                                            <Shield size={16}/> Admin Panel
                                        </Link>
                                        <div className="flex items-center space-x-4 ml-4 border-l border-gray-700 pl-4">
                                            <span className="flex items-center space-x-1 text-gray-300">
                                                <User size={18} />
                                                <span>{user.username}</span>
                                            </span>
                                            <button onClick={handleLogout} className="flex items-center space-x-1 text-primary hover:text-red-400 border border-primary px-3 py-1 rounded transition-colors">
                                                <LogOut size={16} />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/dashboard" className="text-gray-300 hover:text-primary transition-colors">Dashboard</Link>
                                        <Link to="/memberships" className="text-gray-300 hover:text-primary transition-colors">Memberships</Link>
                                        <Link to="/complaints" className="text-gray-300 hover:text-primary transition-colors">Complaints</Link>
                                        <div className="flex items-center space-x-4 ml-4 border-l border-gray-700 pl-4">
                                            <Link to="/profile" className="flex items-center space-x-1 text-gray-300 hover:text-white">
                                                <User size={18} />
                                                <span>{user.username}</span>
                                            </Link>
                                            <button onClick={handleLogout} className="flex items-center space-x-1 text-primary hover:text-red-400 border border-primary px-3 py-1 rounded transition-colors">
                                                <LogOut size={16} />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </>
                                )
                            ) : (
                                <div className="space-x-4">
                                    <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
                                    <Link to="/register" className="bg-primary hover:bg-red-600 text-white px-4 py-2 rounded font-medium transition-colors">Register</Link>
                                </div>
                            )}
                        </nav>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white focus:outline-none">
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Nav */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-secondary border-b border-gray-800 absolute w-full left-0 z-40">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-300 hover:text-primary hover:bg-gray-800 rounded">Home</Link>
                            {user ? (
                                user.role === 'admin' ? (
                                    <>
                                        <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-accent hover:text-white hover:bg-gray-800 rounded">Admin Panel</Link>
                                        <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-primary hover:bg-gray-800 rounded">Logout</button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-300 hover:text-primary hover:bg-gray-800 rounded">Dashboard</Link>
                                        <Link to="/memberships" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-300 hover:text-primary hover:bg-gray-800 rounded">Memberships</Link>
                                        <Link to="/complaints" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-300 hover:text-primary hover:bg-gray-800 rounded">Complaints</Link>
                                        <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-300 hover:text-primary hover:bg-gray-800 rounded">Profile</Link>
                                        <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-primary hover:bg-gray-800 rounded">Logout</button>
                                    </>
                                )
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-300 hover:text-primary hover:bg-gray-800 rounded">Login</Link>
                                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-300 hover:text-primary hover:bg-gray-800 rounded">Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow w-full">
                {children}
            </main>
            
            {/* Premium Footer */}
            <footer className="bg-background pt-16 pb-8 border-t border-gray-800 mt-auto relative overflow-hidden">
                {/* Top highlight border */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                        {/* Brand Column */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="h-16 w-16 bg-white rounded-full shadow-lg flex items-center justify-center p-0.5 shrink-0 border-2 border-primary/50 overflow-hidden">
                                    <img src={logo} alt="Bal Fitness Zone" className="h-full w-full object-cover rounded-full" />
                                </div>
                                <span className="font-bebas text-3xl tracking-wider text-white">Bal Fitness <span className="text-primary">Zone</span></span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Forged in iron, built through sweat. Join the most elite training facility and transform your body into a weapon. We don't just build muscle; we forge character.
                            </p>
                            <div className="flex space-x-4">
                                <a href="https://instagram.com/balfitnesszone" target="_blank" rel="noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-secondary border border-gray-800 text-gray-400 hover:text-pink-500 hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300" title="Instagram">
                                    <Instagram size={18} />
                                </a>
                                <a href="https://wa.me/919914163531" target="_blank" rel="noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-secondary border border-gray-800 text-gray-400 hover:text-green-500 hover:border-green-500 hover:bg-green-500/10 transition-all duration-300" title="WhatsApp">
                                    <MessageCircle size={18} />
                                </a>
                                <a href="mailto:armaanbal48@gmail.com" className="h-10 w-10 flex items-center justify-center rounded-full bg-secondary border border-gray-800 text-gray-400 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300" title="Email">
                                    <Mail size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="font-bebas text-xl text-white tracking-wider mb-6">Quick Links</h3>
                            <ul className="space-y-3">
                                {['Home', 'About Us', 'Classes', 'Our Trainers', 'Membership Plans', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-primary transition-colors flex items-center group">
                                            <span className="w-0 h-px bg-primary mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                                            <span className="text-sm">{item}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="font-bebas text-xl text-white tracking-wider mb-6">Contact Us</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start space-x-3 text-gray-400">
                                    <MapPin className="text-primary mt-0.5 shrink-0" size={18} />
                                    <span className="text-sm">Dinewal, Punjab 143406</span>
                                </li>
                                <li className="flex items-center space-x-3 text-gray-400">
                                    <Phone className="text-primary shrink-0" size={18} />
                                    <span className="text-sm">+91 99141 63531</span>
                                </li>
                                <li className="flex items-center space-x-3 text-gray-400">
                                    <Mail className="text-primary shrink-0" size={18} />
                                    <span className="text-sm">armaanbal48@gmail.com</span>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="font-bebas text-xl text-white tracking-wider mb-6">Newsletter</h3>
                            <p className="text-gray-400 text-sm mb-4">Subscribe to get the latest updates, workout tips, and special offers directly to your inbox.</p>
                            <form className="space-y-2 mt-2" onSubmit={(e) => e.preventDefault()}>
                                <input 
                                    type="email" 
                                    placeholder="Your email address" 
                                    className="w-full bg-secondary border border-gray-800 text-white px-4 py-2.5 rounded focus:outline-none focus:border-primary transition-colors text-sm"
                                    required
                                />
                                <button 
                                    type="submit" 
                                    className="w-full bg-primary hover:bg-red-600 text-white font-bold py-2.5 rounded transition-colors text-sm tracking-widest uppercase"
                                >
                                    Subscribe Now
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
                        <p>© {new Date().getFullYear()} Bal Fitness Zone. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-primary transition-colors">FAQ</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
