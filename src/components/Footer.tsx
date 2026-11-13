import { FormEvent, useState } from 'react';
import { Check } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Digite um e-mail válido.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#6F1032] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          <div className="md:col-span-4 space-y-3">
            <a
              href="#colecao"
              className="font-display text-3xl font-semibold tracking-tight text-white inline-block"
            >
              Atelier Rosa
            </a>
            <p className="text-sm text-rose-100/85 leading-relaxed max-w-xs">
              Bolsas autorais em couro legítimo e fibras naturais, desenhadas
              para acompanhar rotinas reais com durabilidade e leveza.
            </p>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold tracking-wide text-rose-200">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm text-rose-100/90">
              <li>
                <a href="#colecao" className="hover:text-white transition-colors">
                  Coleção
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-white transition-colors">
                  Lookbook
                </a>
              </li>
              <li>
                <a href="#artesania" className="hover:text-white transition-colors">
                  Artesania
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wide text-rose-200">
              Atendimento
            </h3>
            <ul className="space-y-2 text-sm text-rose-100/90">
              <li>contato@atelierrosa.com.br</li>
              <li>São Paulo · Jardins, 420</li>
              <li>Seg a Sáb · 10h às 19h</li>
              <li>Troca cortesia em até 30 dias</li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wide text-rose-200">
              Lançamentos Privados
            </h3>
            <p className="text-sm text-rose-100/85">
              Receba acesso antecipado às tiragens limitadas da temporada.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-sm text-white bg-white/10 rounded-lg px-3.5 py-2.5">
                <Check className="w-4 h-4 shrink-0" />
                <span>Inscrição confirmada na lista.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    aria-label="Seu e-mail para receber novidades"
                    className="flex-1 min-w-0 px-3 py-2 text-sm bg-white/10 border border-white/25 rounded-lg text-white placeholder:text-rose-200/70 focus:outline-none focus:border-white min-h-[40px]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white text-[#7B1135] hover:bg-rose-50 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap min-h-[40px]"
                  >
                    Inscrever
                  </button>
                </div>
                {error && <p className="text-xs text-rose-200">{error}</p>}
              </form>
            )}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-rose-200/80">
          <p>© 2026 Atelier Rosa. Todos os direitos reservados.</p>
          <p>Frete cortesia acima de R$ 900,00 · Pagamento seguro</p>
        </div>
      </div>
    </footer>
  );
}
