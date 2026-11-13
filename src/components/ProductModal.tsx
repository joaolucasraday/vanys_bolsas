import { useEffect, useState } from 'react';
import { Minus, Plus, Ruler, ShieldCheck, X } from 'lucide-react';
import { Product } from '../types/shop';
import { formatBRL } from '../utils/format';
import { ResilientImage } from './ResilientImage';

interface ProductModalProps {
  product: Product | null;
  relatedProducts: Product[];
  onClose: () => void;
  onSelectRelated: (product: Product) => void;
  onAddToCart: (
    product: Product,
    variantIndex: number,
    quantity: number
  ) => void;
}

export function ProductModal({
  product,
  relatedProducts,
  onClose,
  onSelectRelated,
  onAddToCart,
}: ProductModalProps) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedVariantIdx(0);
      setSelectedImage(product.variants[0]?.image || product.gallery[0]);
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const activeVariant =
    product.variants[selectedVariantIdx] || product.variants[0];
  const displayImage = selectedImage || activeVariant?.image || product.gallery[0];

  const handleVariantChange = (idx: number) => {
    setSelectedVariantIdx(idx);
    const variant = product.variants[idx];
    if (variant) {
      setSelectedImage(variant.image);
    }
  };

  const handleSubmit = () => {
    onAddToCart(product, selectedVariantIdx, quantity);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/55 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes do produto"
          className="sticky top-4 float-right mr-4 mt-4 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/95 border border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" strokeWidth={1.75} />
        </button>

        <div className="p-5 sm:p-8 lg:p-10 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Gallery Left */}
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0">
                {product.gallery.map((imgUrl, idx) => {
                  const isSelected = displayImage === imgUrl;
                  return (
                    <button
                      key={`${product.id}-thumb-${idx}`}
                      type="button"
                      onClick={() => setSelectedImage(imgUrl)}
                      aria-label={`Visualizar imagem ${idx + 1} de ${product.name}`}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-[#F6F4F5] border transition-colors cursor-pointer shrink-0 ${
                        isSelected
                          ? 'border-[#9E1644] ring-1 ring-[#9E1644]'
                          : 'border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      <ResilientImage
                        src={imgUrl}
                        alt={`${product.name} vista ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>

              <div className="flex-1 aspect-[4/3] bg-[#F6F4F5] rounded-xl overflow-hidden border border-zinc-200/70">
                <ResilientImage
                  src={displayImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Purchase Module Right */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-medium text-zinc-500">
                  {product.categoryLabel} · {product.material}
                </p>
                <h2
                  id="pdp-title"
                  className="font-display text-3xl font-semibold text-zinc-900 leading-tight"
                >
                  {product.name}
                </h2>
                <div className="flex items-baseline justify-between gap-4 pt-1">
                  <p className="text-2xl font-semibold text-zinc-900 tabular-nums">
                    {formatBRL(product.price)}
                  </p>
                  <span className="text-xs font-medium text-[#9E1644]">
                    {product.availability}
                  </span>
                </div>
              </div>

              <p className="text-sm text-zinc-600 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Color Swatches */}
              <div className="space-y-2.5 pt-2 border-t border-zinc-100">
                <p className="text-xs font-medium text-zinc-700">
                  Cor selecionada:{' '}
                  <span className="text-zinc-900 font-semibold">
                    {activeVariant?.name}
                  </span>
                </p>
                <div className="flex items-center gap-3">
                  {product.variants.map((variant, idx) => {
                    const isSelected = idx === selectedVariantIdx;
                    return (
                      <button
                        key={variant.name}
                        type="button"
                        onClick={() => handleVariantChange(idx)}
                        aria-label={`Selecionar cor ${variant.name}`}
                        aria-pressed={isSelected}
                        className={`w-9 h-9 rounded-full border transition-transform cursor-pointer flex items-center justify-center ${
                          isSelected
                            ? 'ring-2 ring-offset-2 ring-[#9E1644] border-zinc-300 scale-105'
                            : 'border-zinc-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: variant.hex }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Quantity & CTA */}
              <div className="flex items-center gap-3 pt-2">
                <div className="inline-flex items-center border border-zinc-200 rounded-lg bg-white h-11">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Diminuir quantidade"
                    className="w-10 h-full inline-flex items-center justify-center text-zinc-600 hover:text-zinc-900 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-zinc-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    aria-label="Aumentar quantidade"
                    className="w-10 h-full inline-flex items-center justify-center text-zinc-600 hover:text-zinc-900 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 h-11 px-6 bg-[#9E1644] hover:bg-[#7B1135] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  Adicionar à Sacola · {formatBRL(product.price * quantity)}
                </button>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-3 pt-4 border-t border-zinc-200 text-xs text-zinc-600">
                <div className="flex items-start gap-2.5">
                  <Ruler className="w-4 h-4 text-[#9E1644] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-zinc-900">
                      Dimensões:
                    </span>{' '}
                    <span className="tabular-nums">{product.dimensions}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#9E1644] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-zinc-900">
                      Acabamento:
                    </span>{' '}
                    {product.craftNote}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="pt-8 border-t border-zinc-200 space-y-4">
              <h3 className="font-display text-2xl font-semibold text-zinc-900">
                Peças Relacionadas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => onSelectRelated(rel)}
                    className="group flex items-center gap-3 p-2.5 rounded-xl border border-zinc-200 hover:border-[#9E1644]/50 text-left transition-colors cursor-pointer bg-white"
                  >
                    <div className="w-20 aspect-[4/3] rounded-lg overflow-hidden bg-[#F6F4F5] shrink-0">
                      <ResilientImage
                        src={rel.gallery[0]}
                        alt={rel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-zinc-500 truncate">
                        {rel.categoryLabel}
                      </p>
                      <p className="text-sm font-semibold text-zinc-900 truncate group-hover:text-[#9E1644]">
                        {rel.name}
                      </p>
                      <p className="text-xs font-medium text-zinc-700 tabular-nums mt-0.5">
                        {formatBRL(rel.price)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
