'use client';

// app/page.tsx
// LaRuche.ai - Plateforme SaaS Complète

import React, { useState, useEffect } from 'react';
import {
  Search, Sparkles, DollarSign, Package, Lock, Unlock, Copy, Check,
  X, Star, ShoppingCart, Truck, Target, ExternalLink, TrendingUp, Crown,
  MessageSquare, FileText, Camera, Loader2, AlertCircle, Home, BarChart3,
  Settings, HelpCircle, Menu, ChevronRight, Zap, Activity, Download
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

type PlanType = 'STARTER' | 'PRO' | 'BUSINESS' | 'ELITE';
type PageType = 'home' | 'trends' | 'settings';

interface UserSubscription {
  plan: PlanType;
  credits: number;
  unlockedProducts: Set<string>;
}

interface Product {
  id: string;
  title: string;
  image: string;
  price: string;
  cost_price: number;
  shipping_cost: number;
  suggested_price: number;
  total_cost: number;
  net_profit: number;
  profit_margin: number;
  saturation_status: 'niche' | 'hot' | 'saturated' | 'emerging';
  saturation_score: number;
  shipping_optimized: boolean;
  rating: number;
  sales: number;
  link: string;
}

interface MarketingCopy {
  tiktokHooks: string[];
  aidaScript: string;
  objections: string[];
}

interface TrendData {
  keyword: string;
  growth: number;
  searchVolume: string;
  competition: 'Faible' | 'Moyenne' | 'Élevée';
  trend: number[];
}

// ============================================================================
// DATA
// ============================================================================

const PLANS = {
  STARTER: { name: 'Starter', price: '0€', credits: 3, color: 'slate' },
  PRO: { name: 'Pro', price: '29€/mois', credits: 50, color: 'blue' },
  BUSINESS: { name: 'Business', price: '59€/mois', credits: 200, color: 'purple' },
  ELITE: { name: 'Elite', price: '99€/mois', credits: Infinity, color: 'amber' }
};

const MOCK_TRENDS: TrendData[] = [
  { 
    keyword: 'Refroidisseur PC portable', 
    growth: 245, 
    searchVolume: '12K/mois', 
    competition: 'Faible',
    trend: [20, 35, 45, 60, 85, 120, 180, 245]
  },
  { 
    keyword: 'Organisateur de câbles', 
    growth: 189, 
    searchVolume: '8.5K/mois', 
    competition: 'Faible',
    trend: [15, 28, 42, 65, 95, 140, 189]
  },
  { 
    keyword: 'Lampe LED gaming', 
    growth: 156, 
    searchVolume: '15K/mois', 
    competition: 'Moyenne',
    trend: [30, 45, 60, 80, 105, 130, 156]
  }
];

// ============================================================================
// COMPONENTS
// ============================================================================

const Sidebar = ({ 
  activePage, 
  onPageChange,
  subscription 
}: { 
  activePage: PageType;
  onPageChange: (page: PageType) => void;
  subscription: UserSubscription;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { id: 'home' as PageType, icon: Home, label: 'Sourcing', requiredPlan: 'STARTER' as PlanType },
    { id: 'trends' as PageType, icon: TrendingUp, label: 'Trend Scout', requiredPlan: 'BUSINESS' as PlanType },
    { id: 'settings' as PageType, icon: Settings, label: 'Paramètres', requiredPlan: 'STARTER' as PlanType }
  ];

  const hasAccess = (requiredPlan: PlanType) => {
    const planOrder = ['STARTER', 'PRO', 'BUSINESS', 'ELITE'];
    return planOrder.indexOf(subscription.plan) >= planOrder.indexOf(requiredPlan);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/10 border border-white/20 rounded-lg"
      >
        <Menu className="w-5 h-5 text-white" strokeWidth={2} />
      </button>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen bg-black/95 backdrop-blur-xl border-r border-white/10 transition-all duration-300 z-40 ${isOpen ? 'w-64' : 'w-0 lg:w-20'}`}>
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/30 blur-xl rounded-full" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" strokeWidth={2.5} />
              </div>
            </div>
            {isOpen && (
              <div>
                <h1 className="text-lg font-bold text-white">LaRuche<span className="text-amber-400">.ai</span></h1>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activePage === item.id;
              const locked = !hasAccess(item.requiredPlan);

              return (
                <button
                  key={item.id}
                  onClick={() => !locked && onPageChange(item.id)}
                  disabled={locked}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    active
                      ? 'bg-amber-500/20 border border-amber-500/30 text-amber-400'
                      : locked
                      ? 'text-white/30 cursor-not-allowed'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={2} />
                  {isOpen && (
                    <>
                      <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                      {locked && <Lock className="w-3 h-3" strokeWidth={2} />}
                    </>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Help */}
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all">
            <HelpCircle className="w-5 h-5" strokeWidth={2} />
            {isOpen && <span className="text-sm">Aide</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

const Header = ({ subscription }: { subscription: UserSubscription }) => {
  const plan = PLANS[subscription.plan];
  const isUnlimited = subscription.plan === 'ELITE';

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Sourcing Intelligence</h2>
        <p className="text-sm text-white/50">Découvrez les produits gagnants avant tout le monde</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Credits */}
        {!isUnlimited && (
          <div className="flex items-center gap-3 px-4 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl">
            <Sparkles className="w-5 h-5 text-amber-400" strokeWidth={2.5} />
            <div>
              <div className="text-[10px] text-amber-400/70 uppercase tracking-wider">Alvéoles</div>
              <div className="text-lg font-bold text-amber-400">{subscription.credits}</div>
            </div>
          </div>
        )}

        {/* Plan Badge */}
        <div className={`px-4 py-2.5 rounded-xl border ${
          subscription.plan === 'ELITE'
            ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-black border-amber-500/50'
            : `bg-${plan.color}-500/10 text-${plan.color}-400 border-${plan.color}-500/30`
        }`}>
          <div className="flex items-center gap-2">
            {subscription.plan === 'ELITE' && <Crown className="w-4 h-4" strokeWidth={2.5} />}
            <div>
              <div className="text-[10px] uppercase tracking-wider opacity-70">Plan</div>
              <div className="text-sm font-bold">{plan.name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MarketingPanel = ({ 
  product, 
  isOpen, 
  onClose 
}: { 
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [marketing, setMarketing] = useState<MarketingCopy | null>(null);

  useEffect(() => {
    if (product && isOpen) {
      const productName = product.title.split(' ').slice(0, 4).join(' ');
      const price = product.cost_price.toFixed(2);
      
      setMarketing({
        tiktokHooks: [
          `🛑 Arrête de payer ${(product.cost_price * 4).toFixed(0)}€ pour ${productName}...`,
          `💰 Le secret des dropshippers : ${productName} pour ${price}€ au lieu de ${(product.cost_price * 4).toFixed(0)}€`,
          `⚠️ Cette astuce pour ${productName} va choquer tout le monde...`
        ],
        aidaScript: `🎯 SCRIPT AIDA\n\n[ATTENTION]\n"${productName}" - Le produit qui cartonne sur TikTok\n\n[INTÉRÊT]\n✅ Qualité premium\n✅ ${product.sales}+ ventes\n✅ Note ${product.rating}/5\n✅ Livraison express\n\n[DÉSIR]\n💬 "Reçu en 3 jours, qualité incroyable !"\n- Client vérifié ⭐⭐⭐⭐⭐\n\n[ACTION]\n🔥 Stock limité\n👉 Commandez maintenant\n🎁 Livraison OFFERTE`,
        objections: [
          'La qualité est-elle bonne ? → Oui, ${product.sales}+ clients satisfaits',
          'Combien de temps la livraison ? → 3-7 jours en express',
          'Puis-je être remboursé ? → Oui, garantie satisfait ou remboursé 30 jours'
        ]
      });
    }
  }, [product, isOpen]);

  if (!isOpen || !product || !marketing) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border-l border-white/10 h-screen overflow-y-auto animate-slide-in">
        <div className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 p-6 z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Marketing Toolkit IA</h2>
                <p className="text-xs text-white/50">Généré par Intelligence Artificielle</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg">
              <X className="w-5 h-5 text-white/50" strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* TikTok Hooks */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <Camera className="w-5 h-5 text-white/70" strokeWidth={2} />
              <h3 className="font-bold text-white">3 Hooks TikTok Viraux</h3>
            </div>
            <div className="space-y-3">
              {marketing.tiktokHooks.map((hook, i) => (
                <div key={i} className="p-3 bg-black/30 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-white/40">Hook #{i + 1}</span>
                    <button
                      onClick={() => handleCopy(hook, `hook-${i}`)}
                      className="text-xs text-amber-400 hover:text-amber-300"
                    >
                      {copied === `hook-${i}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <p className="text-sm text-white/90">{hook}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AIDA Script */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-white/70" strokeWidth={2} />
                <h3 className="font-bold text-white">Script AIDA</h3>
              </div>
              <button
                onClick={() => handleCopy(marketing.aidaScript, 'aida')}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs"
              >
                {copied === 'aida' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <pre className="text-xs text-white/70 whitespace-pre-wrap bg-black/30 p-4 rounded-xl">
              {marketing.aidaScript}
            </pre>
          </div>

          {/* Objections */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-white/70" strokeWidth={2} />
              <h3 className="font-bold text-white">Objections Traitées</h3>
            </div>
            <div className="space-y-2">
              {marketing.objections.map((obj, i) => (
                <div key={i} className="p-3 bg-black/30 rounded-xl text-xs text-white/70">
                  {obj}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

const ProductCard = ({ 
  product, 
  subscription,
  onUnlock,
  onOpenMarketing 
}: { 
  product: Product;
  subscription: UserSubscription;
  onUnlock: (id: string) => void;
  onOpenMarketing: (product: Product) => void;
}) => {
  const isUnlocked = subscription.unlockedProducts.has(product.id);
  const canUnlock = subscription.credits > 0 || subscription.plan === 'ELITE';
  const hasProFeatures = ['PRO', 'BUSINESS', 'ELITE'].includes(subscription.plan);
  const hasMarketing = subscription.plan === 'ELITE';

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all">
      <div className="relative aspect-square bg-black/20">
        <img 
          src={product.image} 
          alt={product.title}
          className={`w-full h-full object-cover transition-all ${isUnlocked ? '' : 'blur-sm grayscale'}`}
        />
        {!isUnlocked && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Lock className="w-12 h-12 text-amber-400" strokeWidth={2} />
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <h3 className={`text-sm font-medium text-white line-clamp-2 ${!isUnlocked && 'blur-sm'}`}>
          {product.title}
        </h3>

        {hasProFeatures && (
          <div className="p-3 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" strokeWidth={2.5} />
              <span className="text-[10px] font-bold text-amber-400 uppercase">Profit</span>
            </div>
            <div className="text-xl font-bold text-amber-400">€{product.net_profit.toFixed(2)}</div>
            <div className="text-[10px] text-amber-400/70">{product.profit_margin.toFixed(0)}% marge</div>
          </div>
        )}

        {!isUnlocked ? (
          <button
            onClick={() => canUnlock && onUnlock(product.id)}
            disabled={!canUnlock}
            className={`w-full h-10 flex items-center justify-center gap-2 rounded-xl font-semibold text-sm ${
              canUnlock
                ? 'bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black'
                : 'bg-white/5 text-white/30 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-4 h-4" strokeWidth={2.5} />
            Butiner (1 Crédit)
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 flex items-center justify-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-medium"
            >
              <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
              Lien Source
            </a>
            
            {hasMarketing ? (
              <button
                onClick={() => onOpenMarketing(product)}
                className="h-10 flex items-center justify-center gap-2 bg-purple-400/20 border border-purple-500/30 text-purple-400 rounded-xl text-xs font-medium"
              >
                <Zap className="w-3.5 h-3.5" strokeWidth={2} />
                Marketing IA
              </button>
            ) : (
              <button disabled className="h-10 flex items-center justify-center gap-2 bg-white/5 text-white/30 rounded-xl text-xs">
                <Lock className="w-3 h-3" /> ELITE
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const TrendScout = ({ onSearch }: { onSearch: (keyword: string) => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Trend Scout</h2>
          <p className="text-sm text-white/50">Mots-clés en explosion sur Google</p>
        </div>
        <div className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <span className="text-xs font-bold text-purple-400 uppercase">BUSINESS+</span>
        </div>
      </div>

      <div className="grid gap-4">
        {MOCK_TRENDS.map((trend, i) => (
          <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">{trend.keyword}</h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" strokeWidth={2} />
                    <span className="text-emerald-400 font-bold">+{trend.growth}%</span>
                  </div>
                  <div className="text-white/50">{trend.searchVolume}</div>
                  <div className={`px-2 py-0.5 rounded text-xs ${
                    trend.competition === 'Faible' ? 'bg-emerald-500/10 text-emerald-400' :
                    trend.competition === 'Moyenne' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-rose-500/10 text-rose-400'
                  }`}>
                    {trend.competition}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => onSearch(trend.keyword)}
                className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black rounded-xl font-semibold text-sm flex items-center gap-2"
              >
                <Search className="w-4 h-4" strokeWidth={2.5} />
                Sourcer
              </button>
            </div>

            {/* Mini Graph */}
            <div className="h-16 flex items-end gap-1">
              {trend.trend.map((value, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t opacity-70 hover:opacity-100 transition-opacity"
                  style={{ height: `${(value / Math.max(...trend.trend)) * 100}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================

export default function Page() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showMarketing, setShowMarketing] = useState(false);
  
  const [subscription, setSubscription] = useState<UserSubscription>({
    plan: 'STARTER',
    credits: 3,
    unlockedProducts: new Set()
  });

  const handleSearch = async (term?: string) => {
    const query = term || searchTerm;
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setProducts([]);
    setCurrentPage('home');

    try {
      const response = await fetch(
        `https://laruche-backend.vercel.app/api/sourcing?keywords=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      
      if (data.success && data.products) {
        setProducts(data.products);
        setSearchTerm(query);
      } else {
        setError('Aucun produit trouvé');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlock = (productId: string) => {
    if (subscription.plan === 'ELITE') {
      setSubscription(prev => ({
        ...prev,
        unlockedProducts: new Set([...prev.unlockedProducts, productId])
      }));
    } else if (subscription.credits > 0) {
      setSubscription(prev => ({
        ...prev,
        credits: prev.credits - 1,
        unlockedProducts: new Set([...prev.unlockedProducts, productId])
      }));
    }
  };

  const handleOpenMarketing = (product: Product) => {
    if (subscription.plan === 'ELITE') {
      setSelectedProduct(product);
      setShowMarketing(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Sidebar 
        activePage={currentPage} 
        onPageChange={setCurrentPage}
        subscription={subscription}
      />

      <main className="flex-1 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <Header subscription={subscription} />

          {currentPage === 'home' && (
            <>
              <div className="flex gap-3 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" strokeWidth={2} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Rechercher des produits gagnants..."
                    className="w-full h-12 pl-12 pr-4 bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-amber-500/50 rounded-xl text-sm text-white placeholder-white/30 outline-none"
                  />
                </div>
                
                <button
                  onClick={() => handleSearch()}
                  disabled={isLoading}
                  className="px-6 h-12 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 disabled:opacity-50 text-black rounded-xl font-bold text-sm flex items-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} /> : <Search className="w-4 h-4" strokeWidth={2.5} />}
                  Analyser
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl mb-8">
                  <AlertCircle className="w-5 h-5" strokeWidth={2} />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {products.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      subscription={subscription}
                      onUnlock={handleUnlock}
                      onOpenMarketing={handleOpenMarketing}
                    />
                  ))}
                </div>
              )}

              {!isLoading && !error && products.length === 0 && (
                <div className="text-center py-20">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full" />
                    <div className="relative w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-black" strokeWidth={2.5} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Prêt à Sourcer</h3>
                  <p className="text-sm text-white/40">Lancez une recherche pour découvrir les produits gagnants</p>
                </div>
              )}
            </>
          )}

          {currentPage === 'trends' && (
            <TrendScout onSearch={handleSearch} />
          )}

          {currentPage === 'settings' && (
            <div className="text-center py-20">
              <Settings className="w-16 h-16 text-white/20 mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-white mb-2">Paramètres</h3>
              <p className="text-sm text-white/40">Bientôt disponible</p>
            </div>
          )}
        </div>
      </main>

      <MarketingPanel
        product={selectedProduct}
        isOpen={showMarketing}
        onClose={() => setShowMarketing(false)}
      />

      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
