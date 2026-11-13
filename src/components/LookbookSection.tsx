import { ArrowUpRight } from 'lucide-react';
import { LOOKBOOK_ENTRIES } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface LookbookSectionProps {
  onSelectProductById: (productId: string) => void;
}

export function LookbookSection({ onSelectProductById }: LookbookSectionProps) {
  return (
    <section
      id="lookbook"
      className="bg-[#F6F4F5] border-y border-zinc-200/70 py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10">
          <div className="space-y-2 max-w-xl">
            <p className="text-xs font-medium text-[#9E1644] tracking-wide">
              Editorial de Estilo
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 [text-wrap:balance]">
              Lookbook da Temporada
            </h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-md leading-relaxed">
            Proporções pensadas para transitar da rotina urbana a ocasiões
            formais. Clique em qualquer composição para explorar a bolsa em
            detalhes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {LOOKBOOK_ENTRIES.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => onSelectProductById(entry.productId)}
              className="group relative aspect-[3/4] w-full rounded-xl overflow-hidden text-left bg-zinc-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E1644]"
            >
              <ResilientImage
                src={entry.image}
                alt={`${entry.title} — ${entry.subtitle}`}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white space-y-1.5">
                <p className="text-[11px] font-medium text-white/80 tracking-wide">
                  {entry.seasonNote}
                </p>
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <h3 className="font-display text-2xl font-semibold leading-tight">
                      {entry.title}
                    </h3>
                    <p className="text-xs text-white/85 mt-0.5">
                      {entry.subtitle}
                    </p>
                  </div>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15 group-hover:bg-[#9E1644] transition-colors shrink-0">
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
