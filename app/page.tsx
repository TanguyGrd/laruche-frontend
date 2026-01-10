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
