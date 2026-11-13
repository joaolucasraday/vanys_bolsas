/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { CartDrawer } from './components/CartDrawer';
import { CatalogSection } from './components/CatalogSection';
import { CraftSection } from './components/CraftSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LookbookSection } from './components/LookbookSection';
import { ProductModal } from './components/ProductModal';
import { PRODUCTS } from './data/catalog';
import { CartItem, Product } from './types/shop';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  useEffect(() => {
    if (!addedToast) return;
    const timer = window.setTimeout(() => setAddedToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [addedToast]);

  const totalCartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return [];
    return PRODUCTS.filter((p) => p.id !== selectedProduct.id).slice(0, 3);
  }, [selectedProduct]);

  const handleAddToCart = (
    product: Product,
    variantIndex = 0,
    quantity = 1
  ) => {
    const variant = product.variants[variantIndex] || product.variants[0];
    const variantName = variant?.name || 'Padrão';
    const variantHex = variant?.hex || '#18181B';
    const image = variant?.image || product.gallery[0];

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === product.id && item.variantName === variantName
      );
      if (existingIndex >= 0) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          variantName,
          variantHex,
          name: product.name,
          categoryLabel: product.categoryLabel,
          price: product.price,
          image,
          quantity,
        },
      ];
    });

    setSelectedProduct(null);
    setAddedToast(`${product.name} adicionada à sacola`);
  };

  const handleUpdateQuantity = (
    productId: string,
    variantName: string,
    delta: number
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId && item.variantName === variantName
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string, variantName: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.productId === productId && item.variantName === variantName)
      )
    );
  };

  const handleSelectProductById = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) {
      setSelectedProduct(found);
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900">
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        <HeroSection onExploreClick={scrollToCatalog} />

        <CatalogSection
          products={PRODUCTS}
          onSelectProduct={setSelectedProduct}
          onQuickAdd={(product) => handleAddToCart(product, 0, 1)}
        />

        <LookbookSection onSelectProductById={handleSelectProductById} />

        <CraftSection onSelectProduct={setSelectedProduct} />
      </main>

      <Footer />

      <ProductModal
        product={selectedProduct}
        relatedProducts={relatedProducts}
        onClose={() => setSelectedProduct(null)}
        onSelectRelated={setSelectedProduct}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />

      {addedToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-3 px-4 py-3 bg-zinc-900 text-white text-xs sm:text-sm rounded-xl shadow-lg border border-zinc-800"
        >
          <Check className="w-4 h-4 text-rose-300 shrink-0" />
          <span className="truncate max-w-[220px] sm:max-w-xs">
            {addedToast}
          </span>
          <button
            type="button"
            onClick={() => {
              setAddedToast(null);
              setIsCartOpen(true);
            }}
            className="text-rose-300 hover:text-white font-semibold underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
          >
            Ver Sacola
          </button>
        </div>
      )}
    </div>
  );
}
