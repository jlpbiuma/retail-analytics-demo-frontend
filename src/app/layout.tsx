import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AgentBubble from "@/components/AgentBubble"; // Import the agent bubble
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RetailApp | Premium Analytics & Shopping",
  description: "Experience modern retail management and shopping in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        <AuthProvider>
          <CartProvider>
            <Toaster position="top-center" richColors />
            <Navbar />
            <main className="min-h-[calc(100vh-64px)]">
              {children}
            </main>
            <AgentBubble /> {/* Add the bubble globally */}
            <footer className="bg-gray-50 border-t py-12 px-4 text-center sm:text-left">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-1">
                  <span className="text-xl font-bold text-indigo-600">RetailApp</span>
                  <p className="text-gray-500 text-sm mt-4">
                    Redefining the digital retail experience with powerful analytics and seamless commerce.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">Shop</h4>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li>Products</li>
                    <li>Categories</li>
                    <li>Deals</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li>Analytics</li>
                    <li>Inventory</li>
                    <li>Support</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">Company</h4>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li>About</li>
                    <li>Privacy</li>
                    <li>Terms</li>
                  </ul>
                </div>
              </div>
              <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 text-center text-gray-400 text-sm">
                © 2024 RetailApp Inc. All rights reserved.
              </div>
            </footer>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
