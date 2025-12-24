"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { Package, ChevronRight, ShoppingCart, Trash2, User, Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
}

interface Order {
  id: number;
  created_at: string;
  total: number;
  status: string;
  product: Product;
}

interface Favorite {
  id: number;
  product_id: number;
  product: Product;
}

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const { cart, removeFromCart } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        return;
      }
      try {
        const [ordersRes, favsRes] = await Promise.all([
          api.get(`/orders/?user_id=${user.id}&limit=10`),
          api.get(`/favorites/?user_id=${user.id}`)
        ]);
        setOrders(ordersRes.data);
        setFavorites(favsRes.data);
      } catch (err) {
        console.error('Failed to fetch profile data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAuthenticated, user]);

  const handleRemoveFavorite = async (productId: number) => {
    if (!user) return;
    try {
      await api.delete(`/favorites/${productId}?user_id=${user.id}`);
      setFavorites(favorites.filter(f => f.product_id !== productId));
      toast.info('Removed from favorites');
    } catch (err) {
      toast.error('Failed to remove from wishlist');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <User size={48} className="mx-auto text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="text-gray-500 mt-2">Please log in to view your profile and orders.</p>
        <Link href="/login" className="inline-block mt-6 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-12 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-3xl font-black">
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-black text-gray-900">{user?.name}</h1>
          <p className="text-gray-500">{user?.email}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
             <span className="text-xs font-bold px-3 py-1 bg-green-50 text-green-600 rounded-full border border-green-100">
               Active Account
             </span>
             <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">
               Member since 2024
             </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Orders & Wishlist */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Orders Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Package className="text-indigo-600" />
                Order History
              </h2>
            </div>

            {loading ? (
               <div className="space-y-4">
                 {[...Array(3)].map((_, i) => (
                   <div key={i} className="h-24 bg-gray-50 animate-pulse rounded-2xl"></div>
                 ))}
               </div>
            ) : orders.length === 0 ? (
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl py-12 text-center text-gray-400 italic">
                No orders found yet.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl">📦</div>
                      <div>
                        <p className="font-bold text-gray-900 line-clamp-1">{order.product?.title || 'Unknown Product'}</p>
                        <p className="text-xs text-gray-500">#{order.id} • {new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">${order.total?.toFixed(2)}</p>
                      <span className="text-xs font-bold text-indigo-600 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        Details <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Wishlist Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Heart className="text-red-500" />
                Your Wishlist
              </h2>
              <Link href="/favorites" className="text-sm font-bold text-indigo-600 hover:underline">
                View All
              </Link>
            </div>

            {loading ? (
               <div className="grid grid-cols-2 gap-4">
                 {[...Array(2)].map((_, i) => (
                   <div key={i} className="h-24 bg-gray-50 animate-pulse rounded-2xl"></div>
                 ))}
               </div>
            ) : favorites.length === 0 ? (
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl py-12 text-center text-gray-400 italic">
                Your wishlist is empty.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favorites.slice(0, 4).map((fav) => (
                  <div key={fav.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 group hover:shadow-md transition-all">
                    <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-xl relative group-hover:bg-red-100 transition-colors">
                      ❤️
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{fav.product.title}</h3>
                      <p className="text-indigo-600 font-bold text-sm">${fav.product.price.toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => handleRemoveFavorite(fav.product_id)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right: Cart Carousel Area */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 rounded-3xl p-8 text-white h-auto lg:sticky lg:top-24 border border-gray-800 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ShoppingCart size={24} />
              Live Cart
            </h2>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-6 italic">Nothing here yet!</p>
                <Link href="/products" className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors inline-block text-sm">
                  Go Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest">{cart.length} Products</p>
                
                {/* Horizontal Carousel */}
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                  {cart.map((item) => (
                    <div key={item.product.id} className="min-w-[180px] bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 snap-center group">
                      <div className="aspect-square bg-white/5 rounded-xl mb-3 flex items-center justify-center relative">
                        <span className="text-3xl opacity-30">📦</span>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500/10 text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <h3 className="font-bold text-xs line-clamp-1 mb-1">{item.product.title}</h3>
                      <div className="flex justify-between items-center text-xs">
                        <p className="text-indigo-400 font-bold">${item.product.price.toFixed(2)}</p>
                        <span className="text-gray-500">x{item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10 mt-6">
                   <div className="flex justify-between mb-4 text-sm">
                     <span className="text-gray-400">Total Estimate</span>
                     <span className="font-bold text-lg">${cart.reduce((s, i) => s + i.product.price * i.quantity, 0).toFixed(2)}</span>
                   </div>
                   <button className="w-full bg-indigo-600 py-4 rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-900/20 active:scale-95">
                     Secure Checkout
                   </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
