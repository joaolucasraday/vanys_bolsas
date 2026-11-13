import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORY_OPTIONS } from '../data/catalog';
import { CategoryKey, Product } from '../types/shop';
import { formatBRL } from '../utils/format';
import { ResilientImage } from './ResilientImage';

type SortOption = 'featured' | 'price-asc' | 'price-desc';

interface CatalogSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export function CatalogSection({
  products,
  onSelectProduct,
  onQuickAdd,
}: CatalogSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = products.filter((item) => {
      const matchesCategory =
        activeCategory === 'todas' || item.category === activeCategory;
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.material.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });

    if (sortBy === 'price-asc') {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    return filtered;
  }, [products, activeCategory, searchQuery, sortBy]);

  const resetFilters = () => {
    setActiveCategory('todas');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section
      id="catalogo"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-200">
        <div className="space-y-2 max-w-xl">
          <p className="text-xs font-medium text-[#9E1644] tracking-wide">
            Curadoria Permanente
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 [text-wrap:balance]">
            Bolsas &amp; Silhuetas Essenciais
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search
              className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              strokeWidth={1.75}
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar modelo ou material..."
              aria-label="Buscar bolsas por nome ou material"
              className="w-full sm:w-64 pl-9 pr-8 py-2 text-sm bg-white border border-zinc-200 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#9E1644] min-h-[40px]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Limpar busca"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="inline-flex items-center gap-2 border border-zinc-200 rounded-lg px-3 min-h-[40px] bg-white">
            <SlidersHorizontal
              className="w-4 h-4 text-zinc-500 shrink-0"
              strokeWidth={1.75}
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Ordenar catálogo"
              className="text-sm text-zinc-800 bg-transparent focus:outline-none cursor-pointer py-1.5 pr-1"
            >
              <option value="featured">Destaques</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-6">
        <div
          role="tablist"
          aria-label="Filtrar bolsas por categoria"
          className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#F6F4F5] rounded-lg"
        >
          {CATEGORY_OPTIONS.map((category) => {
            const isActive = activeCategory === category.key;
            return (
              <button
                key={category.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category.key)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#9E1644] ${
                  isActive
                    ? 'bg-white text-[#7B1135] shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-zinc-500 tabular-nums">
          {filteredProducts.length}{' '}
          {filteredProducts.length === 1 ? 'peça encontrada' : 'peças encontradas'}
        </p>
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 px-6 text-center bg-[#F6F4F5] rounded-xl border border-zinc-200/70">
          <p className="font-display text-2xl font-semibold text-zinc-900 mb-2">
            Nenhuma peça encontrada
          </p>
          <p className="text-sm text-zinc-600 mb-6">
            Tente ajustar os termos da sua busca ou explore todas as categorias.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-5 py-2.5 text-sm font-medium text-white bg-[#9E1644] hover:bg-[#7B1135] rounded-lg transition-colors cursor-pointer min-h-[44px]"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col bg-white border border-zinc-200/80 rounded-xl overflow-hidden transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => onSelectProduct(product)}
                className="relative aspect-[4/3] w-full bg-[#F6F4F5] overflow-hidden cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#9E1644]"
                aria-label={`Ver detalhes de ${product.name}`}
              >
                <ResilientImage
                  src={product.variants[0]?.image || product.gallery[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
              </button>

              <div className="flex flex-col flex-1 p-5 gap-3">
                <div className="flex items-center justify-between gap-2 text-xs text-zinc-500">
                  <span className="truncate">
                    {product.categoryLabel} · {product.material}
                  </span>
                  <span className="shrink-0 font-medium text-[#9E1644]">
                    {product.availability}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProduct(product)}
                  className="text-left cursor-pointer"
                >
                  <h3 className="text-base font-semibold text-zinc-900 group-hover:text-[#9E1644] transition-colors">
                    {product.name}
                  </h3>
                </button>

                <p className="text-sm text-zinc-600 line-clamp-2 leading-relaxed">
                  {product.shortDescription}
                </p>

                <div className="mt-auto pt-3 border-t border-zinc-100 flex items-center justify-between gap-3">
                  <span className="text-[15px] font-semibold text-zinc-900 tabular-nums">
                    {formatBRL(product.price)}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="px-3 py-2 text-xs font-medium text-zinc-700 hover:text-[#9E1644] border border-zinc-200 hover:border-[#9E1644]/40 rounded-lg transition-colors cursor-pointer whitespace-nowrap min-h-[40px]"
                    >
                      Detalhes
                    </button>
                    <button
                      type="button"
                      onClick={() => onQuickAdd(product)}
                      className="px-3.5 py-2 text-xs font-medium text-white bg-[#9E1644] hover:bg-[#7B1135] rounded-lg transition-colors cursor-pointer whitespace-nowrap min-h-[40px]"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
