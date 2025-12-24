"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { ShoppingCart, Star, Trash2, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  vendor: string;
}

interface Favorite {
  id: number;
  product_id: number;
  product: Product;
}

export default function FavoritesPage() {
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get(`/favorites/?user_id=${user.id}`);
        setFavorites(response.data);
      } catch (err) {
        console.error('Failed to fetch favorites', err);
        toast.error('Load Error', {
          description: 'Could not load your favorites.'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [isAuthenticated, user]);

  const handleRemove = async (productId: number) => {
    if (!user) return;
    try {
      await api.delete(`/favorites/${productId}?user_id=${user.id}`);
      setFavorites(favorites.filter(f => f.product_id !== productId));
      toast.info('Removed from favorites');
    } catch (err) {
      toast.error('Failed to remove');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart size={40} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Favorites</h1>
        <p className="text-gray-500 mb-8">Please log in to view and manage your favorite items.</p>
        <Link href="/login" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg">
          Log In Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-gray-900">Your Favorites</h1>
        <p className="text-gray-500 mt-2">Manage your wishlist and upcoming purchases.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-2xl border aspect-[3/4] p-4">
              <div className="bg-gray-200 h-2/3 rounded-xl mb-4"></div>
              <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-gray-200 py-20 text-center">
          <p className="text-gray-400 mb-6 italic text-lg">Your wishlist is currently empty.</p>
          <Link href="/products" className="text-indigo-600 font-bold hover:underline flex items-center justify-center gap-2">
            Browse our catalog <ShoppingCart size={18} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((fav) => (
            <div 
              key={fav.id} 
              className="group bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all p-4 flex flex-col"
            >
              <Link href={`/products/${fav.product_id}`} className="block">
                <div className="bg-gray-50 rounded-xl aspect-square mb-4 flex items-center justify-center relative group-hover:bg-indigo-50 transition-colors">
                  <span className="text-5xl opacity-20">📦</span>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemove(fav.product_id);
                    }}
                    className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg text-gray-400 hover:text-red-600 shadow-sm transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">{fav.product.category}</p>
                <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
                  {fav.product.title}
                </h3>
              </Link>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-bold text-gray-900">${fav.product.price.toFixed(2)}</span>
                <Link 
                  href={`/products/${fav.product_id}`}
                  className="bg-gray-900 text-white p-2 rounded-lg hover:bg-indigo-600 transition-colors shadow-sm"
                >
                  <ShoppingCart size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
