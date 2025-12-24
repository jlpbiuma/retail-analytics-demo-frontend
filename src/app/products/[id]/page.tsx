"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { ShoppingCart, Star, ShieldCheck, Truck, Heart } from 'lucide-react';
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
  ean: string;
  quantity: number;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error('Failed to fetch product details', err);
        toast.error('Product Error', {
          description: 'Could not load product details.'
        });
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    const checkFavorite = async () => {
      if (isAuthenticated && user && id) {
        try {
          const res = await api.get(`/favorites/?user_id=${user.id}`);
          const favs = res.data;
          setIsFavorite(favs.some((f: any) => f.product_id === Number(id)));
        } catch (err) {
          console.error('Failed to check favorites', err);
        }
      }
    };
    checkFavorite();
  }, [isAuthenticated, user, id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    addToCart(product);
  };

  const handleWishlist = async () => {
    if (!isAuthenticated || !user) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      if (isFavorite) {
        await api.delete(`/favorites/${id}?user_id=${user.id}`);
        setIsFavorite(false);
        toast.info('Removed from Favorites');
      } else {
        await api.post(`/favorites/?user_id=${user.id}`, { product_id: Number(id) });
        setIsFavorite(true);
        toast.success('Added to Favorites!', {
          description: `${product?.title} is now in your wishlist.`,
        });
      }
    } catch (err) {
      toast.error('Favorite Action Failed');
    }
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <div className="animate-spin inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mb-4"></div>
      <p className="text-gray-500">Loading product details...</p>
    </div>
  );

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
      <p className="text-gray-500">The product you are looking for does not exist or has been removed.</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center justify-center p-20 relative overflow-hidden group">
            <span className="text-9xl text-gray-200 group-hover:scale-110 transition-transform duration-700">📦</span>
            <div className="absolute top-6 left-6 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
              Free Delivery
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-50 rounded-xl border border-transparent hover:border-indigo-600 cursor-pointer transition-colors flex items-center justify-center">
                <span className="text-2xl text-gray-300">🖼️</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-lg">
              {product.category}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-4 leading-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                <Star size={18} fill="currentColor" />
                <span className="font-bold">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500 text-sm">SKU: {product.ean}</span>
              <span className="text-gray-400">|</span>
              <span className="text-green-600 font-medium text-sm flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                In Stock ({product.quantity})
              </span>
            </div>
          </div>

          <div className="mb-8">
            <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            <p className="text-gray-500 mt-2">Sold by <span className="text-indigo-600 font-bold">{product.vendor}</span></p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">Key Features</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">🔹 High-quality materials and build</li>
                <li className="flex items-center gap-2">🔹 Modern design aesthetic</li>
                <li className="flex items-center gap-2">🔹 Optimized for performance and durability</li>
                <li className="flex items-center gap-2">🔹 Eco-friendly manufacturing process</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 shadow-sm">
                <Truck className="text-indigo-600" size={24} />
                <div>
                  <p className="font-bold text-gray-900">Fast Shipping</p>
                  <p className="text-gray-500 text-xs">2-3 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 shadow-sm">
                <ShieldCheck className="text-indigo-600" size={24} />
                <div>
                  <p className="font-bold text-gray-900">Secure Warranty</p>
                  <p className="text-gray-500 text-xs">2 years protection</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button 
              onClick={handleWishlist}
              className={`px-6 py-4 rounded-2xl border-2 transition-all active:scale-[0.95] ${
                isFavorite 
                ? 'border-red-500 text-red-500 bg-red-50' 
                : 'border-gray-200 hover:border-red-500 hover:text-red-500'
              }`}
            >
              <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Information</h2>
        <div className="prose max-w-none text-gray-600 leading-relaxed">
          <p>
            Experience exceptional quality with the {product.title}. Part of our premium {product.category} collection, 
            this product represents the perfect balance of form and function. Designed for discerning customers 
            who value both performance and aesthetics.
          </p>
          <p className="mt-4">
            Vendor: {product.vendor}<br />
            Category ID: {product.category}<br />
            Product ID: {product.id}
          </p>
        </div>
      </div>
    </div>
  );
}
