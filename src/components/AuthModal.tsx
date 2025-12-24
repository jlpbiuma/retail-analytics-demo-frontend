"use client";

import { X, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform animate-in zoom-in-95 duration-300 border border-gray-100">
                <div className="relative p-8 text-center">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400"
                    >
                        <X size={20} />
                    </button>

                    <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <LogIn size={40} />
                    </div>

                    <h2 className="text-2xl font-black text-gray-900 mb-2">Login Required</h2>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        You need to be logged in to add products to your cart and experience our premium retail service.
                    </p>

                    <div className="flex flex-col gap-3">
                        <Link
                            href="/login"
                            onClick={onClose}
                            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                        >
                            <LogIn size={20} />
                            Log In Now
                        </Link>
                        <Link
                            href="/register"
                            onClick={onClose}
                            className="w-full bg-white text-gray-900 border-2 border-gray-100 py-4 rounded-2xl font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
                        >
                            <UserPlus size={20} />
                            Create New Account
                        </Link>
                    </div>

                    <button
                        onClick={onClose}
                        className="mt-6 text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors"
                    >
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
