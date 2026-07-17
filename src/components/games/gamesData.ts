import {
  hubDish,
  iconGame2,
  iconGame3,
  iconGame4,
  iconGame5,
  iconGame6,
  iconGame7,
  iconGame8,
  iconGame9,
  iconGame10,
} from '../../assets/images/games';

export type GameCategory = 'situational' | 'outdoor' | 'life';

export interface GameMeta {
  id: number;
  key: string;
  title: string;
  desc: string;
  icon?: string;
  category: GameCategory;
}

export const GAMES: GameMeta[] = [
  { id: 1, key: 'game1', title: '老街台語美食配對', desc: '配對台語、美食名字，完成老街美味挑戰！', icon: hubDish, category: 'life' },
  { id: 2, key: 'game2', title: '夜市叫賣大挑戰', desc: '練習夜市叫賣台語，成為最強叫賣高手！', icon: iconGame2, category: 'situational' },
  { id: 3, key: 'game3', title: '藍田小旅行', desc: '探索藍田景點，用台語拍出美麗回憶！', icon: iconGame3, category: 'outdoor' },
  { id: 4, key: 'game4', title: '海邊生態尋寶', desc: '認識海洋生物，找出藏在沙灘的寶物吧！', icon: iconGame4, category: 'outdoor' },
  { id: 5, key: 'game5', title: '交通工具拼拼樂', desc: '認識各種交通工具，拼出正確台語名稱！', icon: iconGame5, category: 'life' },
  { id: 6, key: 'game6', title: '月夜溫泉對話任務', desc: '泡湯場景台語對話，完成對話任務！', icon: iconGame6, category: 'situational' },
  { id: 7, key: 'game7', title: '機場台語問答', desc: '在機場情境中答題，準備你的台語實力！', icon: iconGame7, category: 'situational' },
  { id: 8, key: 'game8', title: '老街故事排序', desc: '將老街故事排序，學會時間與事件表達！', icon: iconGame8, category: 'life' },
  { id: 9, key: 'game9', title: '鹿野觀察詞彙配對', desc: '觀察鹿野景點，配對正確的台語詞彙！', icon: iconGame9, category: 'outdoor' },
  { id: 10, key: 'game10', title: '伴手禮採買任務', desc: '學會伴手禮台語，完成採買任務！', icon: iconGame10, category: 'situational' },
];

export const getNextGameKey = (currentKey: string): string | null => {
  const idx = GAMES.findIndex((g) => g.key === currentKey);
  if (idx === -1 || idx === GAMES.length - 1) return null;
  return GAMES[idx + 1].key;
};
