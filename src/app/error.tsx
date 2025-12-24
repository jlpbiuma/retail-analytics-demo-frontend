"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 relative inline-block">
          <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 relative z-10 animate-bounce">
            <AlertTriangle size={48} />
          </div>
          <div className="absolute top-0 left-0 w-24 h-24 bg-red-200 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
        </div>
        
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Something went wrong!</h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          We encountered an unexpected error while processing your request. 
          Don't worry, our team has been notified.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95"
          >
            <RefreshCcw size={20} />
            Try Again
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-white text-gray-900 border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95"
          >
            <Home size={20} />
            Go Home
          </Link>
        </div>

        <p className="mt-12 text-xs text-gray-400 font-mono">
          Error ID: {error.digest || 'unknown_error'}
        </p>
      </div>
    </div>
  );
}
