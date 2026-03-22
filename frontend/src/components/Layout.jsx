import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Dumbbell, User, LogOut, Menu, X, LayoutDashboard, Shield, MessageSquare, CreditCard } from 'lucide-react';

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
                        <Link to="/" className="flex items-center space-x-2">
                            <Dumbbell className="h-8 w-8 text-primary" />
                            <span className="font-bebas text-2xl tracking-wider text-white">Bal Fitness Zone</span>
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
            
            {/* Footer */}
            <footer className="bg-secondary py-8 border-t border-gray-800 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                         <Dumbbell className="h-6 w-6 text-primary" />
                         <span className="font-bebas text-xl tracking-wider text-white">Bal Fitness Zone</span>
                    </div>
                    <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Bal Fitness Zone. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
