'use client';

import React, { useState } from 'react';
import {
  Search, Sparkles, Lock, Check, X, Crown, Loader2, AlertCircle,
  Home, TrendingUp, CreditCard, Settings, HelpCircle, Menu
} from 'lucide-react';

type PlanType = 'STARTER' | 'PRO' | 'BUSINESS' | 'ELITE';
type PageType = 'home' | 'pricing';

interface Product {
  id: string;
  title: string;
  image: string;
  link: string;
}

const PLANS = [
  {
    id: 'STARTER' as PlanType,
    name: 'Starter',
    price: '0€',
    credits: '3 crédits',
    features: ['Recherche produits', '3 déblocages', 'Stats de base']
  },
  {
    id: 'PRO' as PlanType,
    name: 'Pro',
    price: '29€/mois',
    credits: '50 crédits',
    features: ['Tout Starter', '50 déblocages', 'Profit Calculator'],
    popular: true
  },
  {
    id: 'BUSINESS' as PlanType,
    name: 'Business',
    price: '59€/mois',
    credits: '200 crédits',
    features: ['Tout Pro', '200 déblocages', 'Trend Scout']
  },
  {
    id: 'ELITE' as PlanType,
    name: 'Elite',
    price: '99€/mois',
    credits: 'ILLIMITÉ',
    features: ['Tout Business', 'Illimité', 'Marketing IA']
  }
];

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
        setError('Aucun produit');
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
    <div className="min-h-screen bg-black text-white flex">
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
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl ${
              page === 'home' ? 'bg-amber-500/20 text-amber-400' : 'text-white/70 hover:bg-white/5'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-sm">Sourcing</span>
          </button>

          <button
            onClick={() => setPage('pricing')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl ${
              page === 'pricing' ? 'bg-amber-500/20 text-amber-400' : 'text-white/70 hover:bg-white/5'
            }`}
          >
            <Crown className="w-5 h-5" />
            <span className="text-sm">Abonnements</span>
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Sourcing Intelligence</h2>
            <p className="text-sm text-white/50">Découvrez les produits gagnants</p>
          </div>

          <div className="flex gap-4">
            {plan !== 'ELITE' && (
              <div className="flex items-center gap-3 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-xs text-amber-400/70 uppercase">Alvéoles</div>
                  <div className="text-lg font-bold text-amber-400">{credits}</div>
                </div>
              </div>
            )}

            <div className={`px-4 py-2 rounded-xl ${
              plan === 'ELITE'
                ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-black'
                : 'bg-white/5 text-white border border-white/10'
            }`}>
              <div className="flex items-center gap-2">
                {plan === 'ELITE' && <Crown className="w-4 h-4" />}
                <div>
                  <div className="text-xs uppercase opacity-70">Plan</div>
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
                placeholder="Rechercher des produits..."
                className="flex-1 h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-white outline-none"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="px-6 h-12 bg-gradient-to-r from-amber-400 to-amber-600 text-black rounded-xl font-bold"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Analyser'}
              </button>
            </div>

            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl mb-8">
                {error}
              </div>
            )}

            {products.length > 0 ? (
              <div className="grid grid-cols-4 gap-6">
                {products.map((p) => (
                  <div key={p.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <div className="relative aspect-square bg-black/20">
                      <img
                        src={p.image}
                        alt={p.title}
                        className={`w-full h-full object-cover ${unlocked.has(p.id) ? '' : 'blur-sm grayscale'}`}
                      />
                      {!unlocked.has(p.id) && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Lock className="w-12 h-12 text-amber-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className={`text-sm mb-3 ${unlocked.has(p.id) ? '' : 'blur-sm'}`}>
                        {p.title}
                      </h3>
                      {!unlocked.has(p.id) ? (
                        <button
                          onClick={() => unlock(p.id)}
                          disabled={plan !== 'ELITE' && credits === 0}
                          className="w-full h-10 bg-gradient-to-r from-amber-400 to-amber-600 text-black rounded-xl font-semibold disabled:opacity-50"
                        >
                          Butiner (1 Crédit)
                        </button>
                      ) : (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-10 flex items-center justify-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl"
                        >
                          <Check className="w-4 h-4" />
                          Lien Source
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : !loading && (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">Prêt à Sourcer</h3>
                <p className="text-white/40">Lancez une recherche</p>
              </div>
            )}
          </>
        )}

        {page === 'pricing' && (
          <div className="max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Choisissez Votre Plan</h2>
              <p className="text-white/60">Déverrouillez LaRuche.ai</p>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {PLANS.map((p) => (
                <div
                  key={p.id}
                  className={`bg-white/5 border rounded-2xl p-6 ${
                    p.popular ? 'border-amber-500/50' : 'border-white/10'
                  }`}
                >
                  {p.popular && (
                    <div className="mb-4 px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full inline-block">
                      POPULAIRE
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                  <div className="text-3xl font-bold mb-1">{p.price}</div>
                  <div className="text-xs text-white/50 mb-6">{p.credits}</div>

                  <ul className="space-y-2 mb-6">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                        <Check className="w-4 h-4 text-emerald-400" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      setPlan(p.id);
                      setCredits(p.id === 'STARTER' ? 3 : p.id === 'PRO' ? 50 : p.id === 'BUSINESS' ? 200 : 999);
                    }}
                    className={`w-full py-3 rounded-xl font-semibold ${
                      plan === p.id
                        ? 'bg-white/10 text-white/50 cursor-not-allowed'
                        : p.id === 'ELITE'
                        ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
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
    </div>
  );
}
