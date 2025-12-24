"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { Search, ShoppingCart, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import AuthModal from '@/components/AuthModal';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  vendor: string;
}

export default function ProductsPage() {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products/?limit=50');
        setProducts(response.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
        toast.error('Connection Error', {
          description: 'Could not fetch products from the server.'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    addToCart(product);
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Discover Products</h1>
          <p className="text-gray-500 mt-1">Found {filteredProducts.length} items in our catalog</p>
        </div>
        
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products, categories..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-2xl border aspect-[3/4] p-4">
              <div className="bg-gray-200 rounded-xl h-2/3 mb-4"></div>
              <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`}
              className="group bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all p-4 flex flex-col h-full"
            >
              <div className="bg-gray-50 rounded-xl aspect-[1/1] mb-4 flex items-center justify-center p-6 overflow-hidden relative">
                <span className="text-gray-300 group-hover:scale-110 transition-transform duration-500 text-5xl opacity-20">📦</span>
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-indigo-600 flex items-center gap-1 shadow-sm">
                  <Star size={12} fill="currentColor" />
                  {product.rating.toFixed(1)}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">{product.category}</p>
                <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors mb-2">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{product.vendor}</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="bg-gray-900 text-white p-2 rounded-lg hover:bg-indigo-600 transition-colors shadow-sm"
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
