import img1 from '../regenerated_image_1784512474527.webp';
import img2 from '../regenerated_image_1784512474999.webp';
import img3 from '../regenerated_image_1784512475534.webp';
import img4 from '../regenerated_image_1784512475939.webp';
import img5 from '../regenerated_image_1784512476422.webp';
import img6 from '../regenerated_image_1784512476913.webp';
import img7 from '../regenerated_image_1784512477390.webp';
import img8 from '../regenerated_image_1784512477850.webp';
import img9 from '../regenerated_image_1784512478316.webp';
import img10 from '../regenerated_image_1784512478714.webp';

// Custom Inline SVG Generator for game placeholders
function createSvgPlaceholder(
  text: string, 
  bgColor = '#EBF5FB', 
  textColor = '#1F618D', 
  width = 240, 
  height = 180, 
  icon = '🎮'
) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="100%" height="100%" fill="${bgColor}" rx="16"/>
    <rect x="8" y="8" width="${width - 16}" height="${height - 16}" fill="none" stroke="${textColor}" stroke-width="2" stroke-dasharray="4 4" rx="12" opacity="0.3"/>
    <circle cx="${width / 2}" cy="${height / 2 - 15}" r="${Math.min(width, height) / 5}" fill="#ffffff" opacity="0.8"/>
    <text x="50%" y="${height / 2 - 10}" font-family="Noto Sans TC, sans-serif" font-size="28" text-anchor="middle" dominant-baseline="middle">${icon}</text>
    <text x="50%" y="${height / 2 + 35}" font-family="Noto Sans TC, sans-serif" font-weight="900" font-size="16" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// 1. Game Heroes
export const game1Hero = createSvgPlaceholder('美食配對夥伴', '#FADBD8', '#78281F', 240, 240, '👦');
export const game2Hero = createSvgPlaceholder('夜市叫賣夥伴', '#FCF3CF', '#7D6608', 240, 240, '👧');
export const game3Hero = createSvgPlaceholder('藍田旅行夥伴', '#D5F5E3', '#145A32', 240, 240, '🎒');
export const game4Hero = createSvgPlaceholder('海邊尋寶夥伴', '#D6EAF8', '#1B4F72', 240, 240, '🦀');
export const game5Hero = createSvgPlaceholder('交通拼拼夥伴', '#E8DAEF', '#4A235A', 240, 240, '🚲');
export const game6Hero = createSvgPlaceholder('溫泉任務夥伴', '#FADBD8', '#78281F', 240, 240, '♨️');
export const game7Hero = createSvgPlaceholder('機場問答夥伴', '#FCF3CF', '#7D6608', 240, 240, '✈️');
export const game8Hero = createSvgPlaceholder('故事排序夥伴', '#D5F5E3', '#145A32', 240, 240, '📚');
export const game9Hero = createSvgPlaceholder('鹿野詞彙夥伴', '#E8DAEF', '#4A235A', 240, 240, '🦌');
export const game10Hero = createSvgPlaceholder('伴手禮採買夥伴', '#D6EAF8', '#1B4F72', 240, 240, '🎁');
export const hubHero = createSvgPlaceholder('遊戲大廳夥伴', '#E5E8E8', '#1B2631', 300, 300, '🌟');

// 2. Foods (Game 1)
export const food_baw = createSvgPlaceholder('肉圓', '#FDEDEC', '#922B21', 180, 180, '🥟');
export const food_tauhue = createSvgPlaceholder('豆花', '#FDEDEC', '#922B21', 180, 180, '🥣');
export const food_bemtsuk = createSvgPlaceholder('米血', '#FDEDEC', '#922B21', 180, 180, '🍢');
export const food_junbiann = createSvgPlaceholder('潤餅', '#FDEDEC', '#922B21', 180, 180, '🌯');
export const food_gerpiann = createSvgPlaceholder('牛舌餅', '#FDEDEC', '#922B21', 180, 180, '🥯');
export const food_tsuanntsa = createSvgPlaceholder('蔥抓餅', '#FDEDEC', '#922B21', 180, 180, '🥞');
export const food_uaakue = createSvgPlaceholder('碗粿', '#FDEDEC', '#922B21', 180, 180, '🍲');
export const food_tshangyupiann = createSvgPlaceholder('蔥油餅', '#FDEDEC', '#922B21', 180, 180, '🍕');

// 3. Vehicles (Game 5)
export const vehicleTrain = createSvgPlaceholder('火車', '#EAF2F8', '#2471A3', 200, 160, '🚂');
export const vehicleBike = createSvgPlaceholder('鐵馬', '#EAF2F8', '#2471A3', 200, 160, '🚲');
export const vehiclePlane = createSvgPlaceholder('飛機', '#EAF2F8', '#2471A3', 200, 160, '✈️');
export const vehicleShip = createSvgPlaceholder('船隻', '#EAF2F8', '#2471A3', 200, 160, '🚢');
export const vehicleCar = createSvgPlaceholder('汽車', '#EAF2F8', '#2471A3', 200, 160, '🚗');
export const vehicleMoto = createSvgPlaceholder('機車', '#EAF2F8', '#2471A3', 200, 160, '🛵');

// 4. Story Steps (Game 8)
export const story1 = createSvgPlaceholder('故事第一步', '#FEF9E7', '#7D6608', 220, 160, '❶');
export const story2 = createSvgPlaceholder('故事第二步', '#FEF9E7', '#7D6608', 220, 160, '❷');
export const story3 = createSvgPlaceholder('故事第三步', '#FEF9E7', '#7D6608', 220, 160, '❸');
export const story4 = createSvgPlaceholder('故事第四步', '#FEF9E7', '#7D6608', 220, 160, '❹');
export const story5 = createSvgPlaceholder('故事第五步', '#FEF9E7', '#7D6608', 220, 160, '❺');

// 5. Souvenirs (Game 10)
export const itemPineapple = createSvgPlaceholder('鳳梨酥', '#F5EEF8', '#6C3483', 180, 180, '🍍');
export const itemNougat = createSvgPlaceholder('牛軋糖', '#F5EEF8', '#6C3483', 180, 180, '🍬');
export const itemTeaegg = createSvgPlaceholder('茶葉蛋', '#F5EEF8', '#6C3483', 180, 180, '🥚');
export const itemMango = createSvgPlaceholder('芒果乾', '#F5EEF8', '#6C3483', 180, 180, '🥭');
export const itemPeanut = createSvgPlaceholder('花生糖', '#F5EEF8', '#6C3483', 180, 180, '🥜');
export const itemSunCake = createSvgPlaceholder('太陽餅', '#F5EEF8', '#6C3483', 180, 180, '☀️');
export const itemJerky = createSvgPlaceholder('牛肉乾', '#F5EEF8', '#6C3483', 180, 180, '🥩');
export const itemMungCake = createSvgPlaceholder('綠豆椪', '#F5EEF8', '#6C3483', 180, 180, '🥮');
export const itemCoffee = createSvgPlaceholder('咖啡豆', '#F5EEF8', '#6C3483', 180, 180, '☕');
export const itemCookie = createSvgPlaceholder('手工餅乾', '#F5EEF8', '#6C3483', 180, 180, '🍪');

// 6. Icons & Decorations
export const hubDish = img1;
export const iconGame2 = img2;
export const iconGame3 = img3;
export const iconGame4 = img4;
export const iconGame5 = img5;
export const iconGame6 = img6;
export const iconGame7 = img7;
export const iconGame8 = img8;
export const iconGame9 = img9;
export const iconGame10 = img10;

export const decorPottery = createSvgPlaceholder('陶瓷裝飾', '#F5EEF8', '#5B2C6F', 100, 100, '🏺');
export const decorFlowers = createSvgPlaceholder('花卉裝飾', '#FADBD8', '#78281F', 100, 100, '🌸');
export const footerSign = createSvgPlaceholder('泰宇出版', '#EAEDED', '#2C3E50', 200, 80, '🏫');
export const tabIconHot = createSvgPlaceholder('熱門推薦', '#FADBD8', '#78281F', 64, 64, '🔥');
export const tabIconSituational = createSvgPlaceholder('情境對話', '#FCF3CF', '#7D6608', 64, 64, '💬');
export const tabIconOutdoor = createSvgPlaceholder('戶外探索', '#D5F5E3', '#145A32', 64, 64, '🧭');
export const tabIconLife = createSvgPlaceholder('生活常用', '#D6EAF8', '#1B4F72', 64, 64, '🏠');

// 7. Landscapes / Scenes
export const oceanScene = createSvgPlaceholder('海邊生態景觀', '#E8F8F5', '#117864', 600, 300, '🏖️');
export const deerLandscape = createSvgPlaceholder('鹿野風光', '#E8F8F5', '#117864', 600, 300, '⛰️');
