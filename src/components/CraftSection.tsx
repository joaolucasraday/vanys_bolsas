import { PRODUCTS } from '../data/catalog';
import { Product } from '../types/shop';
import { ResilientImage } from './ResilientImage';

interface CraftSectionProps {
  onSelectProduct: (product: Product) => void;
}

const CRAFT_PILLARS = [
  {
    index: '01.',
    title: 'Couro de curtimento vegetal',
    description:
      'Peles selecionadas com tingimento natural que preservam a textura orgânica e ganham caráter ao longo dos anos.',
  },
  {
    index: '02.',
    title: 'Trançado manual em ráfia',
    description:
      'Fibras naturais entrelaçadas em tear artesanal, reforçadas internamente para manter a estrutura sem perder a leveza.',
  },
  {
    index: '03.',
    title: 'Metais banhados e bordas seladas',
    description:
      'Fechos em latão escovado com proteção antioxidante e quatro camadas de pintura manual em cada corte de couro.',
  },
];

export function CraftSection({ onSelectProduct }: CraftSectionProps) {
  const featuredBento = [PRODUCTS[0], PRODUCTS[3], PRODUCTS[4], PRODUCTS[5]];

  return (
    <section
      id="artesania"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
        {/* Left column: Asymmetric 2x2 studio mosaic */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          {featuredBento.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectProduct(item)}
              className="group relative aspect-[4/3] bg-[#F6F4F5] rounded-xl overflow-hidden border border-zinc-200/70 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E1644]"
              aria-label={`Explorar ${item.name}`}
            >
              <ResilientImage
                src={item.gallery[0]}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/65 via-black/25 to-transparent text-white opacity-95"
                aria-hidden="true"
              >
                <p className="text-xs font-medium truncate">{item.name}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Right column: Craftsmanship editorial narrative */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <p className="text-xs font-medium text-[#9E1644] tracking-wide">
              Matéria &amp; Ofício
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 [text-wrap:balance]">
              Cada peça passa por vinte e quatro horas de acabamento manual.
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Do corte de precisão à pintura das bordas, nosso ateliê une
              tradição em selaria e design contemporâneo para criar bolsas que
              resistem ao uso diário sem perder o apuro estético.
            </p>
          </div>

          <div className="divide-y divide-zinc-200 border-y border-zinc-200">
            {CRAFT_PILLARS.map((pillar) => (
              <div key={pillar.index} className="py-4 space-y-1">
                <h3 className="text-sm sm:text-base font-semibold text-zinc-900">
                  <span className="text-[#9E1644] mr-2 tabular-nums">
                    {pillar.index}
                  </span>
                  {pillar.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-1">
            <div>
              <p className="font-display text-3xl font-semibold text-[#7B1135] tabular-nums">
                24h
              </p>
              <p className="text-xs text-zinc-600 mt-1">
                Trabalho manual por bolsa
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-[#7B1135] tabular-nums">
                5 anos
              </p>
              <p className="text-xs text-zinc-600 mt-1">
                Garantia estrutural e metais
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-[#7B1135] tabular-nums">
                100%
              </p>
              <p className="text-xs text-zinc-600 mt-1">
                Couro com origem rastreada
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
