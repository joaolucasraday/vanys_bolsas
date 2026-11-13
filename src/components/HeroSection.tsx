import { ArrowRight } from 'lucide-react';
import { HERO_CAMPAIGN_IMAGE } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export function HeroSection({ onExploreClick }: HeroSectionProps) {
  return (
    <section
      id="colecao"
      className="relative bg-[#6F1032] text-white overflow-hidden"
    >
      {/* Desktop full-bleed editorial backdrop */}
      <div className="hidden lg:block absolute inset-0">
        <ResilientImage
          src={HERO_CAMPAIGN_IMAGE}
          alt="Campanha Outono/Inverno Atelier Rosa com duas modelos segurando bolsas estruturadas em couro preto"
          className="w-full h-full object-cover object-right"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#6B1030] via-[#6B1030]/85 via-45% to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[480px] lg:min-h-[600px] py-10 sm:py-14 lg:py-20 gap-8">
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-rose-100/90">
              Coleção Outono &amp; Inverno · Edição Limitada
            </p>

            <h1 className="font-display text-[clamp(2.35rem,4.4vw,4rem)] font-semibold leading-[1.05] tracking-tight text-white [text-wrap:balance]">
              Arquitetura em couro, pensada para acompanhar cada trajeto.
            </h1>

            <p className="text-sm sm:text-base text-rose-50/90 leading-relaxed max-w-xl">
              Bolsas estruturadas, totes em ráfia trançada à mão e clutches
              matelassê produzidas em pequenos lotes com acabamento artesanal.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-white text-[#7B1135] hover:bg-rose-50 font-semibold text-sm rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Explorar Coleção</span>
                <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              </button>

              <a
                href="#lookbook"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-rose-100 hover:text-white underline underline-offset-4 transition-colors whitespace-nowrap min-h-[44px]"
              >
                Ver Lookbook
              </a>
            </div>
          </div>

          {/* Mobile / tablet clean framed campaign image */}
          <div className="lg:hidden rounded-xl overflow-hidden border border-white/15 aspect-[16/9]">
            <ResilientImage
              src={HERO_CAMPAIGN_IMAGE}
              alt="Campanha Outono/Inverno Atelier Rosa com bolsas em couro estruturado"
              className="w-full h-full object-cover object-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
