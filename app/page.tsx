'use client';

import React, { useState } from 'react';
import {
  Search, Sparkles, Lock, Check, Crown, Loader2, AlertCircle, DollarSign,
  Home, TrendingUp, CreditCard, Star, Truck, ShieldCheck, Package, Target
} from 'lucide-react';

type PlanType = 'STARTER' | 'PRO' | 'BUSINESS' | 'ELITE';
type PageType = 'home' | 'pricing';

interface Product {
  id: string;
  title: string;
  image: string;
  link: string;
  cost_price: number;
  suggested_price: number;
  net_profit: number;
  profit_margin: number;
  rating: number;
  sales: number;
  shipping_cost: number;
  saturation_status: string;
  saturation_score: number;
}

const PLANS = [
  {
    id: 'STARTER' as PlanType,
    name: 'Starter',
    price: '0€',
    credits: '3 crédits',
    features: ['Recherche produits', 'Infos vendeur', 'Notes & avis', '3 déblocages']
  },
  {
    id: 'PRO' as PlanType,
    name: 'Pro',
    price: '29€/mois',
    credits: '50 crédits',
    features: ['Tout Starter', '50 déblocages', 'Profit Calculator', 'Analyse marges'],
    popular: true
  },
  {
    id: 'BUSINESS' as PlanType,
    name: 'Business',
    price: '59€/mois',
    credits: '200 crédits',
    features: ['Tout Pro', '200 déblocages', 'Trend Scout', 'Saturation Score']
  },
  {
    id: 'ELITE' as PlanType,
    name: 'Elite',
    price: '99€/mois',
    credits: 'ILLIMITÉ',
    features: ['Tout Business', 'Déblocages illimités', 'Marketing IA', 'Export Shopify']
  }
];

const ProductCard = ({
  product,
  plan,
  unlocked,
  onUnlock,
  canUnlock
}: {
  product: Product;
  plan: PlanType;
  unlocked: boolean;
  onUnlock: () => void;
  canUnlock: boolean;
}) => {
  const hasProFeatures = ['PRO', 'BUSINESS', 'ELITE'].includes(plan);
  const hasBusinessFeatures = ['BUSINESS', 'ELITE'].includes(plan);
  
  // Calcul fiabilité vendeur basé sur ventes
  const sellerTrust = product.sales > 1000 ? 98 : product.sales > 500 ? 95 : product.sales > 100 ? 92 : 88;
  
  // Délai livraison basé sur prix (estimation)
  const deliveryDays = product.shipping_cost === 0 ? '3-5 jours' : '5-10 jours';
  
  // Description courte générée
  const shortDesc = `${product.title.split(' ').slice(0, 8).join(' ')}...`;

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all">
      {/* Image */}
      <div className="relative aspect-square bg-black/20">
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-cover ${unlocked ? '' : 'blur-sm grayscale'}`}
        />
        {!unlocked && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Lock className="w-12 h-12 text-amber-400" strokeWidth={2} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title - Toujours visible */}
        <h3 className="text-sm font-medium text-white line-clamp-2 min-h-[40px]">
          {product.title}
        </h3>

        {/* Infos Visibles pour TOUS (même STARTER) */}
        <div className="space-y-2">
          {/* Note & Avis */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" strokeWidth={2} />
              <span className="font-bold text-white">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-white/50">({product.sales.toLocaleString()} avis)</span>
          </div>

          {/* Livraison */}
          <div className="flex items-center gap-2 text-xs text-white/70">
            <Truck className="w-3.5 h-3.5 text-blue-400" strokeWidth={2} />
            <span>Livraison : {deliveryDays}</span>
          </div>

          {/* Fiabilité Vendeur */}
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2} />
            <span>Vendeur fiable ({sellerTrust}%)</span>
          </div>

          {/* Description courte */}
          <div className="p-2 bg-white/[0.03] rounded-lg">
            <p className="text-[11px] text-white/60 line-clamp-2">{shortDesc}</p>
          </div>
        </div>

        {/* Profit Calculator - PRO+ uniquement */}
        {hasProFeatures && (
          <div className="p-3 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" strokeWidth={2.5} />
              <span className="text-[10px] font-bold text-amber-400 uppercase">Profit Net</span>
              <span className="ml-auto text-[9px] px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full font-bold">PRO</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs text-white/50">Coût: €{product.cost_price.toFixed(2)}</div>
                <div className="text-xs text-white/50">Vente: €{product.suggested_price.toFixed(2)}</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-amber-400">€{product.net_profit.toFixed(2)}</div>
                <div className="text-[10px] text-amber-400/70">{product.profit_margin.toFixed(0)}%</div>
              </div>
            </div>
          </div>
        )}

        {/* Saturation Score - BUSINESS+ uniquement */}
        {hasBusinessFeatures && (
          <div className="flex items-center justify-between p-2 bg-white/[0.03] rounded-lg">
            <div className="flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-purple-400" strokeWidth={2} />
              <span className="text-xs text-white/70">Saturation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    product.saturation_score < 30 ? 'bg-emerald-500' :
                    product.saturation_score < 60 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${product.saturation_score}%` }}
                />
              </div>
              <span className="text-xs font-bold text-white">{product.saturation_score}%</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        {!unlocked ? (
          <button
            onClick={onUnlock}
            disabled={!canUnlock}
            className={`w-full h-10 flex items-center justify-center gap-2 rounded-xl font-semibold text-sm transition-all ${
              canUnlock
                ? 'bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black shadow-lg shadow-amber-500/20'
                : 'bg-white/5 text-white/30 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-4 h-4" strokeWidth={2.5} />
            Butiner (1 Crédit)
          </button>
        ) : (
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-10 flex items-center justify-center gap-2 bg-emerald-500/20 border border-emerald-500/30 hover:bg-emerald-500/30 text-emerald-400 rounded-xl font-semibold text-sm transition-all"
          >
            <Check className="w-4 h-4" strokeWidth={2.5} />
            Lien Source ✓
          </a>
        )}
      </div>
    </div>
  );
};

export default function Page() {
  const [page, setPage] = useState<PageType>('home');
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState<PlanType>('STARTER');
  const [credits, setCredits] = useState(3);
  const [unlocked, setUnlocked] = useState(new Set<string>());

  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    setError('');
    setProducts([]);

    try {
      const res = await fetch(
        `https://laruche-backend.vercel.app/api/sourcing?keywords=${encodeURIComponent(search)}`
      );
      const data = await res.json();
      if (data.success && data.products) {
        setProducts(data.products);
      } else {
        setError('Aucun produit trouvé');
      }
    } catch (err: any) {
      setError('Erreur API');
    } finally {
      setLoading(false);
    }
  };

  const unlock = (id: string) => {
    if (plan === 'ELITE' || credits > 0) {
      const newUnlocked = new Set(unlocked);
      newUnlocked.add(id);
      setUnlocked(newUnlocked);
      if (plan !== 'ELITE') setCredits(credits - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Sidebar */}
      <aside className="fixed w-64 h-screen bg-black border-r border-white/10 p-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-black" strokeWidth={2.5} />
          </div>
          <h1 className="text-lg font-bold">
            LaRuche<span className="text-amber-400">.ai</span>
          </h1>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setPage('home')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
              page === 'home' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-white/70 hover:bg-white/5'
            }`}
          >
            <Home className="w-5 h-5" strokeWidth={2} />
            <span className="text-sm font-medium">Sourcing</span>
          </button>

          <button
            onClick={() => setPage('pricing')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
              page === 'pricing' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-white/70 hover:bg-white/5'
            }`}
          >
            <Crown className="w-5 h-5" strokeWidth={2} />
            <span className="text-sm font-medium">Abonnements</span>
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Sourcing Intelligence</h2>
            <p className="text-sm text-white/50">Découvrez les produits gagnants</p>
          </div>

          <div className="flex gap-4">
            {plan !== 'ELITE' && (
              <div className="flex items-center gap-3 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <Sparkles className="w-5 h-5 text-amber-400" strokeWidth={2.5} />
                <div>
                  <div className="text-xs text-amber-400/70 uppercase tracking-wider">Alvéoles</div>
                  <div className="text-lg font-bold text-amber-400">{credits}</div>
                </div>
              </div>
            )}

            <div className={`px-4 py-2 rounded-xl border ${
              plan === 'ELITE'
                ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-black border-amber-500/50'
                : 'bg-white/5 text-white border-white/10'
            }`}>
              <div className="flex items-center gap-2">
                {plan === 'ELITE' && <Crown className="w-4 h-4" strokeWidth={2.5} />}
                <div>
                  <div className="text-xs uppercase tracking-wider opacity-70">Plan</div>
                  <div className="text-sm font-bold">{plan}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {page === 'home' && (
          <>
            <div className="flex gap-3 mb-8">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Rechercher des produits gagnants..."
                className="flex-1 h-12 px-4 bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-amber-500/50 rounded-xl text-white placeholder-white/30 outline-none transition-colors"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="px-6 h-12 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 disabled:opacity-50 text-black rounded-xl font-bold text-sm flex items-center gap-2 transition-all"
              >
                {loading ? (
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

            {error && (
              <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl mb-8">
                <AlertCircle className="w-5 h-5" strokeWidth={2} />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    plan={plan}
                    unlocked={unlocked.has(p.id)}
                    onUnlock={() => unlock(p.id)}
                    canUnlock={plan === 'ELITE' || credits > 0}
                  />
                ))}
              </div>
            ) : !loading && (
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

        {page === 'pricing' && (
          <div className="max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">Choisissez Votre Plan</h2>
              <p className="text-white/60">Déverrouillez tout le potentiel de LaRuche.ai</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PLANS.map((p) => (
                <div
                  key={p.id}
                  className={`bg-white/[0.02] border rounded-2xl p-6 transition-all hover:border-white/30 ${
                    p.popular ? 'border-amber-500/50 shadow-lg shadow-amber-500/10' : 'border-white/10'
                  }`}
                >
                  {p.popular && (
                    <div className="mb-4 px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-600 text-black text-xs font-bold rounded-full inline-block">
                      POPULAIRE
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                  <div className="text-3xl font-bold text-white mb-1">{p.price}</div>
                  <div className="text-xs text-white/50 mb-6">{p.credits}</div>

                  <ul className="space-y-2 mb-6">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      setPlan(p.id);
                      setCredits(p.id === 'STARTER' ? 3 : p.id === 'PRO' ? 50 : p.id === 'BUSINESS' ? 200 : 999);
                    }}
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                      plan === p.id
                        ? 'bg-white/10 text-white/50 cursor-not-allowed'
                        : p.id === 'ELITE'
                        ? 'bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    }`}
                    disabled={plan === p.id}
                  >
                    {plan === p.id ? 'Plan Actuel' : 'Passer à ' + p.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
