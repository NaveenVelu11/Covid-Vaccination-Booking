import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/book-slot', label: 'Book Slot', icon: '📅' },
        { path: '/my-bookings', label: 'My Bookings', icon: '📋' }
    ];

    return (
        <nav className="bg-gradient-to-r from-primary-500 via-indigo-600 to-purple-600 shadow-2xl sticky top-0 z-50 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                                <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <span className="text-white text-2xl font-bold tracking-tight">VaxBook</span>
                        </Link>
                    </div>

                    {user && (
                        <>
                            {/* Desktop Menu */}
                            <div className="hidden md:flex items-center space-x-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                            isActive(link.path)
                                                ? 'bg-white text-primary-600 shadow-lg'
                                                : 'text-white hover:bg-white/20'
                                        }`}
                                    >
                                        <span className="mr-2">{link.icon}</span>
                                        {link.label}
                                    </Link>
                                ))}
                                
                                {/* User Dropdown */}
                                <div className="relative ml-4">
                                    <button
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-all duration-200"
                                    >
                                        <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
                                            <span className="text-primary-600 font-bold text-sm">
                                                {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                                            </span>
                                        </div>
                                        <span className="font-semibold">{user.first_name}</span>
                                        <svg className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    
                                    {showDropdown && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 animate-fadeIn">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-900">{user.first_name} {user.last_name}</p>
                                                <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Mobile menu button */}
                            <div className="md:hidden flex items-center">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="text-white hover:bg-white/20 p-2 rounded-xl transition-colors"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {isOpen ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && user && (
                <div className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/20 animate-slideIn">
                    <div className="px-4 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                                    isActive(link.path)
                                        ? 'bg-white text-primary-600'
                                        : 'text-white hover:bg-white/20'
                                }`}
                            >
                                <span className="mr-2">{link.icon}</span>
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-2 border-t border-white/20">
                            <div className="px-4 py-2 text-white text-sm">
                                <p className="font-semibold">{user.first_name} {user.last_name}</p>
                                <p className="text-white/70 text-xs">{user.email}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-3 rounded-xl text-white hover:bg-white/20 transition-colors flex items-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
