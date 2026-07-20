import { useState } from 'react';
import { Trophy, ShoppingCart, RotateCcw, ChevronRight, CheckCircle2, Info } from 'lucide-react';
import { GameShell } from './GameShell';
import { charAhui } from '../../assets/images/characters';
import {
  game10Hero,
  itemPineapple,
  itemNougat,
  itemTeaegg,
  itemMango,
  itemPeanut,
  itemSunCake,
  itemJerky,
  itemMungCake,
  itemCoffee,
  itemCookie,
} from '../../assets/images/games';

interface Product {
  id: string;
  name: string;
  unit: string;
  price: number;
  img: string;
  required: boolean;
}

const PRODUCTS: Product[] = [
  { id: 'pineapple', name: '鳳梨酥', unit: '1 盒', price: 320, img: itemPineapple, required: true },
  { id: 'nougat', name: '牛軋糖', unit: '1 包', price: 200, img: itemNougat, required: true },
  { id: 'teaegg', name: '茶葉蛋', unit: '6 粒', price: 120, img: itemTeaegg, required: true },
  { id: 'mango', name: '芒果乾', unit: '1 包', price: 180, img: itemMango, required: true },
  { id: 'peanut', name: '花生糖', unit: '1 包', price: 150, img: itemPeanut, required: true },
  { id: 'sunc', name: '太陽餅', unit: '1 盒', price: 280, img: itemSunCake, required: false },
  { id: 'jerky', name: '肉乾', unit: '1 包', price: 350, img: itemJerky, required: false },
  { id: 'mungcake', name: '綠豆糕', unit: '1 盒', price: 260, img: itemMungCake, required: false },
  { id: 'coffee', name: '咖啡', unit: '1 包', price: 300, img: itemCoffee, required: false },
  { id: 'cookie', name: '手工餅乾', unit: '1 盒', price: 250, img: itemCookie, required: false },
];

const BUDGET = 1000;
const SHOPPING_LIST = PRODUCTS.filter((p) => p.required);

export default function Game10Souvenirs({ onNext, onHome, onGamesHub }: { onNext: () => void; onHome?: () => void; onGamesHub?: () => void }) {
  const [basket, setBasket] = useState<string[]>([]);
  const [result, setResult] = useState<null | boolean>(null);

  const total = basket.reduce((sum, id) => sum + PRODUCTS.find((p) => p.id === id)!.price, 0);
  const remaining = BUDGET - total;

  const addItem = (id: string) => {
    if (basket.includes(id)) return; // one of each in this simplified version
    if (result !== null) setResult(null);
    setBasket((prev) => [...prev, id]);
  };

  const removeItem = (id: string) => {
    setBasket((prev) => prev.filter((x) => x !== id));
    setResult(null);
  };

  const checkout = () => {
    const hasAllRequired = SHOPPING_LIST.every((p) => basket.includes(p.id));
    const hasExtras = basket.some((id) => !PRODUCTS.find((p) => p.id === id)!.required);
    const withinBudget = total <= BUDGET;
    setResult(hasAllRequired && !hasExtras && withinBudget);
  };

  const restart = () => {
    setBasket([]);
    setResult(null);
  };

  const done = result === true;

  return (
    <GameShell onHome={onHome} onGamesHub={onGamesHub} mascotSrc={charAhui}>
      <div className="rounded-3xl overflow-hidden shadow-sm">
        <img src={game10Hero} alt="第10款 伴手禮採買任務" className="w-full h-auto block" />
      </div>

      <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-4 md:p-5 flex items-center gap-6 flex-wrap text-sm font-bold text-[#5C5548]">
        <span className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-[#E4772E]" /> 目前分數 <span className="text-[#2D2A26]">{done ? 300 : 0} 分</span>
        </span>
        <span>
          剩餘金額 <span className={remaining < 0 ? 'text-red-500' : 'text-[#2D2A26]'}>NT$ {remaining}</span>
        </span>
        <span className="flex items-center gap-2 ml-auto text-[#8A8378] text-xs">
          <Info className="w-4 h-4" /> 阿爸欲買物件轉去予朋友，請照清單採買，預算是 1000 箍，愛注意金額喔！
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4 flex-1">
        <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-4">
          <div className="grid grid-cols-5 gap-3">
            {PRODUCTS.map((p) => {
              const inBasket = basket.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => (inBasket ? removeItem(p.id) : addItem(p.id))}
                  className={`rounded-xl border-2 p-2 flex flex-col items-center gap-1 transition-all ${
                    inBasket ? 'border-[#4E9B5D] bg-[#EAF6EC]' : 'border-[#EFE8D8] bg-white hover:border-[#E4772E]'
                  }`}
                >
                  <img src={p.img} alt={p.name} className="w-full aspect-square object-cover rounded-lg" />
                  <span className="text-xs font-bold text-[#3E2723]">
                    {p.name}（{p.unit}）
                  </span>
                  <span className="text-xs text-[#E4772E] font-bold">${p.price}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-4 flex flex-col">
          <div className="font-black text-[#2D2A26] mb-3">採買清單</div>
          <ul className="flex flex-col gap-2 text-sm mb-4">
            {SHOPPING_LIST.map((p, i) => (
              <li
                key={p.id}
                className={`flex items-center justify-between px-3 py-2 rounded-xl ${
                  basket.includes(p.id) ? 'bg-[#EAF6EC] text-[#4E9B5D]' : 'bg-white text-[#3E2723]'
                }`}
              >
                <span>
                  {i + 1}. {p.name} {p.unit}
                </span>
                <span className="font-bold">${p.price}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-xl bg-[#F5F0E4] px-3 py-2 text-sm font-bold text-[#2D2A26] flex justify-between">
            <span>預算</span>
            <span className="text-[#E4772E]">${BUDGET}</span>
          </div>

          {result !== null && (
            <div
              className={`mt-3 rounded-xl px-3 py-2 text-sm font-bold flex items-center gap-2 ${
                result ? 'bg-[#EAF6EC] text-[#4E9B5D]' : 'bg-red-50 text-red-500'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {result ? '採買清單完成！做得好！' : '清單不對或超出預算，再檢查看看！'}
            </div>
          )}

          <div className="mt-auto pt-4 text-xs text-[#8A8378] bg-[#F5F0E4] rounded-2xl p-3">
            💡 聽清楚對話內容，注意數量與金額，才會買對喔！
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-1">
        <button
          onClick={checkout}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E4772E] text-white font-bold text-sm hover:bg-[#CC6620] transition-colors"
        >
          <ShoppingCart className="w-4 h-4" /> 檢查結帳
        </button>
        <button
          onClick={restart}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8A8378] text-white font-bold text-sm hover:bg-[#736C60] transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> 清空購物籃
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4E9B5D] text-white font-bold text-sm hover:bg-[#458752] transition-colors"
        >
          {done ? '返回總覽' : '下一關'} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </GameShell>
  );
}
