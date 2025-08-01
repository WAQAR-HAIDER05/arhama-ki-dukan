// src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { SearchProvider } from './contexts/SearchContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import FloatingWhatsApp from './components/WhatsApp/FloatingWhatsApp';
import LoadingSpinner from './components/UI/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './styles/globals.css';

// Lazy load all pages
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Announcements = lazy(() => import('./pages/Announcements'));
const Admin = lazy(() => import('./pages/Admin'));
const ProductFlowDemo = lazy(() => import('./pages/ProductFlowDemo'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <SearchProvider>
          <Router>
            <div className="min-h-screen bg-white text-black font-sans">
              <Header />

              <main className="pt-16 md:pt-20">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:category" element={<Products />} />
                    <Route path="/products/:category/:subcategory" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/announcements" element={<Announcements />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/demo" element={<ProductFlowDemo />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>

              <Footer />
              <FloatingWhatsApp />
            </div>
          </Router>
        </SearchProvider>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
