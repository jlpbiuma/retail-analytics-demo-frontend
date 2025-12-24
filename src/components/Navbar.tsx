"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User as UserIcon, LogOut, Package, UserCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const [mounted, setMounted] = useState(false);

    // Fix hydration mismatch by only showing dynamic parts after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
    };

    return (
        <nav className="bg-white border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
                            <Package size={28} />
                            <span>RetailApp</span>
                        </Link>
                        <div className="hidden md:flex items-center gap-6">
                            <Link href="/products" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Products</Link>
                            <Link href="/favorites" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Favorites</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {mounted && (
                            isAuthenticated ? (
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <Link 
                                        href="/profile" 
                                        className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors group"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs ring-2 ring-transparent group-hover:ring-indigo-200 transition-all">
                                            {user?.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="hidden sm:inline font-medium text-sm">Profile</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-1 text-gray-500 hover:text-red-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
                                    >
                                        <LogOut size={18} />
                                        <span className="hidden sm:inline">Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link href="/login" className="flex items-center gap-1 text-gray-600 hover:text-indigo-600 font-medium px-4 py-2 hover:bg-gray-50 rounded-lg transition-all">
                                        <UserIcon size={20} />
                                        <span>Login</span>
                                    </Link>
                                    <Link href="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-sm active:scale-95">
                                        Register
                                    </Link>
                                </>
                            )
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
