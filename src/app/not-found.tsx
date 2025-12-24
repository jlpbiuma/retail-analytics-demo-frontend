import Link from 'next/link';
import { Search, Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Large 404 Background Text */}
        <div className="relative mb-8">
          <h2 className="text-[12rem] font-black text-gray-50 leading-none select-none">404</h2>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-indigo-200 rotate-12 animate-float">
              <Search size={40} />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Page Not Found</h1>
        <p className="text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>

        <div className="flex flex-col items-center gap-6">
          <Link
            href="/"
            className="group flex items-center justify-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-3xl font-bold hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 active:scale-95"
          >
            <Home size={22} />
            Back to Homepage
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="flex gap-8 text-sm font-bold text-gray-400">
             <Link href="/products" className="hover:text-indigo-600 transition-colors uppercase tracking-widest">Products</Link>
             <Link href="/favorites" className="hover:text-indigo-600 transition-colors uppercase tracking-widest">Wishlist</Link>
             <Link href="/profile" className="hover:text-indigo-600 transition-colors uppercase tracking-widest">Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
