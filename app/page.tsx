'use client';

// app/page.tsx
// LaRuche.ai - Premium Sourcing Platform

import React, { useState, useEffect } from 'react';
import {
  Search, Sparkles, TrendingUp, DollarSign, Package, Zap, Copy, Check,
  X, Star, ShoppingCart, Truck, Target, TrendingDown, ExternalLink,
  MessageSquare, FileText, Camera, ArrowRight, Loader2, AlertCircle
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

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
  tiktok: string;
  facebook: string;
  shopify: string;
}

// ============================================================================
// MARKETING COPY GENERATOR
// ============================================================================

const generateMarketingCopy = (product: Product): MarketingCopy => {
  const productName = product.title.split(' ').slice(0, 4).join(' ');
  const price = product.cost_price.toFixed(2);
  const comparePrice = (product.cost_price * 4).toFixed(0);

  return {
    tiktok: `🎬 TIKTOK HOOK\n\n[0-3s] *Arrête de scroller* 🛑\n"Tu paies ${comparePrice}€ pour ça ?!"\n\n[3-7s] *Montre le produit*\n"Ce ${productName}...\nMÊME QUALITÉ. Regarde le prix 👀"\n\n[7-12s] *Zoom sur ${price}€*\n"OUI. ${price}€. Pas ${comparePrice}€.\nLE MÊME. 🤯"\n\n[12-15s] *Avis clients*\n"${product.sales}+ ventes ⭐⭐⭐⭐⭐\nLivraison Express 📦"\n\n[15-20s] *CTA urgent*\n"Stock limité ⚠️\nLien bio MAINTENANT 👆"\n\n#${productName.replace(/\s/g, '')} #DropshippingSecrets`,
    facebook: `🎯 FACEBOOK AD (AIDA)\n\n[ATTENTION]\n❌ STOP de payer ${comparePrice}€\n\n[INTÉRÊT]\n✨ Même qualité premium\n✨ ${product.rating}/5 étoiles\n✨ ${product.sales}+ ventes vérifiées\n✨ Livraison Express\n\n[DÉSIR]\n💬 "Qualité incroyable, reçu en 3 jours !"\n- Sophie, Paris ⭐⭐⭐⭐⭐\n\nÉconomisez ${(parseFloat(comparePrice) - parseFloat(price)).toFixed(0)}€\n\n[ACTION]\n🔥 -65% pendant 24h\n👉 Commandez maintenant\n🎁 Livraison OFFERTE`,
    shopify: `📋 FICHE SHOPIFY\n\n🏆 ${product.title}\n\n✨ CARACTÉRISTIQUES\n• Qualité Premium\n• Note : ${product.rating}/5 ⭐\n• ${product.sales}+ Ventes\n• Livraison Express\n\n💎 AVANTAGES\n✓ Design moderne\n✓ Haute qualité\n✓ Excellent rapport qualité-prix\n✓ Service client réactif\n\n📦 LIVRAISON\n• Expédition 24h\n• Suivi temps réel\n• Retour 30 jours`
  };
};

// ============================================================================
// COMPONENTS
// ============================================================================

const SaturationBadge = ({ status, score }: { status: string; score: number }) => {
  const styles = {
    niche: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    emerging: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    hot: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    saturated: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
  };

  const labels = {
    niche: '💎 Niche',
    emerging: '🚀 Émergent',
    hot: '🔥 Chaud',
    saturated: '⚠️ Saturé'
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 border rounded-md text-[10px] font-bold uppercase tracking-wider ${styles[status as keyof typeof styles]}`}>
      {labels[status as keyof typeof labels]}
    </div>
  );
};

const MarketingPanel = ({ product, isOpen, onClose }: { 
  product: Product | null; 
  isOpen: boolean; 
  onClose: () => void 
}) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [marketingCopy, setMarketingCopy] = useState<MarketingCopy | null>(null);

  useEffect(() => {
    if (product && isOpen) {
      setMarketingCopy(generateMarketingCopy(product));
    }
  }, [product, isOpen]);

  if (!isOpen || !product || !marketingCopy) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border-l border-white/10 h-screen overflow-y-auto animate-slide-in">
        {/* Header */}
        <div className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 p-6 z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Marketing Toolkit</h2>
                <p className="text-xs text-white/50 mt-0.5">Copie instantanée</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <X className="w-5 h-5 text-white/50" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* TikTok */}
          <div className="group bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Camera className="w-5 h-5 text-white/70" strokeWidth={2} />
                <div>
                  <h3 className="font-bold text-white text-sm">Script TikTok</h3>
                  <p className="text-[11px] text-white/40">Hook viral 15-20s</p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(marketingCopy.tiktok, 'tiktok')}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium text-white transition-colors"
              >
                {copied === 'tiktok' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2.5} />
                    <span className="text-emerald-400">Copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" strokeWidth={2} />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-[11px] leading-relaxed text-white/70 whitespace-pre-wrap font-mono bg-black/30 p-4 rounded-xl border border-white/5 overflow-x-auto">
              {marketingCopy.tiktok}
            </pre>
          </div>

          {/* Facebook */}
          <div className="group bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-white/70" strokeWidth={2} />
                <div>
                  <h3 className="font-bold text-white text-sm">Ad Facebook</h3>
                  <p className="text-[11px] text-white/40">Méthode AIDA</p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(marketingCopy.facebook, 'facebook')}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium text-white transition-colors"
              >
                {copied === 'facebook' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2.5} />
                    <span className="text-emerald-400">Copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" strokeWidth={2} />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-[11px] leading-relaxed text-white/70 whitespace-pre-wrap font-mono bg-black/30 p-4 rounded-xl border border-white/5 overflow-x-auto">
              {marketingCopy.facebook}
            </pre>
          </div>

          {/* Shopify */}
          <div className="group bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-white/70" strokeWidth={2} />
                <div>
                  <h3 className="font-bold text-white text-sm">Fiche Shopify</h3>
                  <p className="text-[11px] text-white/40">Descriptif optimisé</p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(marketingCopy.shopify, 'shopify')}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium text-white transition-colors"
              >
                {copied === 'shopify' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2.5} />
                    <span className="text-emerald-400">Copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" strokeWidth={2} />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-[11px] leading-relaxed text-white/70 whitespace-pre-wrap font-mono bg-black/30 p-4 rounded-xl border border-white/5 overflow-x-auto">
              {marketingCopy.shopify}
            </pre>
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

const ProductCard = ({ product, onClick }: { product: Product; onClick: () => void }) => {
  return (
    <div className="group relative bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-square bg-black/20 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3">
          <SaturationBadge status={product.saturation_status} score={product.saturation_score} />
        </div>

        {product.shipping_optimized && (
          <div className="absolute top-3 right-3">
            <div className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-md backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3 h-3 text-emerald-400" strokeWidth={2.5} />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Express</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-sm font-medium text-white line-clamp-2 min-h-[40px] leading-tight">
          {product.title}
        </h3>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 bg-white/[0.03] border border-white/10 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" strokeWidth={2} />
              <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Note</span>
            </div>
            <div className="text-base font-bold text-white">{product.rating.toFixed(1)}</div>
          </div>

          <div className="p-2.5 bg-white/[0.03] border border-white/10 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1">
              <ShoppingCart className="w-3 h-3 text-blue-400" strokeWidth={2} />
              <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Ventes</span>
            </div>
            <div className="text-base font-bold text-white">{product.sales.toLocaleString()}</div>
          </div>
        </div>

        {/* Profit */}
        <div className="p-3 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-3.5 h-3.5 text-amber-400" strokeWidth={2.5} />
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Profit Net</span>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-white/40">Coût total</span>
              <span className="font-mono text-white/60">€{product.total_cost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-white/40">Prix vente</span>
              <span className="font-mono text-white/60">€{product.suggested_price.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-amber-500/20 flex items-end justify-between">
              <span className="text-[10px] font-medium text-amber-400 uppercase tracking-wider">Marge</span>
              <div className="text-right">
                <div className="text-xl font-bold text-amber-400">€{product.net_profit.toFixed(2)}</div>
                <div className="text-[10px] text-amber-400/70">{product.profit_margin.toFixed(0)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onClick}
            className="h-9 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black rounded-lg font-semibold text-xs transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" strokeWidth={2.5} />
            <span>Marketing</span>
          </button>
          
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-white rounded-lg font-medium text-xs transition-all"
          >
            <span>Voir</span>
            <ExternalLink className="w-3 h-3" strokeWidth={2} />
          </a>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);
    setProducts([]);

    try {
      const response = await fetch(
        `https://laruche-backend.vercel.app/api/sourcing?keywords=${encodeURIComponent(searchTerm)}`
      );

      if (!response.ok) throw new Error('API Error');

      const data = await response.json();
      
      if (data.success && data.products) {
        setProducts(data.products);
      } else {
        setError('Aucun produit trouvé');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur de chargement');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsPanelOpen(true);
  };

  const nicheProducts = products.filter(p => p.saturation_status === 'niche');
  const avgProfit = products.length > 0
    ? products.reduce((sum, p) => sum + p.net_profit, 0) / products.length
    : 0;

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <MarketingPanel 
        product={selectedProduct} 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
      />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/30 blur-xl rounded-full" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                LaRuche<span className="text-amber-400">.ai</span>
              </h1>
              <p className="text-[11px] text-white/40 uppercase tracking-wider">Agent IA Sourcing</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" strokeWidth={2} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Rechercher des produits gagnants..."
                className="w-full h-12 pl-12 pr-4 bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-amber-500/50 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-colors"
              />
            </div>
            
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-6 h-12 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 disabled:opacity-50 text-black rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                  Analyse...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" strokeWidth={2.5} />
                  Analyser
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        {products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-emerald-400" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-[10px] text-white/40 mb-0.5 uppercase tracking-wider">Niches</div>
                  <div className="text-2xl font-bold text-white">{nicheProducts.length}</div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-amber-400" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-[10px] text-white/40 mb-0.5 uppercase tracking-wider">Profit Moyen</div>
                  <div className="text-2xl font-bold text-white">€{avgProfit.toFixed(2)}</div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-400" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-[10px] text-white/40 mb-0.5 uppercase tracking-wider">Produits</div>
                  <div className="text-2xl font-bold text-white">{products.length}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl mb-8">
            <AlertCircle className="w-5 h-5" strokeWidth={2} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && products.length === 0 && (
          <div className="text-center py-20">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-black" strokeWidth={2.5} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Prêt à Sourcer</h3>
            <p className="text-sm text-white/40 max-w-md mx-auto">
              Lancez une recherche pour découvrir les produits gagnants avec l'analyse IA
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
