/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, MouseEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  RefreshCw, 
  Eye, 
  Star, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft, 
  Check, 
  Copy, 
  Award, 
  Heart, 
  HelpCircle, 
  Mail, 
  MapPin, 
  Phone, 
  User, 
  DollarSign, 
  FileText, 
  Smartphone, 
  X, 
  FileCode, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  Target,
  Users,
  Briefcase,
  Shield,
  Lightbulb,
  Github,
  Download,
  AlertCircle,
  Truck
} from 'lucide-react';
import { PRODUCTS } from './data';
import { Product, CartItem, ShippingDetails, BusinessMetric } from './types';

// Dummy Google Analytics Events Stream inside UI
interface AnalyticsLog {
  timestamp: string;
  eventName: string;
  params: any;
}

export default function App() {
  // Navigation Tabs
  // 'store' | 'business' | 'github'
  const [activeTab, setActiveTab] = useState<'store' | 'business' | 'github'>('store');

  // E-commerce State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalTab, setModalTab] = useState<'benefits' | 'ingredients' | 'howToUse'>('benefits');
  
  // Checkout flow state
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: 'Sopi Maulidia',
    email: 'sopimaulidia4@gmail.com',
    phone: '082124567890',
    address: 'Jl. Kebon Jeruk No. 42, RT 05 / RW 03, Kebon Jeruk',
    city: 'Jakarta Barat',
    postalCode: '11530',
    shippingMethod: 'reguler',
    paymentMethod: 'qris'
  });

  // Simulated Payment State
  const [paymentGatewayOpen, setPaymentGatewayOpen] = useState(false);
  const [paymentTimeLeft, setPaymentTimeLeft] = useState('05:00');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success'>('pending');
  const [simulatedOrderId, setSimulatedOrderId] = useState('');

  // Source code file viewer state
  const [selectedCodeFile, setSelectedCodeFile] = useState<'html' | 'css' | 'js' | 'readme'>('html');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  // Live analytics logs in dashboard
  const [analyticsLogs, setAnalyticsLogs] = useState<AnalyticsLog[]>([]);

  // 1. Google Analytics Simulation Helper
  const logGAEvent = (eventName: string, params: any) => {
    const newLog: AnalyticsLog = {
      timestamp: new Date().toLocaleTimeString(),
      eventName,
      params
    };
    setAnalyticsLogs(prev => [newLog, ...prev].slice(0, 15)); // Keep last 15 logs
    console.log(`[Google Analytics] Event: ${eventName}`, params);
  };

  // Initialize cart from localStorage & Log Session
  useEffect(() => {
    const savedCart = localStorage.getItem('shoppay_beauty_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart from localStorage', e);
      }
    }
    logGAEvent('session_start', { timestamp: Date.now(), referrer: 'AI-Studio-Build' });
  }, []);

  // Update localStorage when cart changes
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    localStorage.setItem('shoppay_beauty_cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  // 2. Shopping Cart Handlers
  const handleAddToCart = (product: Product, event?: MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    let updated: CartItem[] = [];
    if (existingIndex > -1) {
      updated = [...cart];
      updated[existingIndex].quantity += 1;
    } else {
      updated = [...cart, { product, quantity: 1 }];
    }
    saveCartToStorage(updated);
    setIsCartOpen(true);
    logGAEvent('add_to_cart', { 
      item_id: product.id, 
      item_name: product.name, 
      price: product.price, 
      quantity: 1 
    });
  };

  const handleUpdateQuantity = (productId: string, change: number) => {
    const updated = cart.map(item => {
      if (item.product.id === productId) {
        const qty = item.quantity + change;
        return { ...item, quantity: qty > 0 ? qty : 0 };
      }
      return item;
    }).filter(item => item.quantity > 0);
    
    saveCartToStorage(updated);
    if (change < 0) {
      logGAEvent('remove_from_cart', { item_id: productId });
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    const updated = cart.filter(item => item.product.id !== productId);
    saveCartToStorage(updated);
    logGAEvent('remove_from_cart', { item_id: productId });
  };

  // 3. Math & Totals Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartDiscount = cartSubtotal > 200000 ? Math.round(cartSubtotal * 0.1) : 0; // 10% discount on > 200k
  const shippingCost = shippingDetails.shippingMethod === 'instant' ? 25000 : (cartSubtotal > 150000 ? 0 : 15000); // free ship on > 150k
  const cartGrandTotal = cartSubtotal - cartDiscount + shippingCost;

  // 4. Filtering products
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const handleFilterCategory = (category: string) => {
    setSelectedCategory(category);
    logGAEvent('filter_category', { category });
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      logGAEvent('search_query', { query });
    }
  };

  const handlePriceChange = (price: number) => {
    setMaxPrice(price);
    logGAEvent('filter_price', { max_price: price });
  };

  // 5. Checkout Forms Submission
  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    // Set simulated order Id
    setSimulatedOrderId('SPB-' + Math.floor(100000 + Math.random() * 900000));
    setPaymentStatus('pending');
    setPaymentGatewayOpen(true);
    
    // Begin timer
    let minutes = 5;
    let seconds = 0;
    const timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          return;
        }
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      const mStr = minutes < 10 ? '0' + minutes : minutes;
      const sStr = seconds < 10 ? '0' + seconds : seconds;
      setPaymentTimeLeft(`${mStr}:${sStr}`);
    }, 1000);

    // Simulated sandbox success trigger after 4 seconds
    setTimeout(() => {
      setPaymentStatus('success');
      clearInterval(timer);
      logGAEvent('purchase', {
        transaction_id: 'SPB-' + Math.floor(100000 + Math.random() * 900000),
        value: cartGrandTotal,
        currency: 'IDR',
        items_count: cart.reduce((sum, item) => sum + item.quantity, 0)
      });
    }, 4500);

    logGAEvent('add_payment_info', { payment_method: shippingDetails.paymentMethod });
  };

  const handleFinalizeCheckout = () => {
    setCart([]);
    localStorage.removeItem('shoppay_beauty_cart');
    setPaymentGatewayOpen(false);
    setIsCheckoutMode(false);
  };

  // Code files definitions for the File Viewer tab
  const vanillaHtmlCode = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SHOPPAY-Beauty | Premium Cosmetics Store</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <!-- Header, Hero, Catalog, Cart, Checkout, Footer Layout -->
  <!-- Fully responsive with clean inline SVGs -->
  <script src="js/app.js"></script>
</body>
</html>`;

  const vanillaCssCode = `/* Core branding variables & utility resets */
:root {
  --font-sans: 'Inter', sans-serif;
  --color-bg-50: #fdf8f5;
  --color-primary: #b37456;
  --color-accent-gold: #ca9d83;
}

/* Complete CSS Media Queries for layout breakpoints */
@media (min-width: 576px) { ... }
@media (min-width: 768px) { ... }
@media (min-width: 992px) { ... }
@media (min-width: 1200px) { ... }`;

  const vanillaJsCode = `// 10 Curated Products
const PRODUCTS = [ ... ];

// Interactive Catalog Filters & Search
function renderProducts() { ... }

// Shopping Cart state synchronized with localStorage
function addToCart(id) { ... }

// Simulated payment sandbox gates
function openSimulatedPaymentGateway() { ... }`;

  const getCodeContent = () => {
    switch (selectedCodeFile) {
      case 'html': return { title: 'index.html (Vanilla Structure)', code: vanillaHtmlCode, desc: 'File layout utama yang bersih, modular, menggunakan inline SVG untuk kehandalan luring (offline).' };
      case 'css': return { title: 'css/style.css (Media Queries Stylesheet)', code: vanillaCssCode, desc: 'Sistem desain penuh yang dipisah dari berkas utama HTML, lengkap dengan queries responsif.' };
      case 'js': return { title: 'js/app.js (Interactive Logic Engine)', code: vanillaJsCode, desc: 'Koneksi pencarian langsung, filter harga, keranjang belanja localStorage, dan gateway simulasi QRIS.' };
      case 'readme': return { title: 'README.md (Business Overview & Deploy)', code: '# Business overview documents & Github Pages upload guidelines.', desc: 'Dokumen lengkap yang berisi rencana bisnis, analisis pasar, metrik analytics, dan panduan tugas.' };
    }
  };

  const copyCodeToClipboard = () => {
    const content = getCodeContent();
    navigator.clipboard.writeText(content.code);
    setCopiedFile(selectedCodeFile);
    setTimeout(() => setCopiedFile(null), 2000);
    logGAEvent('copy_source_code', { file: selectedCodeFile });
  };

  // Business Metrics Definitions
  const businessMetrics: BusinessMetric[] = [
    { metric: 'Rasio Pantulan (Bounce Rate)', value: '34.2%', change: '-4.8%', trend: 'up', description: 'Persentase pengunjung langsung keluar setelah tiba. Turun menunjukkan halaman utama sangat memikat.' },
    { metric: 'Rasio Konversi (Conversion Rate)', value: '4.85%', change: '+1.2%', trend: 'up', description: 'Persentase kunjungan biasa menjadi transaksi bayar sukses. Rata-rata e-commerce adalah 2%.' },
    { metric: 'Cart Abandonment Rate', value: '48.3%', change: '-8.5%', trend: 'up', description: 'Keranjang belanja yang ditinggalkan sebelum checkout. Menurun berkat formulir pengisian yang ringkas.' },
    { metric: 'Average Order Value (AOV)', value: 'Rp 268.000', change: '+Rp 32.000', trend: 'up', description: 'Rata-rata pengeluaran per konsumen. Meningkat berkat promosi diskon otomatis di atas Rp 200rb.' }
  ];

  return (
    <div className="min-h-screen bg-beauty-50 flex flex-col selection:bg-beauty-300 selection:text-beauty-900">
      
      {/* HEADER UTAMA / TOP NAVIGATOR BAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-black/10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveTab('store'); setIsCheckoutMode(false); }}>
            <span className="font-display text-2xl font-black tracking-tighter uppercase text-[#1A1A1A]">
              SHOPPAY<span className="text-beauty-500 underline decoration-4 underline-offset-6">BEAUTY</span>
            </span>
          </div>

          {/* Tab Menu Utama */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('store')}
              className={`px-1 py-2 font-display text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${activeTab === 'store' ? 'text-beauty-500 border-b-2 border-beauty-500' : 'text-stone-500 hover:text-stone-900'}`}
            >
              🛍️ Toko Belanja
            </button>
            <button 
              onClick={() => setActiveTab('business')}
              className={`px-1 py-2 font-display text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${activeTab === 'business' ? 'text-beauty-500 border-b-2 border-beauty-500' : 'text-stone-500 hover:text-stone-900'}`}
            >
              📊 Analisis Bisnis
            </button>
            <button 
              onClick={() => setActiveTab('github')}
              className={`px-1 py-2 font-display text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${activeTab === 'github' ? 'text-beauty-500 border-b-2 border-beauty-500' : 'text-stone-500 hover:text-stone-900'}`}
            >
              🚀 Panduan GitHub & Unduh
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setActiveTab('store'); setIsCartOpen(true); }}
              className="relative p-2.5 rounded-full hover:bg-black/5 text-stone-700 transition-all cursor-pointer border border-black/5"
              aria-label="Buka Keranjang"
              id="cart-trigger-button"
            >
              <ShoppingCart size={20} className="stroke-[2.5]" />
              <AnimatePresence>
                {cart.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-black text-white font-mono font-black text-[10px] rounded-full w-5 h-5 flex items-center justify-center shadow-md border border-white"
                  >
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION PILLS */}
      <div className="md:hidden sticky top-20 z-30 bg-white border-b border-black/10 p-2 flex items-center justify-around gap-1 font-display text-xs font-black uppercase tracking-widest">
        <button 
          onClick={() => { setActiveTab('store'); setIsCheckoutMode(false); }}
          className={`flex-1 py-2 text-center rounded-sm transition-all cursor-pointer ${activeTab === 'store' ? 'bg-black text-white' : 'text-stone-600'}`}
        >
          🛍️ Toko
        </button>
        <button 
          onClick={() => setActiveTab('business')}
          className={`flex-1 py-2 text-center rounded-sm transition-all cursor-pointer ${activeTab === 'business' ? 'bg-black text-white' : 'text-stone-600'}`}
        >
          📊 Bisnis
        </button>
        <button 
          onClick={() => setActiveTab('github')}
          className={`flex-1 py-2 text-center rounded-sm transition-all cursor-pointer ${activeTab === 'github' ? 'bg-black text-white' : 'text-stone-600'}`}
        >
          🚀 GitHub
        </button>
      </div>

      {/* CORE VIEWPORT CONTENT */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* ======================= TAB 1: E-COMMERCE STOREFRONT ======================= */}
          {activeTab === 'store' && (
            <motion.div 
              key="store"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {!isCheckoutMode ? (
                <>
                  {/* HERO BANNER SECTION */}
                  <div className="relative overflow-hidden bg-rose-50/70 py-16 md:py-24 border-b border-black/10" id="hero-banner">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                      
                      {/* Left Column: Hero Copywriting */}
                      <div className="flex flex-col gap-6">
                        <span className="font-display font-black text-[10px] uppercase tracking-[0.2em] text-beauty-500 bg-white border border-black/10 shadow-xs rounded-sm px-4 py-2 self-start">
                          ✨ 100% Organik & BPOM Halal
                        </span>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] leading-none font-black uppercase tracking-tighter">
                          PANCARKAN PESONA <br />
                          <span className="text-beauty-500 underline decoration-4 underline-offset-4 decoration-rose-500/50">ALAMI SEJATI</span> BERSAMA KAMI
                        </h1>
                        <p className="text-stone-600 text-sm max-w-lg leading-relaxed font-medium">
                          Temukan koleksi kosmetik dan produk perawatan premium, organik, dan cruelty-free terkurasi di <strong className="font-black text-stone-900">SHOPPAY-Beauty</strong>. Dirancang khusus untuk menutrisi kulit Anda dengan hasil memukau.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-2">
                          <a 
                            href="#catalog-section" 
                            className="bg-black text-white hover:bg-neutral-800 font-display text-xs font-black uppercase tracking-widest px-8 py-4 rounded-xs transition-all border border-black"
                          >
                            Belanja Sekarang
                          </a>
                          <button 
                            onClick={() => setActiveTab('business')} 
                            className="bg-transparent hover:bg-black hover:text-white text-black border-2 border-black font-display text-xs font-black uppercase tracking-widest px-8 py-4 rounded-xs transition-all"
                          >
                            Rencana Bisnis Kami
                          </button>
                        </div>
                      </div>

                      {/* Right Column: Hero Banner Image Card */}
                      <div className="relative flex justify-center">
                        <div className="relative overflow-hidden border-4 border-black max-w-sm sm:max-w-md bg-white p-3">
                          <img 
                            src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80" 
                            alt="SHOPPAY Cosmetics Hero Banner" 
                            className="w-full h-96 object-cover border border-black/10"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Floater overlay tag */}
                        <div className="absolute bottom-6 -left-4 bg-white p-4 rounded-sm border-2 border-black flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                          <span className="font-display text-4xl font-black tracking-tighter text-beauty-500">100%</span>
                          <span className="text-[#1A1A1A] text-[10px] font-black uppercase tracking-wider leading-tight">
                            Bahan Alami<br />Bebas Kimia Berbahaya
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                     {/* TRUST BADGES & BRAND FEATURES */}
                  <div className="bg-white py-12 border-b border-black/10" id="brand-features">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-rose-50 border border-black/10 text-beauty-500 rounded-xs">
                          <Award size={22} className="stroke-[2.5]" />
                        </div>
                        <div>
                          <h4 className="font-display font-black text-xs uppercase tracking-widest text-[#1A1A1A]">Halal & BPOM</h4>
                          <p className="text-stone-500 text-xs mt-1 leading-normal">Telah diuji klinis aman oleh BPOM & MUI halal.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-rose-50 border border-black/10 text-beauty-500 rounded-xs">
                          <Truck size={22} className="stroke-[2.5]" />
                        </div>
                        <div>
                          <h4 className="font-display font-black text-xs uppercase tracking-widest text-[#1A1A1A]">Gratis Ongkir</h4>
                          <p className="text-stone-500 text-xs mt-1 leading-normal">Bebas biaya kirim minimum belanja Rp 150.000.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-rose-50 border border-black/10 text-[#1A1A1A] rounded-xs">
                          <Shield size={22} className="stroke-[2.5]" />
                        </div>
                        <div>
                          <h4 className="font-display font-black text-xs uppercase tracking-widest text-[#1A1A1A]">100% Original</h4>
                          <p className="text-stone-500 text-xs mt-1 leading-normal">Produk dijamin asli langsung dari produsen resmi.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-rose-50 border border-black/10 text-beauty-500 rounded-xs">
                          <Heart size={22} className="stroke-[2.5]" />
                        </div>
                        <div>
                          <h4 className="font-display font-black text-xs uppercase tracking-widest text-[#1A1A1A]">Cruelty-Free</h4>
                          <p className="text-stone-500 text-xs mt-1 leading-normal">Dibuat secara etis tanpa pengujian pada hewan.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PRODUCTS CATALOG SECTION */}
                  <section className="py-16 md:py-24" id="catalog-section">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      
                      {/* Section Title */}
                      <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="font-display text-[10px] font-black uppercase tracking-[0.25em] text-beauty-500">Koleksi Terkurasi</span>
                        <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tighter text-[#1A1A1A] mt-2">Katalog Kosmetik Unggulan</h2>
                        <div className="w-16 h-1 bg-black mx-auto my-4"></div>
                        <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider">
                          Temukan produk perawatan wajah organik berkualitas, pelembab, wewangian mewah, dan riasan bibir eksklusif sesuai dengan karakter kulit Anda.
                        </p>
                      </div>

                      {/* Search Bar & Advanced Multi-Filters UI Panel */}
                      <div className="bg-white border-2 border-black p-6 mb-12 flex flex-col gap-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        
                        {/* Row 1: Search Inputs */}
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 stroke-[2.5]" size={18} />
                          <input 
                            type="text" 
                            placeholder="Cari produk kecantikan, pelembab bibir, serum vitamin C, bahan aktif..." 
                            value={searchQuery}
                            onChange={(e) => handleSearchQueryChange(e.target.value)}
                            className="w-full bg-[#FAF9F6] border-2 border-black focus:border-beauty-500 rounded-none py-3.5 pl-12 pr-4 text-stone-900 text-sm font-semibold transition-all outline-hidden"
                          />
                        </div>

                        {/* Row 2: Filter Group Pills & Price Range Slider */}
                        <div className="grid lg:grid-cols-12 gap-6 items-center">
                          
                          {/* Categories Selection Tabs (8/12 cols) */}
                          <div className="lg:col-span-8 flex flex-col gap-2">
                            <span className="font-display text-[10px] font-black uppercase tracking-[0.2em] text-stone-900 flex items-center gap-1.5">
                              <Filter size={12} className="stroke-[2.5]" /> FILTER KATEGORI
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {['All', 'Skincare', 'Makeup', 'Haircare', 'Fragrance'].map(cat => (
                                <button 
                                  key={cat}
                                  onClick={() => handleFilterCategory(cat)}
                                  className={`px-4 py-2 font-display text-xs font-black uppercase tracking-widest border-2 transition-all cursor-pointer rounded-xs ${
                                    selectedCategory === cat 
                                      ? 'bg-black text-white border-black' 
                                      : 'bg-transparent text-stone-700 border-neutral-300 hover:border-black'
                                  }`}
                                >
                                  {cat === 'All' ? 'Semua Produk' : cat}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Price Slider Section (4/12 cols) */}
                          <div className="lg:col-span-4 flex flex-col gap-2">
                            <div className="flex justify-between items-center font-display text-[10px] font-black uppercase tracking-[0.2em] text-stone-600">
                              <span>Maksimal Harga</span>
                              <span className="text-beauty-500 font-black text-sm">Rp {maxPrice.toLocaleString('id-ID')}</span>
                            </div>
                            <input 
                              type="range" 
                              min="50000" 
                              max="500000" 
                              step="10000"
                              value={maxPrice} 
                              onChange={(e) => handlePriceChange(parseInt(e.target.value))}
                              className="w-full accent-black h-2 bg-stone-200 rounded-none cursor-pointer border border-black/10"
                            />
                          </div>

                        </div>
                      </div>

                      {/* Dynamic Product Grid */}
                      {filteredProducts.length === 0 ? (
                        <div className="bg-white border-2 border-black p-12 text-center max-w-md mx-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                          <p className="text-[#1A1A1A] font-bold text-sm">Produk kosmetik yang Anda cari tidak ditemukan.</p>
                          <button 
                            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setMaxPrice(500000); }} 
                            className="mt-4 bg-black text-white hover:bg-neutral-800 border-2 border-black font-display text-xs font-black uppercase tracking-widest px-6 py-3 transition-all cursor-pointer rounded-xs"
                          >
                            Reset Filter Pencarian
                          </button>
                        </div>
                      ) : (
                        <motion.div 
                          layout 
                          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                          {filteredProducts.map(product => (
                            <motion.div 
                              layout
                              key={product.id}
                              className="bg-white rounded-none border-2 border-black overflow-hidden hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all flex flex-col group relative cursor-pointer"
                              onClick={() => { setSelectedProduct(product); setModalTab('benefits'); logGAEvent('view_item', { item_id: product.id, item_name: product.name }); }}
                            >
                              {/* SALE TAG */}
                              {product.originalPrice && (
                                <span className="absolute top-3 left-3 bg-[#E11D48] text-white font-display font-black text-[10px] tracking-widest uppercase px-2.5 py-1.5 rounded-none z-10 border border-black">
                                  Sale -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                </span>
                              )}

                              {/* IMAGE CONTAINER */}
                              <div className="aspect-square bg-stone-100 overflow-hidden relative border-b-2 border-black">
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-all"></div>
                                
                                {/* Overlay quick action */}
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black text-white py-2.5 px-4 rounded-none border border-white font-display text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5 shadow-md">
                                  <Eye size={12} className="stroke-[2.5]" /> LIHAT DETAIL
                                </div>
                              </div>

                              {/* CARD TEXT DETAIL */}
                              <div className="p-5 flex flex-col flex-grow">
                                <span className="font-display font-black text-[10px] text-beauty-500 uppercase tracking-[0.2em] mb-1">
                                  {product.category}
                                </span>
                                <h3 className="font-display font-black text-stone-900 text-sm leading-snug uppercase tracking-tight group-hover:text-beauty-500 transition-colors line-clamp-1 mb-2">
                                  {product.name}
                                </h3>

                                <div className="flex items-center gap-1.5 mb-4">
                                  <div className="flex text-amber-500 gap-0.5"><Star size={12} fill="currentColor" className="stroke-none" /></div>
                                  <span className="text-[#1A1A1A] text-xs font-black">{product.rating.toFixed(1)}</span>
                                  <span className="text-stone-500 text-[10px] font-semibold uppercase tracking-wider">({product.reviewsCount} ulasan)</span>
                                </div>

                                {/* PRICE DISPLAY ROW */}
                                <div className="mt-auto flex items-baseline gap-2 mb-4">
                                  <span className="font-display font-black text-stone-900 text-base tracking-tight">
                                    Rp {product.price.toLocaleString('id-ID')}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-stone-400 text-xs line-through font-bold">
                                      Rp {product.originalPrice.toLocaleString('id-ID')}
                                    </span>
                                  )}
                                </div>

                                {/* CARDS ACTIONS */}
                                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-black/10">
                                  <button 
                                    onClick={(e) => handleAddToCart(product, e)}
                                    className="bg-black hover:bg-neutral-800 text-white font-display font-black text-[10px] uppercase tracking-widest py-3 rounded-none transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-black"
                                  >
                                    <ShoppingCart size={12} className="stroke-[2.5]" /> + Keranjang
                                  </button>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); setModalTab('benefits'); logGAEvent('view_item', { item_id: product.id }); }}
                                    className="bg-transparent hover:bg-black/5 text-stone-900 border border-black font-display font-black text-[10px] uppercase tracking-widest py-3 rounded-none transition-all cursor-pointer"
                                  >
                                    Detail
                                  </button>
                                </div>

                              </div>

                            </motion.div>
                          ))}
                        </motion.div>
                      )}

                    </div>
                  </section>
                </>
              ) : (
                
                // ======================= CHECKOUT SCREEN =======================
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
                  
                  {/* Back button */}
                  <button 
                    onClick={() => setIsCheckoutMode(false)}
                    className="flex items-center gap-2 text-stone-600 hover:text-beauty-600 font-display font-medium text-sm mb-8 transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={16} /> Kembali Belanja
                  </button>

                  <h2 className="font-serif text-3xl text-stone-900 mb-2">Formulir Pengiriman & Pembayaran</h2>
                  <p className="text-stone-500 text-sm mb-10">Isi data pengiriman di bawah ini untuk mensimulasikan proses checkout dengan Midtrans sandbox gateway.</p>

                  <div className="grid lg:grid-cols-12 gap-10">
                    
                    {/* Left Panel: Checkout Forms (8/12 cols) */}
                    <div className="lg:col-span-8 bg-white rounded-2xl border border-beauty-100 p-6 sm:p-8">
                      <h3 className="font-display font-bold text-stone-900 text-lg border-b border-beauty-100 pb-4 mb-6">
                        Data Pengiriman Penerima
                      </h3>

                      <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-6">
                        
                        <div className="flex flex-col gap-1.5">
                          <label className="text-stone-700 text-xs font-semibold uppercase tracking-wider">Nama Lengkap *</label>
                          <input 
                            type="text" 
                            required 
                            value={shippingDetails.fullName}
                            onChange={(e) => setShippingDetails({...shippingDetails, fullName: e.target.value})}
                            placeholder="Contoh: Sopi Maulidia"
                            className="bg-beauty-50 border border-beauty-200 focus:border-beauty-500 rounded-lg p-3 text-stone-800 text-sm outline-hidden transition-all"
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-stone-700 text-xs font-semibold uppercase tracking-wider">Alamat Email *</label>
                            <input 
                              type="email" 
                              required 
                              value={shippingDetails.email}
                              onChange={(e) => setShippingDetails({...shippingDetails, email: e.target.value})}
                              placeholder="contoh@domain.com"
                              className="bg-beauty-50 border border-beauty-200 focus:border-beauty-500 rounded-lg p-3 text-stone-800 text-sm outline-hidden transition-all"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-stone-700 text-xs font-semibold uppercase tracking-wider">Nomor HP/WhatsApp *</label>
                            <input 
                              type="tel" 
                              required 
                              value={shippingDetails.phone}
                              onChange={(e) => setShippingDetails({...shippingDetails, phone: e.target.value})}
                              placeholder="Contoh: 082124567890"
                              className="bg-beauty-50 border border-beauty-200 focus:border-beauty-500 rounded-lg p-3 text-stone-800 text-sm outline-hidden transition-all"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-stone-700 text-xs font-semibold uppercase tracking-wider">Alamat Lengkap Rumah *</label>
                          <textarea 
                            rows={3}
                            required 
                            value={shippingDetails.address}
                            onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})}
                            placeholder="Tulis nama jalan, RT/RW, nomor rumah, kelurahan, kecamatan..."
                            className="bg-beauty-50 border border-beauty-200 focus:border-beauty-500 rounded-lg p-3 text-stone-800 text-sm outline-hidden transition-all"
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-stone-700 text-xs font-semibold uppercase tracking-wider">Kabupaten / Kota *</label>
                            <input 
                              type="text" 
                              required 
                              value={shippingDetails.city}
                              onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})}
                              placeholder="Contoh: Jakarta Barat"
                              className="bg-beauty-50 border border-beauty-200 focus:border-beauty-500 rounded-lg p-3 text-stone-800 text-sm outline-hidden transition-all"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-stone-700 text-xs font-semibold uppercase tracking-wider">Kode Pos *</label>
                            <input 
                              type="text" 
                              required 
                              value={shippingDetails.postalCode}
                              onChange={(e) => setShippingDetails({...shippingDetails, postalCode: e.target.value})}
                              placeholder="Masukkan kode pos..."
                              className="bg-beauty-50 border border-beauty-200 focus:border-beauty-500 rounded-lg p-3 text-stone-800 text-sm outline-hidden transition-all"
                            />
                          </div>
                        </div>

                        {/* SHIPPING SELECTION BUTTONS */}
                        <div className="flex flex-col gap-3 mt-4">
                          <span className="text-stone-700 text-xs font-semibold uppercase tracking-wider">Metode Pengiriman</span>
                          <div className="grid sm:grid-cols-2 gap-4">
                            
                            {/* Reguler delivery option */}
                            <div 
                              onClick={() => setShippingDetails({ ...shippingDetails, shippingMethod: 'reguler' })}
                              className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                                shippingDetails.shippingMethod === 'reguler' 
                                  ? 'border-beauty-500 bg-beauty-100/40' 
                                  : 'border-beauty-200 bg-beauty-50 hover:border-beauty-300'
                              }`}
                            >
                              <input 
                                type="radio" 
                                name="shippingMethod" 
                                checked={shippingDetails.shippingMethod === 'reguler'} 
                                readOnly 
                                className="accent-beauty-600 mt-1"
                              />
                              <div>
                                <h4 className="font-display font-semibold text-stone-950 text-sm">Regular Shipping</h4>
                                <p className="text-stone-500 text-xs mt-1">Estimasi 3 - 5 Hari Kerja</p>
                                <span className="text-beauty-600 text-xs font-bold block mt-2">
                                  {cartSubtotal > 150000 ? 'GRATIS ONGKIR' : 'Rp 15.000'}
                                </span>
                              </div>
                            </div>

                            {/* GoSend instant delivery option */}
                            <div 
                              onClick={() => setShippingDetails({ ...shippingDetails, shippingMethod: 'instant' })}
                              className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                                shippingDetails.shippingMethod === 'instant' 
                                  ? 'border-beauty-500 bg-beauty-100/40' 
                                  : 'border-beauty-200 bg-beauty-50 hover:border-beauty-300'
                              }`}
                            >
                              <input 
                                type="radio" 
                                name="shippingMethod" 
                                checked={shippingDetails.shippingMethod === 'instant'} 
                                readOnly 
                                className="accent-beauty-600 mt-1"
                              />
                              <div>
                                <h4 className="font-display font-semibold text-stone-950 text-sm">GoSend / Instant</h4>
                                <p className="text-stone-500 text-xs mt-1">Estimasi Tiba dalam 1 - 2 Jam</p>
                                <span className="text-beauty-600 text-xs font-bold block mt-2">Rp 25.000 (Tarif Flat)</span>
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* PAYMENT SELECTION BUTTONS */}
                        <div className="flex flex-col gap-3 mt-4">
                          <span className="text-stone-700 text-xs font-semibold uppercase tracking-wider">Metode Pembayaran (Simulasi Sandbox)</span>
                          <div className="grid sm:grid-cols-2 gap-4">
                            
                            {/* QRIS method */}
                            <div 
                              onClick={() => setShippingDetails({ ...shippingDetails, paymentMethod: 'qris' })}
                              className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                                shippingDetails.paymentMethod === 'qris' 
                                  ? 'border-beauty-500 bg-beauty-100/40' 
                                  : 'border-beauty-200 bg-beauty-50 hover:border-beauty-300'
                              }`}
                            >
                              <input 
                                type="radio" 
                                name="paymentMethod" 
                                checked={shippingDetails.paymentMethod === 'qris'} 
                                readOnly 
                                className="accent-beauty-600 mt-1"
                              />
                              <div>
                                <h4 className="font-display font-semibold text-stone-950 text-sm">QRIS Dompet Digital</h4>
                                <p className="text-stone-500 text-xs mt-1">GoPay, ShopeePay, OVO, Dana</p>
                                <span className="text-beauty-600 text-xs font-bold block mt-2">QR Code Instan</span>
                              </div>
                            </div>

                            {/* Bank Transfer VA method */}
                            <div 
                              onClick={() => setShippingDetails({ ...shippingDetails, paymentMethod: 'va' })}
                              className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                                shippingDetails.paymentMethod === 'va' 
                                  ? 'border-beauty-500 bg-beauty-100/40' 
                                  : 'border-beauty-200 bg-beauty-50 hover:border-beauty-300'
                              }`}
                            >
                              <input 
                                type="radio" 
                                name="paymentMethod" 
                                checked={shippingDetails.paymentMethod === 'va'} 
                                readOnly 
                                className="accent-beauty-600 mt-1"
                              />
                              <div>
                                <h4 className="font-display font-semibold text-stone-950 text-sm">Bank Virtual Account</h4>
                                <p className="text-stone-500 text-xs mt-1">BCA VA / Mandiri VA Transfer</p>
                                <span className="text-beauty-600 text-xs font-bold block mt-2">Simulasi Deteksi Otomatis</span>
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* HIDDEN IN SUBMIT */}
                        <button type="submit" id="hidden-form-submit" className="hidden" />

                      </form>
                    </div>

                    {/* Right Panel: Sidecard Checkout summary (4/12 cols) */}
                    <div className="lg:col-span-4">
                      <div className="bg-white rounded-2xl border border-beauty-100 p-6 sticky top-24 shadow-sm">
                        <h3 className="font-display font-bold text-stone-900 text-lg border-b border-beauty-100 pb-4 mb-4">
                          Ringkasan Pesanan
                        </h3>

                        {/* List items */}
                        <div className="max-h-60 overflow-y-auto pr-1 flex flex-col gap-4 mb-6">
                          {cart.map(item => (
                            <div key={item.product.id} className="flex justify-between items-start gap-4 text-xs">
                              <span className="text-stone-700 leading-tight flex-1">
                                {item.product.name} <strong className="font-semibold text-beauty-600">x{item.quantity}</strong>
                              </span>
                              <span className="font-semibold text-stone-900">
                                Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Calculations summary */}
                        <div className="border-t border-dashed border-beauty-100 pt-4 flex flex-col gap-3 text-xs mb-6">
                          <div className="flex justify-between text-stone-500">
                            <span>Subtotal Belanja</span>
                            <span>Rp {cartSubtotal.toLocaleString('id-ID')}</span>
                          </div>
                          <div className="flex justify-between text-stone-500">
                            <span>Promo Potongan Diskon</span>
                            <span className="text-beauty-600 font-semibold">
                              {cartDiscount > 0 ? `-Rp ${cartDiscount.toLocaleString('id-ID')}` : 'Rp 0'}
                            </span>
                          </div>
                          <div className="flex justify-between text-stone-500">
                            <span>Biaya Pengiriman</span>
                            <span>{shippingCost === 0 ? 'Gratis' : `Rp ${shippingCost.toLocaleString('id-ID')}`}</span>
                          </div>

                          <div className="border-t border-beauty-100 pt-3 flex justify-between font-display text-base font-bold text-stone-900">
                            <span>Total Tagihan</span>
                            <span className="text-beauty-600">Rp {cartGrandTotal.toLocaleString('id-ID')}</span>
                          </div>
                        </div>

                        {/* Submit orders */}
                        <button 
                          onClick={() => document.getElementById('hidden-form-submit')?.click()}
                          className="w-full bg-beauty-600 hover:bg-beauty-700 text-white font-display font-semibold py-3.5 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          Bayar Tagihan Sekarang
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ======================= TAB 2: INTERACTIVE BUSINESS OVERVIEW ======================= */}
          {activeTab === 'business' && (
            <motion.div 
              key="business"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
              
              {/* Header section */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-beauty-100 pb-8">
                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-stone-950">Dashboard Analisis Bisnis</h2>
                  <p className="text-stone-500 text-sm mt-1">Dokumentasi operasional, segmentasi target pasar, strategi promosi, dan monitoring Google Analytics.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-beauty-100 text-beauty-700 text-xs font-semibold rounded-full px-4 py-2 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-beauty-600" /> Dokumen Lengkap Disetujui
                  </span>
                </div>
              </div>

              {/* SECTION A: ANALYTICS PERFORMANCE GRAPH MOCKUP */}
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                {businessMetrics.map((bm, index) => (
                  <div key={index} className="bg-white rounded-xl border border-beauty-100 p-6 shadow-xs relative overflow-hidden group hover:border-beauty-300 transition-colors">
                    <span className="text-stone-500 text-xs font-medium leading-normal">{bm.metric}</span>
                    <div className="flex items-baseline justify-between mt-2">
                      <span className="font-display text-2xl font-bold text-stone-900">{bm.value}</span>
                      <span className="text-beauty-600 font-display text-xs font-bold bg-beauty-50 px-2 py-1 rounded-sm flex items-center gap-1">
                        <TrendingUp size={12} /> {bm.change}
                      </span>
                    </div>
                    <p className="text-stone-400 text-[11px] mt-3 leading-normal border-t border-stone-50 pt-2">{bm.description}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-12 gap-8 mb-12">
                
                {/* 1. Value Proposition & Market Segmentations (7/12 cols) */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                  
                  {/* Strategic Pitch */}
                  <div className="bg-white rounded-2xl border border-beauty-100 p-6 sm:p-8 shadow-xs">
                    <h3 className="font-display font-bold text-stone-950 text-lg flex items-center gap-2 mb-4">
                      <Lightbulb className="text-beauty-600" size={20} /> Proposisi Nilai (Value Proposition)
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed mb-4">
                      SHOPPAY-Beauty hadir sebagai solusi curated clean beauty terpercaya di Indonesia. Kami menjamin keaslian 100% dan standar uji dermatologi untuk seluruh produk skincare, kosmetik wajah, perawatan rambut, dan wewangian premium demi kulit bercahaya alami yang sehat dan beretika.
                    </p>
                    <ul className="text-stone-600 text-xs space-y-2 pl-4 list-disc">
                      <li>Bahan aktif organik alami pilihan, bebas dari paraben dan alkohol beracun.</li>
                      <li>Sertifikasi halal lengkap, terdaftar resmi BPOM, serta standar ramah lingkungan (cruelty-free).</li>
                      <li>Simulasi sandbox pembayaran transparan dengan QRIS terintegrasi countdown timer.</li>
                    </ul>
                  </div>

                  {/* Target Market Description */}
                  <div className="bg-white rounded-2xl border border-beauty-100 p-6 sm:p-8 shadow-xs">
                    <h3 className="font-display font-bold text-stone-950 text-lg flex items-center gap-2 mb-4">
                      <Target className="text-beauty-600" size={20} /> Target Market & Segmentasi Pelanggan
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-6 text-sm">
                      <div className="bg-beauty-50 p-4 rounded-xl border border-beauty-100">
                        <Users className="text-beauty-600 mb-2" size={18} />
                        <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">Demografis</h4>
                        <p className="text-stone-500 text-xs mt-1 leading-normal">Wanita & Pria usia 18-35 tahun (Gen Z & Milenial). Pendapatan menengah ke atas.</p>
                      </div>
                      <div className="bg-beauty-50 p-4 rounded-xl border border-beauty-100">
                        <MapPin className="text-beauty-600 mb-2" size={18} />
                        <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">Geografis</h4>
                        <p className="text-stone-500 text-xs mt-1 leading-normal">Masyarakat urban di kota-kota besar Indonesia (Jakarta, Surabaya, Bandung, Medan).</p>
                      </div>
                      <div className="bg-beauty-50 p-4 rounded-xl border border-beauty-100">
                        <Briefcase className="text-beauty-600 mb-2" size={18} />
                        <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">Psikografis</h4>
                        <p className="text-stone-500 text-xs mt-1 leading-normal">Konsumen peduli kesehatan kulit jangka panjang, aktif di sosmed, mengutamakan halal/ethical.</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 2. LIVE GOOGLE ANALYTICS FEED SIMULATION (5/12 cols) */}
                <div className="lg:col-span-5 bg-stone-950 rounded-2xl p-6 shadow-lg border border-stone-800 text-stone-100 flex flex-col h-full min-h-[450px]">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-300">
                        Google Analytics Live Metrics Stream
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-stone-500 bg-stone-900 px-2 py-1 rounded">
                      G-DUMMY123456
                    </span>
                  </div>

                  <p className="text-stone-400 text-[11px] leading-relaxed mb-4">
                    Pelacakan aksi langsung (real-time click tracking) yang dipicu oleh interaksi pengguna di Toko Belanja. Data-data ini direkam untuk analisis konversi transaksi:
                  </p>

                  {/* Real-time Logs List */}
                  <div className="flex-grow overflow-y-auto max-h-80 bg-stone-900/60 rounded-xl p-3 border border-stone-800/80 space-y-3 font-mono text-[10px]">
                    {analyticsLogs.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-stone-500 text-center py-12">
                        <AlertCircle size={24} className="mb-2" />
                        <span>Belum ada interaksi terekam.</span>
                        <span className="text-[9px] mt-1 text-stone-600">Lakukan klik belanja di Toko untuk melihat log masuk.</span>
                      </div>
                    ) : (
                      analyticsLogs.map((log, index) => (
                        <div key={index} className="border-b border-stone-800/50 pb-2 last:border-0 text-stone-300">
                          <span className="text-stone-500">[{log.timestamp}]</span>{' '}
                          <span className="text-beauty-400 font-bold">event: {log.eventName}</span>
                          <pre className="text-stone-400 text-[9px] mt-1 overflow-x-auto bg-stone-950/40 p-1.5 rounded">
                            {JSON.stringify(log.params, null, 2)}
                          </pre>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

              {/* SECTION B: COMPETITOR ANALYSIS & SWOT MATRIX */}
              <div className="bg-white rounded-2xl border border-beauty-100 p-6 sm:p-8 shadow-xs mb-12">
                <h3 className="font-display font-bold text-stone-950 text-lg flex items-center gap-2 mb-6">
                  <Shield className="text-beauty-600" size={20} /> Analisis SWOT Bisnis & Kompetitor
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
                  
                  <div className="border border-beauty-100 rounded-xl p-5 bg-beauty-50/50">
                    <h4 className="font-display font-bold text-stone-900 text-sm mb-2 text-beauty-700 flex items-center gap-1.5">
                      💪 Strengths (Kekuatan)
                    </h4>
                    <p className="text-stone-600 leading-relaxed">
                      Kurasi produk kosmetik organik 100% halal/BPOM yang ketat. Desain e-commerce estetis premium. Dukungan sistem checkout dengan gateway sandbox responsif yang meminimalkan cart abandonment.
                    </p>
                  </div>

                  <div className="border border-beauty-100 rounded-xl p-5 bg-beauty-50/50">
                    <h4 className="font-display font-bold text-stone-900 text-sm mb-2 text-amber-700 flex items-center gap-1.5">
                      ⚠️ Weaknesses (Kelemahan)
                    </h4>
                    <p className="text-stone-600 leading-relaxed">
                      Sebagai brand e-commerce spesifik baru, jangkauan awareness awal konsumen masih terbatas dibanding raksasa Sociolla yang memiliki puluhan gerai retail fisik di mal besar Indonesia.
                    </p>
                  </div>

                  <div className="border border-beauty-100 rounded-xl p-5 bg-beauty-50/50">
                    <h4 className="font-display font-bold text-stone-900 text-sm mb-2 text-emerald-700 flex items-center gap-1.5">
                      🚀 Opportunities (Peluang)
                    </h4>
                    <p className="text-stone-600 leading-relaxed">
                      Meningkatnya kesadaran pasar Indonesia (Gen Z & Milenial) terhadap produk skincare berbahan organik alami. Kerjasama distribusi eksklusif pertama dengan produsen kecantikan lokal pendatang baru.
                    </p>
                  </div>

                  <div className="border border-beauty-100 rounded-xl p-5 bg-beauty-50/50">
                    <h4 className="font-display font-bold text-stone-900 text-sm mb-2 text-rose-700 flex items-center gap-1.5">
                      🔥 Threats (Ancaman)
                    </h4>
                    <p className="text-stone-600 leading-relaxed">
                      Perang harga diskon gila-gilaan dari distributor tidak resmi (grey market) di marketplace umum seperti Shopee dan Tokopedia yang dapat merusak harga pasar kosmetik berlisensi BPOM.
                    </p>
                  </div>

                </div>
              </div>

            </motion.div>
          )}

          {/* ======================= TAB 3: GITHUB PAGES PUBLISHING & CODE EXPORT ======================= */}
          {activeTab === 'github' && (
            <motion.div 
              key="github"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
              
              <div className="border-b border-beauty-100 pb-8 mb-12">
                <h2 className="font-serif text-3xl sm:text-4xl text-stone-950">Pusat Ekspor & Panduan GitHub</h2>
                <p className="text-stone-500 text-sm mt-1">
                  Semua file proyek SHOPPAY-Beauty telah disusun rapi ke dalam folder terpisah (HTML, CSS, dan JS) dan siap digunakan untuk penyerahan tugas Anda.
                </p>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 mb-12">
                
                {/* Left Panel: Step-by-Step Tutorial (6/12 cols) */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                  <div className="bg-white rounded-2xl border border-beauty-100 p-6 sm:p-8 shadow-xs">
                    <h3 className="font-display font-bold text-stone-950 text-lg flex items-center gap-2 mb-6">
                      <Github className="text-beauty-600" size={20} /> Cara Unggah Proyek ke GitHub Pages
                    </h3>

                    {/* Timeline guide */}
                    <div className="flex flex-col gap-6 relative pl-4 border-l-2 border-beauty-100">
                      
                      <div className="relative">
                        <span className="absolute -left-7 top-0 bg-beauty-600 text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">1</span>
                        <h4 className="font-display font-semibold text-stone-900 text-sm">Buat Repository Baru di GitHub</h4>
                        <p className="text-stone-500 text-xs mt-1 leading-normal">
                          Login ke <a href="https://github.com" target="_blank" className="text-beauty-600 underline">github.com</a>, buat repositori baru bernama <strong>shoppay-beauty</strong>, set sebagai <strong>Public</strong>, dan jangan centang file inisialisasi awal.
                        </p>
                      </div>

                      <div className="relative">
                        <span className="absolute -left-7 top-0 bg-beauty-600 text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">2</span>
                        <h4 className="font-display font-semibold text-stone-900 text-sm">Gunakan Folder Vanilla di Laptop</h4>
                        <p className="text-stone-500 text-xs mt-1 leading-normal">
                          Ekspor berkas ZIP dari menu pengaturan Workspace ini. Di dalam ZIP terdapat folder <strong>/vanilla</strong> berisi <code>index.html</code>, folder <code>css/style.css</code>, dan <code>js/app.js</code> terpisah dan rapi.
                        </p>
                      </div>

                      <div className="relative">
                        <span className="absolute -left-7 top-0 bg-beauty-600 text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">3</span>
                        <h4 className="font-display font-semibold text-stone-900 text-sm">Inisialisasi Git Lokal & Push</h4>
                        <p className="text-stone-500 text-xs mt-1 leading-normal">
                          Buka Git Bash / Terminal di komputer, masuk ke folder vanilla Anda, lalu ketik:
                        </p>
                        <pre className="bg-stone-900 text-stone-300 text-[10px] p-2.5 rounded-lg mt-2 overflow-x-auto font-mono">
                          git init<br />
                          git add .<br />
                          git commit -m "feat: first release"<br />
                          git branch -M main<br />
                          git remote add origin [URL_GITHUB_ANDA]<br />
                          git push -u origin main
                        </pre>
                      </div>

                      <div className="relative">
                        <span className="absolute -left-7 top-0 bg-beauty-600 text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">4</span>
                        <h4 className="font-display font-semibold text-stone-900 text-sm">Aktifkan Fitur Deploy GitHub Pages</h4>
                        <p className="text-stone-500 text-xs mt-1 leading-normal">
                          Masuk ke menu <strong>Settings &rarr; Pages</strong> di repo GitHub Anda. Pada bagian <em>Branch</em>, pilih <strong>main</strong> lalu simpan. Dalam 1 menit, link website online Anda akan aktif!
                        </p>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Right Panel: Interactive Code File Viewer (6/12 cols) */}
                <div className="lg:col-span-6 bg-white rounded-2xl border border-beauty-100 p-6 sm:p-8 shadow-xs flex flex-col min-h-[480px]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-beauty-100 pb-4 mb-6">
                    <h3 className="font-display font-bold text-stone-950 text-sm flex items-center gap-1.5">
                      <FileCode className="text-beauty-600" size={18} /> File Viewer Kode Vanilla
                    </h3>
                    
                    {/* File selector pills */}
                    <div className="flex flex-wrap gap-1 bg-beauty-50 p-1 rounded-lg border border-beauty-100">
                      {(['html', 'css', 'js', 'readme'] as const).map(f => (
                        <button 
                          key={f}
                          onClick={() => setSelectedCodeFile(f)}
                          className={`px-2.5 py-1.5 rounded-md font-mono text-[10px] font-bold transition-all uppercase cursor-pointer ${
                            selectedCodeFile === f 
                              ? 'bg-beauty-600 text-white shadow-xs' 
                              : 'text-stone-500 hover:text-stone-800'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Code desc and copy action */}
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <p className="text-stone-500 text-xs leading-relaxed max-w-sm">
                      {getCodeContent()?.desc}
                    </p>
                    <button 
                      onClick={copyCodeToClipboard}
                      className="bg-beauty-50 hover:bg-beauty-100 border border-beauty-200 text-stone-700 font-display text-xs font-semibold px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedFile === selectedCodeFile ? (
                        <>
                          <Check size={14} className="text-green-600" /> Tersalin!
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Salin Kode
                        </>
                      )}
                    </button>
                  </div>

                  {/* Code Snippet Box */}
                  <div className="bg-stone-900 rounded-xl p-4 flex-grow overflow-auto font-mono text-[10px] text-stone-300 max-h-80 border border-stone-800">
                    <pre className="leading-relaxed">{getCodeContent()?.code}</pre>
                  </div>

                  {/* Highlight ZIP guide */}
                  <div className="mt-4 p-4 rounded-xl bg-beauty-100/40 border border-beauty-200 flex items-start gap-3">
                    <Download size={18} className="text-beauty-600 mt-0.5 shrink-0" />
                    <p className="text-stone-600 text-xs leading-normal">
                      <strong>Siap Download:</strong> Seluruh berkas di atas secara utuh ter-assembly di folder <code>/vanilla</code> dalam workspace Anda. Unduh ZIP melalui menu ekspor AI Studio Anda kapan saja.
                    </p>
                  </div>

                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER UTAMA REKAYASA */}
      <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-xl font-bold text-white">
              SHOPPAY<span className="text-beauty-400 font-light">-Beauty</span>
            </h3>
            <p className="text-stone-500 text-xs leading-relaxed">
              Platform e-commerce kosmetik premium terpercaya. Kami menghadirkan produk perawatan wajah organik berkualitas tinggi, halal, BPOM, dan 100% aman untuk memancarkan pesona alami Anda.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">Akses Belanja</h4>
            <ul className="text-stone-500 text-xs space-y-2.5">
              <li><button onClick={() => { setActiveTab('store'); setSelectedCategory('Skincare'); }} className="hover:text-beauty-400 transition-colors">Skincare Alami</button></li>
              <li><button onClick={() => { setActiveTab('store'); setSelectedCategory('Makeup'); }} className="hover:text-beauty-400 transition-colors">Makeup Riasan</button></li>
              <li><button onClick={() => { setActiveTab('store'); setSelectedCategory('Haircare'); }} className="hover:text-beauty-400 transition-colors">Haircare Rambut</button></li>
              <li><button onClick={() => { setActiveTab('store'); setSelectedCategory('Fragrance'); }} className="hover:text-beauty-400 transition-colors">Fragrance Parfum</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">Informasi Dokumen</h4>
            <ul className="text-stone-500 text-xs space-y-2.5">
              <li><button onClick={() => setActiveTab('business')} className="hover:text-beauty-400 transition-colors">Analisis SWOT</button></li>
              <li><button onClick={() => setActiveTab('business')} className="hover:text-beauty-400 transition-colors">Segmentasi Pasar</button></li>
              <li><button onClick={() => setActiveTab('github')} className="hover:text-beauty-400 transition-colors">Tutorial Git Push</button></li>
              <li><button onClick={() => setActiveTab('github')} className="hover:text-beauty-400 transition-colors">Download Vanilla ZIP</button></li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider">Langganan Newsletter</h4>
            <p className="text-stone-500 text-xs leading-relaxed">Daftarkan email Anda untuk info diskon promosi 15% serta pembaruan produk kecantikan premium.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Alamat email Anda..." 
                className="bg-stone-900 border border-stone-800 text-white rounded-lg p-2.5 text-xs flex-grow outline-hidden focus:border-beauty-500 transition-all"
              />
              <button 
                onClick={() => { alert('Terima kasih! Email Anda telah terdaftar dalam buletin untuk promo diskon 15%.'); logGAEvent('lead_generation', { source: 'footer_newsletter' }); }}
                className="bg-beauty-600 hover:bg-beauty-700 text-white px-4 py-2 rounded-lg font-display text-xs font-semibold transition-all cursor-pointer"
              >
                Kirim
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-600">
          <p>&copy; 2026 SHOPPAY-Beauty E-Commerce. All rights reserved. Crafted for Sopi Maulidia.</p>
          <div className="flex gap-3 text-[10px] bg-stone-900 px-3 py-1.5 rounded-lg border border-stone-800 text-stone-500">
            <span>QRIS PAY</span>
            <span>BCA SANDBOX</span>
            <span>MANDIRI VA</span>
            <span>MIDTRANS SIMULATOR</span>
          </div>
        </div>
      </footer>

      {/* ======================= SHOPPING CART SLIDE-OVER DRAWER ======================= */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-stone-950/40 backdrop-blur-xs z-50 cursor-pointer"
            />

            {/* Slide Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-beauty-100"
            >
              <div className="p-6 border-b border-beauty-100 flex items-center justify-between">
                <h3 className="font-display font-bold text-stone-900 text-lg flex items-center gap-2">
                  <ShoppingCart size={20} className="text-beauty-600" /> Keranjang Belanja Anda
                </h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full hover:bg-beauty-50 text-stone-400 hover:text-stone-700 cursor-pointer transition-all"
                  aria-label="Tutup Keranjang"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Cart Body */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-stone-500 flex flex-col items-center justify-center gap-3">
                    <ShoppingCart size={40} className="text-stone-300" />
                    <p className="text-sm font-medium">Keranjang belanja Anda kosong.</p>
                    <p className="text-xs text-stone-400">Pilih beberapa produk kosmetik premium dari katalog.</p>
                    <button 
                      onClick={() => { setIsCartOpen(false); setActiveTab('store'); }} 
                      className="mt-2 bg-beauty-100 hover:bg-beauty-200 text-beauty-700 font-display font-semibold text-xs px-4 py-2 rounded-lg transition-all"
                    >
                      Mulai Belanja
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.product.id} className="flex gap-4 border-b border-stone-50 pb-4 last:border-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-16 h-16 rounded-lg object-cover bg-stone-50"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-grow flex flex-col">
                          <h4 className="font-display font-semibold text-stone-900 text-sm line-clamp-1">{item.product.name}</h4>
                          <span className="text-beauty-600 font-display text-xs font-bold mt-1">
                            Rp {item.product.price.toLocaleString('id-ID')}
                          </span>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-beauty-200 rounded-sm overflow-hidden bg-beauty-50">
                              <button 
                                onClick={() => handleUpdateQuantity(item.product.id, -1)}
                                className="px-2 py-1 text-xs hover:bg-beauty-100 cursor-pointer"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="px-3 font-mono text-xs font-bold text-stone-800">{item.quantity}</span>
                              <button 
                                onClick={() => handleUpdateQuantity(item.product.id, 1)}
                                className="px-2 py-1 text-xs hover:bg-beauty-100 cursor-pointer"
                              >
                                <Plus size={10} />
                              </button>
                            </div>

                            <button 
                              onClick={() => handleRemoveFromCart(item.product.id)}
                              className="text-stone-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                              aria-label="Hapus Item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-beauty-100 bg-beauty-50/50 space-y-4">
                  <div className="space-y-2 text-xs text-stone-600">
                    <div className="flex justify-between">
                      <span>Subtotal Belanja</span>
                      <span className="font-semibold text-stone-800">Rp {cartSubtotal.toLocaleString('id-ID')}</span>
                    </div>
                    {cartDiscount > 0 && (
                      <div className="flex justify-between text-beauty-600 font-semibold">
                        <span>Diskon Belanja (Promo 10%)</span>
                        <span>-Rp {cartDiscount.toLocaleString('id-ID')}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-beauty-100 pt-3 text-sm font-bold text-stone-950">
                      <span>Total Estimasi</span>
                      <span className="text-beauty-600 text-base">Rp {(cartSubtotal - cartDiscount).toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => { setIsCartOpen(false); setIsCheckoutMode(true); logGAEvent('begin_checkout', { items_count: cart.length }); }}
                    className="w-full bg-beauty-600 hover:bg-beauty-700 text-white font-display font-semibold py-3.5 rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Lanjutkan Ke Checkout
                  </button>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ======================= PRODUCT DETAIL MODAL DIALOG ======================= */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs z-50 cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-x-4 top-10 bottom-10 sm:inset-y-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full max-w-3xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col md:grid md:grid-cols-12 max-h-[90vh] md:max-h-[80vh]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full border border-beauty-200 text-stone-500 hover:text-stone-900 shadow-sm hover:rotate-90 transition-all z-20 cursor-pointer"
                aria-label="Tutup Dialog"
              >
                <X size={18} />
              </button>

              {/* Gallery column */}
              <div className="md:col-span-5 bg-beauty-50 flex items-center justify-center h-60 md:h-full overflow-hidden relative border-r border-beauty-50">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Detail Info column */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col overflow-y-auto">
                <span className="font-display font-bold text-xs text-beauty-600 uppercase tracking-widest mb-1">
                  {selectedProduct.category}
                </span>
                <h2 className="font-serif text-2xl text-stone-900 leading-tight mb-2">
                  {selectedProduct.name}
                </h2>

                <div className="flex items-center gap-1.5 mb-4">
                  <div className="flex text-amber-400 gap-0.5"><Star size={13} fill="currentColor" /></div>
                  <span className="text-stone-800 text-xs font-bold">{selectedProduct.rating.toFixed(1)}</span>
                  <span className="text-stone-400 text-xs">({selectedProduct.reviewsCount} ulasan pembeli)</span>
                </div>

                <div className="mb-4 text-stone-900 font-display text-xl font-extrabold">
                  Rp {selectedProduct.price.toLocaleString('id-ID')}
                </div>

                <p className="text-stone-500 text-xs leading-relaxed mb-6">
                  {selectedProduct.description}
                </p>

                {/* Sub-Tabs Selector */}
                <div className="flex border-b border-beauty-100 gap-2 mb-4 text-xs font-semibold">
                  <button 
                    onClick={() => setModalTab('benefits')}
                    className={`pb-2.5 px-1 border-b-2 transition-all cursor-pointer ${modalTab === 'benefits' ? 'border-beauty-500 text-beauty-700' : 'border-transparent text-stone-400'}`}
                  >
                    Manfaat Utama
                  </button>
                  <button 
                    onClick={() => setModalTab('ingredients')}
                    className={`pb-2.5 px-1 border-b-2 transition-all cursor-pointer ${modalTab === 'ingredients' ? 'border-beauty-500 text-beauty-700' : 'border-transparent text-stone-400'}`}
                  >
                    Komposisi Lengkap
                  </button>
                  <button 
                    onClick={() => setModalTab('howToUse')}
                    className={`pb-2.5 px-1 border-b-2 transition-all cursor-pointer ${modalTab === 'howToUse' ? 'border-beauty-500 text-beauty-700' : 'border-transparent text-stone-400'}`}
                  >
                    Cara Penggunaan
                  </button>
                </div>

                {/* Tab content panel */}
                <div className="flex-grow text-xs leading-relaxed text-stone-600 mb-6 bg-beauty-50/50 p-4 rounded-xl border border-beauty-50">
                  {modalTab === 'benefits' && (
                    <ul className="list-disc pl-4 space-y-2">
                      {selectedProduct.benefits.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {modalTab === 'ingredients' && (
                    <p>{selectedProduct.ingredients}</p>
                  )}
                  {modalTab === 'howToUse' && (
                    <p>{selectedProduct.howToUse}</p>
                  )}
                </div>

                {/* Footer Add button */}
                <div className="mt-auto border-t border-beauty-50 pt-4 flex gap-4">
                  <button 
                    onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); }}
                    className="flex-grow bg-beauty-600 hover:bg-beauty-700 text-white font-display font-semibold py-3 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingCart size={16} /> + Masukkan Ke Keranjang
                  </button>
                </div>

              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ======================= SANDBOX SIMULATED PAYMENT DIALOG MODAL ======================= */}
      <AnimatePresence>
        {paymentGatewayOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs z-50"
            />

            {/* Dialog Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 overflow-hidden p-6 sm:p-8 text-center"
            >
              <span className="font-display font-bold text-xs uppercase tracking-widest text-beauty-600 block mb-1">
                SHOPPAY Secure Payment Gateway
              </span>
              <span className="bg-beauty-100 text-beauty-700 font-mono text-[9px] font-bold uppercase rounded-full px-3 py-1 inline-block mb-4">
                Sandbox Mode Simulator
              </span>

              {paymentStatus === 'pending' ? (
                <div className="animate-fade-in">
                  
                  {/* Countdown Timer */}
                  <div className="text-red-600 font-mono text-xs font-bold flex items-center justify-center gap-1.5 mb-2">
                    <Clock size={14} /> Selesaikan pembayaran dalam: <span className="bg-red-50 px-2 py-0.5 rounded-sm">{paymentTimeLeft}</span>
                  </div>

                  <div className="font-display text-3xl font-extrabold text-stone-950 mb-4">
                    Rp {cartGrandTotal.toLocaleString('id-ID')}
                  </div>

                  <p className="text-stone-500 text-xs leading-relaxed mb-6">
                    Menunggu verifikasi transfer masuk dari sistem simulasi otomatis.
                  </p>

                  {shippingDetails.paymentMethod === 'qris' ? (
                    <div className="bg-beauty-50 border border-beauty-200 border-dashed rounded-xl p-6 flex flex-col items-center justify-center relative">
                      {/* Simulated QR Code SVG for extreme clean sharpness */}
                      <svg width="150" height="150" viewBox="0 0 29 29" style={{ imageRendering: 'pixelated' }}>
                        <path d="M0 0h7v7H0zm1 1v5h5V1zm21-1h7v7h-7zm1 1v5h5V1zM0 22h7v7H0zm1 1v5h5v-5zm11-13h2v2h-2zm3-3h2v2h-2zm-1 5h2v2h-2zm-3 2h2v2h-2zm1-5h2v2h-2zm5-1h2v2h-2zm3 3h2v2h-2zm-3 2h2v2h-2zm3-4h2v2h-2zm-1 5h2v2h-2zm-5 4h2v2h-2zm1 3h2v2h-2zm3-1h2v2h-2zm-3 3h2v2h-2zm1-8h2v2h-2zm5-1h2v2h-2zm3 3h2v2h-2zm-3 2h2v2h-2zm3-4h2v2h-2zm-1 5h2v2h-2zm-11 5h2v2h-2zm1 3h2v2h-2zm3-1h2v2h-2zm-3 3h2v2h-2zm1-8h2v2h-2zm11 11h2v2h-2z" fill="#1c0f0a"/>
                      </svg>
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 font-display font-extrabold text-[10px] shadow-md border border-stone-250 rounded">
                        QRIS
                      </span>
                      <span className="text-stone-400 text-[9px] mt-4 font-mono">Pindai kode QRIS dinamis di atas</span>
                    </div>
                  ) : (
                    <div className="bg-beauty-50 border border-beauty-100 rounded-xl p-5 text-left space-y-3">
                      <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Nomor Mandiri VA Sandbox</div>
                      <div className="font-mono text-lg font-bold text-beauty-700 tracking-wider">
                        8831 9823 4110 3290
                      </div>
                      <div className="text-[10px] text-stone-500">
                        Atas Nama: <strong>SHOPPAY-Beauty Sandbox</strong>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 justify-center mt-6 text-stone-400 text-[10px]">
                    <span className="w-2 h-2 rounded-full bg-beauty-500 animate-pulse"></span>
                    <span>Mensimulasikan verifikasi transfer masuk dalam 5 detik...</span>
                  </div>

                  <button 
                    onClick={() => setPaymentGatewayOpen(false)}
                    className="w-full mt-6 text-stone-500 hover:text-stone-800 font-display text-xs font-semibold py-2.5 rounded-lg border border-stone-200 transition-all cursor-pointer"
                  >
                    Batal / Kembali Ke Checkout
                  </button>

                </div>
              ) : (
                
                // PAYMENT SUCCESS VIEW RECEIPT
                <div className="animate-fade-in py-4 flex flex-col items-center">
                  
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                    <CheckCircle2 size={36} />
                  </div>

                  <h3 className="font-serif text-2xl text-stone-900 mb-1">Pembayaran Berhasil!</h3>
                  <p className="text-stone-500 text-xs mb-6">Pesanan Anda telah diterima dan diteruskan ke log data analytics.</p>

                  <div className="w-full bg-beauty-50 rounded-xl p-4 text-left text-xs space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Nomor Transaksi:</span>
                      <strong className="font-mono text-stone-900">{simulatedOrderId}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Penerima Paket:</span>
                      <strong className="text-stone-900">{shippingDetails.fullName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Metode Pengiriman:</span>
                      <strong className="text-stone-900 capitalize">{shippingDetails.shippingMethod} Delivery</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Email Kontak:</span>
                      <strong className="text-stone-900">{shippingDetails.email}</strong>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-beauty-100">
                      <span className="text-stone-500 font-semibold">Total Terbayar:</span>
                      <strong className="text-beauty-600 font-bold">Rp {cartGrandTotal.toLocaleString('id-ID')}</strong>
                    </div>
                  </div>

                  <button 
                    onClick={handleFinalizeCheckout}
                    className="w-full bg-beauty-600 hover:bg-beauty-700 text-white font-display font-semibold py-3 rounded-lg transition-all shadow-md cursor-pointer"
                  >
                    Selesai & Belanja Lagi
                  </button>

                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
