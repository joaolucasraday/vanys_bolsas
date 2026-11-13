import heroCampaignImg from '../assets/images/hero_editorial_berry_1794574621859.jpg';
import bagStrawToteImg from '../assets/images/bag_straw_tote_1794574603763.jpg';
import bagBlackStructuredImg from '../assets/images/bag_black_structured_1794574605614.jpg';
import bagCognacSaddleImg from '../assets/images/bag_cognac_saddle_1794574604298.jpg';
import bagEmeraldMiniImg from '../assets/images/bag_emerald_mini_1794574605652.jpg';
import bagBurgundyClutchImg from '../assets/images/bag_burgundy_clutch_1794574605971.jpg';
import bagIvoryShoulderImg from '../assets/images/bag_ivory_shoulder_1794574623309.jpg';
import lookbookToteImg from '../assets/images/lookbook_editorial_tote_1794574607238.jpg';
import lookbookWovenImg from '../assets/images/lookbook_editorial_woven_1794574607203.jpg';
import lookbookEveningImg from '../assets/images/lookbook_editorial_evening_1794574622593.jpg';
import lookbookCityImg from '../assets/images/lookbook_editorial_city_1794574622242.jpg';

import { CategoryKey, LookbookEntry, Product } from '../types/shop';

export const HERO_CAMPAIGN_IMAGE = heroCampaignImg;

export const CATEGORY_OPTIONS: { key: CategoryKey; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  { key: 'estruturadas', label: 'Estruturadas' },
  { key: 'totes', label: 'Totes & Ráfia' },
  { key: 'tiracolo', label: 'Tiracolo' },
  { key: 'clutches', label: 'Clutches' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'tote-solare-rafia',
    name: 'Tote Solare Ráfia & Couro',
    category: 'totes',
    categoryLabel: 'Totes & Ráfia',
    material: 'Ráfia natural e couro bovino',
    price: 1180,
    availability: 'Disponível',
    shortDescription:
      'Trama manual em fibra natural de ráfia combinada com alças anatômicas e bolso frontal em couro liso.',
    dimensions: '38 cm × 29 cm × 15 cm',
    craftNote: 'Trançado artesanal de 14 horas com pesponto reforçado.',
    gallery: [bagStrawToteImg, lookbookWovenImg, bagBlackStructuredImg],
    variants: [
      { name: 'Palha & Ônix', hex: '#1C1917', image: bagStrawToteImg },
      { name: 'Palha & Caramelo', hex: '#9A5B2C', image: lookbookWovenImg },
    ],
  },
  {
    id: 'estruturada-nocturne',
    name: 'Bolsa Estruturada Nocturne',
    category: 'estruturadas',
    categoryLabel: 'Estruturadas',
    material: 'Couro calfskin fosco',
    price: 1690,
    availability: 'Edição Limitada',
    shortDescription:
      'Silhueta arquitetônica trapezoidal com alça superior moldada, fecho em latão escovado e alça longa removível.',
    dimensions: '27 cm × 21 cm × 11 cm',
    craftNote: 'Forro integral em camurça aveludada e bordas pintadas à mão.',
    gallery: [bagBlackStructuredImg, lookbookToteImg, bagEmeraldMiniImg],
    variants: [
      { name: 'Preto Fosco', hex: '#18181B', image: bagBlackStructuredImg },
      { name: 'Verde Esmeralda', hex: '#164E38', image: bagEmeraldMiniImg },
    ],
  },
  {
    id: 'sela-terra-tiracolo',
    name: 'Tiracolo Sela Terra',
    category: 'tiracolo',
    categoryLabel: 'Tiracolo',
    material: 'Couro granulado vegetal',
    price: 1340,
    availability: 'Disponível',
    shortDescription:
      'Curvatura orgânica inspirada na selaria clássica, com fivela dourada ajustável e compartimento interno com zíper.',
    dimensions: '24 cm × 19 cm × 8 cm',
    craftNote: 'Curtimento vegetal livre de cromo que desenvolve pátina única.',
    gallery: [bagCognacSaddleImg, lookbookCityImg, bagIvoryShoulderImg],
    variants: [
      { name: 'Conhaque', hex: '#A85D2C', image: bagCognacSaddleImg },
      { name: 'Marfim', hex: '#EAE4D7', image: bagIvoryShoulderImg },
    ],
  },
  {
    id: 'mini-jardin-esmeralda',
    name: 'Mini Top-Handle Jardin',
    category: 'estruturadas',
    categoryLabel: 'Estruturadas',
    material: 'Couro liso italiano',
    price: 1450,
    availability: 'Edição Limitada',
    shortDescription:
      'Proporção compacta com base protegida por pés metálicos e abertura em aba estruturada para o dia e a noite.',
    dimensions: '21 cm × 16 cm × 9 cm',
    craftNote: 'Ferragens banhadas a ouro 18k com tratamento antioxidante.',
    gallery: [bagEmeraldMiniImg, bagBlackStructuredImg, lookbookToteImg],
    variants: [
      { name: 'Esmeralda', hex: '#164E38', image: bagEmeraldMiniImg },
      { name: 'Preto Ônix', hex: '#18181B', image: bagBlackStructuredImg },
    ],
  },
  {
    id: 'clutch-matelasse-rosa',
    name: 'Clutch Matelassê Framboesa',
    category: 'clutches',
    categoryLabel: 'Clutches',
    material: 'Couro napa acolchoado',
    price: 1290,
    availability: 'Disponível',
    shortDescription:
      'Matelassê geométrico macio no tom assinatura do ateliê, acompanhado de corrente delicada removível para uso no ombro.',
    dimensions: '25 cm × 14 cm × 6 cm',
    craftNote: 'Costura dupla em losango com fecho magnético silencioso.',
    gallery: [bagBurgundyClutchImg, lookbookEveningImg, bagIvoryShoulderImg],
    variants: [
      { name: 'Framboesa', hex: '#8F1D42', image: bagBurgundyClutchImg },
      { name: 'Marfim', hex: '#EAE4D7', image: bagIvoryShoulderImg },
    ],
  },
  {
    id: 'meia-lua-marfim',
    name: 'Shoulder Meia-Lua Marfim',
    category: 'tiracolo',
    categoryLabel: 'Tiracolo',
    material: 'Couro pebble macio',
    price: 1120,
    availability: 'Disponível',
    shortDescription:
      'Caimento fluido sob o braço com zíper superior em latão polido e alça regulável em cinco pontos.',
    dimensions: '28 cm × 18 cm × 7 cm',
    craftNote: 'Leveza estrutural com apenas 390g e costuras embutidas.',
    gallery: [bagIvoryShoulderImg, bagCognacSaddleImg, lookbookToteImg],
    variants: [
      { name: 'Marfim', hex: '#EAE4D7', image: bagIvoryShoulderImg },
      { name: 'Conhaque', hex: '#A85D2C', image: bagCognacSaddleImg },
    ],
  },
];

export const LOOKBOOK_ENTRIES: LookbookEntry[] = [
  {
    id: 'look-alfaiataria',
    title: 'Alfaiataria Urbana',
    subtitle: 'Com Bolsa Estruturada Nocturne',
    seasonNote: 'Look 01 · Escritório & Galeria',
    image: lookbookToteImg,
    productId: 'estruturada-nocturne',
  },
  {
    id: 'look-verao',
    title: 'Trama & Linho',
    subtitle: 'Com Tote Solare Ráfia',
    seasonNote: 'Look 02 · Dia a Dia',
    image: lookbookWovenImg,
    productId: 'tote-solare-rafia',
  },
  {
    id: 'look-noite',
    title: 'Noite Monocromática',
    subtitle: 'Com Clutch Matelassê Framboesa',
    seasonNote: 'Look 03 · Eventos & Jantares',
    image: lookbookEveningImg,
    productId: 'clutch-matelasse-rosa',
  },
  {
    id: 'look-trench',
    title: 'Movimento Essencial',
    subtitle: 'Com Tiracolo Sela Terra',
    seasonNote: 'Look 04 · Viagem & Cidade',
    image: lookbookCityImg,
    productId: 'sela-terra-tiracolo',
  },
];
