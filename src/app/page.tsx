"use client";

import Link from 'next/link';
import { ArrowRight, ShoppingBag, PieChart, Users, Shield, Zap, Package } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-32 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold mb-6 animate-fade-in">
              <Zap size={16} />
              <span>Experience Modern Retail Excellence</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 leading-none tracking-tight mb-8">
              Beautiful <span className="text-indigo-600">Retail</span> <br />
              Analytics & Shop
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              The ultimate platform for modern merchants. View insightful analytics,
              manage your inventory, and provide a premium shopping experience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products" className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-600 transition-all shadow-xl hover:shadow-indigo-200 active:scale-[0.98] flex items-center justify-center gap-2">
                Start Shopping
                <ShoppingBag size={20} />
              </Link>
              <Link href="/register" className="w-full sm:w-auto bg-white text-gray-900 border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold text-lg hover:border-indigo-600 hover:text-indigo-600 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                Create Account
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <PieChart size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Live Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Real-time data visualization of your sales, orders, and customer trends.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Package size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Inventory</h3>
              <p className="text-gray-600 leading-relaxed">
                Automated tracking and categorization of your entire product catalog.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">CRM Integration</h3>
              <p className="text-gray-600 leading-relaxed">
                Seamless management of user accounts and purchase history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6 text-yellow-400">
            {[...Array(5)].map((_, i) => <Zap key={i} size={24} fill="currentColor" />)}
          </div>
          <p className="text-3xl font-medium text-gray-900 leading-tight italic">
            "The most intuitive commerce platform I've ever used. The data insights are absolute game-changers for our quarterly growth."
          </p>
          <div className="mt-8">
            <p className="font-bold text-indigo-600">Sarah Jenkins</p>
            <p className="text-gray-500 text-sm">Director of Operations @ TrendFlow</p>
          </div>
        </div>
      </section>
    </div>
  );
}
