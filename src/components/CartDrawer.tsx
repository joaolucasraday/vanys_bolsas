import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { CartItem } from '../types/shop';
import { formatBRL } from '../utils/format';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (
    productId: string,
    variantName: string,
    delta: number
  ) => void;
  onRemoveItem: (productId: string, variantName: string) => void;
  onClearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 900;

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [formError, setFormError] = useState('');
  const [orderCode, setOrderCode] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && items.length > 0 && step === 'confirmed') {
      setStep('bag');
    }
  }, [isOpen, items.length, step]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const qualifiesFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );
  const shippingCost = items.length === 0 || qualifiesFreeShipping ? 0 : 45;
  const total = subtotal + shippingCost;

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      customerName.trim().length < 3 ||
      !customerEmail.includes('@') ||
      customerPhone.trim().length < 8 ||
      customerAddress.trim().length < 6
    ) {
      setFormError(
        'Preencha nome completo, e-mail válido, telefone e endereço para envio.'
      );
      return;
    }

    setFormError('');
    const randomCode = `AR-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderCode(randomCode);
    setStep('confirmed');
    onClearCart();
  };

  const handleCloseDrawer = () => {
    if (step === 'confirmed') {
      setStep('bag');
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setCustomerAddress('');
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Sacola de compras"
      onClick={handleCloseDrawer}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-zinc-900">
            {step === 'bag' && 'Sua Sacola'}
            {step === 'checkout' && 'Finalizar Pedido'}
            {step === 'confirmed' && 'Pedido Confirmado'}
          </h2>
          <button
            type="button"
            onClick={handleCloseDrawer}
            aria-label="Fechar sacola"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {step === 'confirmed' ? (
            <div className="py-10 text-center space-y-4">
              <CheckCircle2
                className="w-12 h-12 text-[#9E1644] mx-auto"
                strokeWidth={1.5}
              />
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-[#9E1644] tabular-nums">
                  Pedido #{orderCode} confirmado · Em preparação
                </p>
                <h3 className="font-display text-2xl font-semibold text-zinc-900">
                  Obrigada pela preferência, {customerName.split(' ')[0]}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Enviamos o resumo da sua compra e o código de rastreamento para{' '}
                  <span className="font-medium text-zinc-900">
                    {customerEmail}
                  </span>
                  .
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseDrawer}
                className="mt-4 px-6 py-2.5 bg-[#9E1644] hover:bg-[#7B1135] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer min-h-[44px]"
              >
                Continuar Explorando
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <ShoppingBag
                className="w-10 h-10 text-zinc-300 mx-auto"
                strokeWidth={1.5}
              />
              <div className="space-y-1">
                <p className="font-display text-2xl font-semibold text-zinc-900">
                  Sua sacola está vazia
                </p>
                <p className="text-sm text-zinc-500">
                  Explore as silhuetas da coleção para adicionar suas peças
                  favoritas.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseDrawer}
                className="px-5 py-2.5 text-sm font-medium text-white bg-[#9E1644] hover:bg-[#7B1135] rounded-lg transition-colors cursor-pointer min-h-[44px]"
              >
                Ver Catálogo
              </button>
            </div>
          ) : step === 'bag' ? (
            <>
              <div className="p-3.5 bg-[#F9F1F4] rounded-xl text-xs text-[#7B1135]">
                {qualifiesFreeShipping ? (
                  <span>
                    Você garantiu <strong>frete expresso cortesia</strong> para
                    todo o Brasil.
                  </span>
                ) : (
                  <span>
                    Faltam{' '}
                    <strong className="tabular-nums">
                      {formatBRL(remainingForFreeShipping)}
                    </strong>{' '}
                    para frete expresso cortesia.
                  </span>
                )}
              </div>

              <ul className="divide-y divide-zinc-200">
                {items.map((item) => (
                  <li
                    key={`${item.productId}-${item.variantName}`}
                    className="py-4 flex gap-4"
                  >
                    <div className="w-20 aspect-[4/3] bg-[#F6F4F5] rounded-lg overflow-hidden shrink-0 border border-zinc-200/70">
                      <ResilientImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-zinc-900 truncate">
                          {item.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() =>
                            onRemoveItem(item.productId, item.variantName)
                          }
                          aria-label={`Remover ${item.name}`}
                          className="text-zinc-400 hover:text-zinc-700 cursor-pointer p-0.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-zinc-500">
                        {item.categoryLabel} · {item.variantName}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="inline-flex items-center border border-zinc-200 rounded-md h-8">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(
                                item.productId,
                                item.variantName,
                                -1
                              )
                            }
                            aria-label="Diminuir quantidade"
                            className="w-7 h-full inline-flex items-center justify-center text-zinc-600 hover:text-zinc-900 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-medium text-zinc-900 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(
                                item.productId,
                                item.variantName,
                                1
                              )
                            }
                            aria-label="Aumentar quantidade"
                            className="w-7 h-full inline-flex items-center justify-center text-zinc-600 hover:text-zinc-900 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-zinc-900 tabular-nums">
                          {formatBRL(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <form
              id="checkout-form"
              onSubmit={handleCheckoutSubmit}
              className="space-y-4"
            >
              <p className="text-xs text-zinc-500 leading-relaxed">
                Informe os dados de entrega para emissão da nota e envio
                seguro com código de rastreamento.
              </p>

              {formError && (
                <div
                  role="alert"
                  className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800"
                >
                  {formError}
                </div>
              )}

              <div className="space-y-1">
                <label
                  htmlFor="checkout-name"
                  className="block text-xs font-medium text-zinc-700"
                >
                  Nome completo
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ana Carolina Mendes"
                  className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-[#9E1644] min-h-[40px]"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="checkout-email"
                  className="block text-xs font-medium text-zinc-700"
                >
                  E-mail
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="ana@exemplo.com.br"
                  className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-[#9E1644] min-h-[40px]"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="checkout-phone"
                  className="block text-xs font-medium text-zinc-700"
                >
                  Telefone / WhatsApp
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="(11) 98765-4321"
                  className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-[#9E1644] min-h-[40px]"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="checkout-address"
                  className="block text-xs font-medium text-zinc-700"
                >
                  CEP e Endereço completo
                </label>
                <input
                  id="checkout-address"
                  type="text"
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Rua Haddock Lobo, 420 — São Paulo, SP"
                  className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-[#9E1644] min-h-[40px]"
                />
              </div>
            </form>
          )}
        </div>

        {items.length > 0 && step !== 'confirmed' && (
          <div className="px-6 py-4 border-t border-zinc-200 bg-zinc-50/70 space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatBRL(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Frete</span>
                <span className="tabular-nums">
                  {shippingCost === 0 ? 'Cortesia' : formatBRL(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-zinc-900 pt-1.5 border-t border-zinc-200">
                <span>Total</span>
                <span className="tabular-nums">{formatBRL(total)}</span>
              </div>
            </div>

            {step === 'bag' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full h-11 bg-[#9E1644] hover:bg-[#7B1135] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Continuar para Entrega
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep('bag')}
                  className="px-4 h-11 border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 h-11 bg-[#9E1644] hover:bg-[#7B1135] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Confirmar Pedido
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
