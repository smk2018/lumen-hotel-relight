export type LightingId =
  | "morning"
  | "golden"
  | "overcast"
  | "dusk"
  | "cinema"
  | "noon"
  | "candle"
  | "cool";

export type StyleId =
  | "keep"
  | "warm-luxury"
  | "wabi"
  | "scandi"
  | "jiangnan"
  | "tropical"
  | "industrial"
  | "coastal"
  | "new-chinese"
  | "mountain";

export type RoomKind =
  | "lobby"
  | "guest"
  | "bath"
  | "dining"
  | "courtyard"
  | "corridor";

export interface LightingPreset {
  id: LightingId;
  nameZh: string;
  nameEn: string;
  kelvin: string;
  promptZh: string;
  promptEn: string;
  wash: string;
}

export interface StylePreset {
  id: StyleId;
  nameZh: string;
  nameEn: string;
  blurb: string;
  promptZh: string;
  promptEn: string;
}

export const LIGHTINGS: LightingPreset[] = [
  {
    id: "morning",
    nameZh: "晨光清透",
    nameEn: "Morning clear",
    kelvin: "5200K",
    promptZh:
      "清晨侧窗自然光，阴影被柔和抬起，空气通透，白色与浅木提亮，无明显色偏",
    promptEn:
      "clear morning sidelight through windows, lifted shadows, airy and transparent, bright whites and pale wood, no color cast",
    wash: "linear-gradient(135deg,#f7f1e4 0%,#e8d7b0 48%,#c9a36a 100%)",
  },
  {
    id: "golden",
    nameZh: "暖奢金辉",
    nameEn: "Golden luxury",
    kelvin: "3200K",
    promptZh:
      "酒店建筑灯带与暖色筒灯全开，胡桃木被金辉照亮，阴影干净，曝光均匀，宣传册质感",
    promptEn:
      "hotel architectural cove lights and warm downlights fully on, walnut glowing gold, clean shadows, even brochure exposure",
    wash: "linear-gradient(135deg,#f3e0c0 0%,#d4a05a 50%,#8a5a28 100%)",
  },
  {
    id: "overcast",
    nameZh: "阴天柔光",
    nameEn: "Overcast soft",
    kelvin: "6500K",
    promptZh: "阴天大面积柔光，对比降低，色彩干净中性，北欧摄影棚感觉",
    promptEn:
      "soft overcast skylight, lower contrast, clean neutral color, Nordic studio feeling",
    wash: "linear-gradient(135deg,#eef2f4 0%,#c5d0d6 55%,#8a9aa4 100%)",
  },
  {
    id: "dusk",
    nameZh: "日暮暖廊",
    nameEn: "Dusk corridor",
    kelvin: "2700K",
    promptZh: "黄昏窗外余晖混室内暖灯，天空带一点蓝，室内琥珀，电影感过渡",
    promptEn:
      "dusk afterglow mixed with interior warm lamps, a hint of blue in the sky, amber interiors, cinematic transition",
    wash: "linear-gradient(135deg,#f0c9a0 0%,#c56b4a 45%,#3d3a6a 100%)",
  },
  {
    id: "cinema",
    nameZh: "影院夜色",
    nameEn: "Cinema night",
    kelvin: "2400K",
    promptZh:
      "夜间低照度，灯带与重点光保留，阴影更深但细节仍在，琥珀胡桃木，电影级对比",
    promptEn:
      "night interior, cove and accent lights only, deeper shadows with retained detail, amber walnut, filmic contrast",
    wash: "linear-gradient(135deg,#e8b86a 0%,#6a3a1e 48%,#1a1410 100%)",
  },
  {
    id: "noon",
    nameZh: "夏日正午",
    nameEn: "Summer noon",
    kelvin: "5600K",
    promptZh: "正午硬一点的阳光，窗影清晰，高光有控制，夏日明亮但不死白",
    promptEn:
      "midday sun with crisp window shadows, controlled highlights, bright summer without blown whites",
    wash: "linear-gradient(135deg,#fff6d8 0%,#f0d48a 50%,#7ec8d4 100%)",
  },
  {
    id: "candle",
    nameZh: "烛火私宴",
    nameEn: "Candle intimate",
    kelvin: "2000K",
    promptZh: "极暖点光源，局部照明，私密晚餐氛围，暗部沉静，高光点状",
    promptEn:
      "very warm practical lamps, local illumination, intimate dining mood, quiet shadows, small speculars",
    wash: "linear-gradient(135deg,#ffd39a 0%,#c45c28 55%,#2a1208 100%)",
  },
  {
    id: "cool",
    nameZh: "雪景冷调",
    nameEn: "Cool snow",
    kelvin: "7500K",
    promptZh: "冷白日光，轻微青蓝，像雪天室内，金属与石材更清晰，干净克制",
    promptEn:
      "cool daylight with a faint cyan, snow-day interior, metals and stone crisper, restrained and clean",
    wash: "linear-gradient(135deg,#f4f8fb 0%,#c9d8e6 52%,#6a86a0 100%)",
  },
];

export const STYLES: StylePreset[] = [
  {
    id: "keep",
    nameZh: "仅调光",
    nameEn: "Light only",
    blurb: "材质、配色、家具全部保留，只改光线与曝光。",
    promptZh: "保持原有装修风格、材质与配色完全不变，只调整光线与曝光",
    promptEn:
      "keep original interior style, materials and palette unchanged; only lighting and exposure",
  },
  {
    id: "warm-luxury",
    nameZh: "当代暖奢",
    nameEn: "Warm luxury",
    blurb: "胡桃木、皮革、铜灯。你示例图里的那种酒店大堂。",
    promptZh:
      "当代暖奢酒店：胡桃木饰面、皮革沙发、铜与石材，饱和度温和提升，宣传册级整洁",
    promptEn:
      "contemporary warm-luxury hotel: walnut millwork, leather, brass and stone, gently richer color, brochure-neat",
  },
  {
    id: "wabi",
    nameZh: "日式侘寂",
    nameEn: "Wabi-sabi",
    blurb: "纸障、原木、留白。光线薄而静。",
    promptZh: "日式侘寂：纸障柔光、原木与麻、低饱和、留白、静谧",
    promptEn:
      "Japanese wabi-sabi: shoji-soft light, raw wood and linen, low saturation, quiet empty space",
  },
  {
    id: "scandi",
    nameZh: "北欧原木",
    nameEn: "Scandinavian",
    blurb: "浅橡、灰米色、阴天光。空气感。",
    promptZh: "北欧原木：浅橡木、灰米色织物、阴天柔光、空气感、克制",
    promptEn:
      "Scandinavian oak, greige textiles, overcast airy light, restrained palette",
  },
  {
    id: "jiangnan",
    nameZh: "江南院落",
    nameEn: "Jiangnan court",
    blurb: "青砖、花窗、竹影。民宿主图常用。",
    promptZh: "江南院落民宿：青砖花窗、竹影、靛蓝织物、温润晨光",
    promptEn:
      "Jiangnan courtyard inn: grey brick, lattice windows, bamboo shadow, indigo textiles, moist morning light",
  },
  {
    id: "tropical",
    nameZh: "热带度假",
    nameEn: "Tropical resort",
    blurb: "绿植、藤编、海风感高光。",
    promptZh: "热带度假：绿植与藤编、明亮高光、青绿与沙色、度假村宣传",
    promptEn:
      "tropical resort: plants and rattan, bright highlights, teal and sand, vacation brochure",
  },
  {
    id: "industrial",
    nameZh: "工业混凝土",
    nameEn: "Industrial",
    blurb: "水泥、黑钢、硬一点的灯光。",
    promptZh: "工业风：清水混凝土、黑钢、硬边灯光、低饱和",
    promptEn:
      "industrial: fair-faced concrete, black steel, harder lighting, low saturation",
  },
  {
    id: "coastal",
    nameZh: "海岸白屋",
    nameEn: "Coastal",
    blurb: "白墙、亚麻、海蓝点缀。",
    promptZh: "海岸白屋：白墙亚麻、海蓝点缀、干净日光、盐与风的感觉",
    promptEn:
      "coastal white house: linen, sea-blue accents, clean daylight, salt and wind",
  },
  {
    id: "new-chinese",
    nameZh: "新中式",
    nameEn: "New Chinese",
    blurb: "乌木、铜、对称与克制红。",
    promptZh: "新中式：乌木铜器、对称构图感、克制朱红与墨色、端庄",
    promptEn:
      "new Chinese: dark wood and bronze, composed symmetry, restrained vermilion and ink",
  },
  {
    id: "mountain",
    nameZh: "山居原石",
    nameEn: "Mountain lodge",
    blurb: "石、粗纺、壁炉暖光。",
    promptZh: "山居原石：粗石与粗纺、壁炉暖光、深色木、沉稳",
    promptEn:
      "mountain lodge: rough stone and wool, hearth warmth, dark timber, grounded",
  },
];

export const ROOM_KINDS: { id: RoomKind; nameZh: string }[] = [
  { id: "lobby", nameZh: "大堂 / 休息区" },
  { id: "guest", nameZh: "客房" },
  { id: "bath", nameZh: "卫浴" },
  { id: "dining", nameZh: "餐厅 / 酒吧" },
  { id: "courtyard", nameZh: "庭院" },
  { id: "corridor", nameZh: "走廊 / 过道" },
];

export function lightingById(id: LightingId): LightingPreset {
  return LIGHTINGS.find((l) => l.id === id) ?? LIGHTINGS[0];
}

export function styleById(id: StyleId): StylePreset {
  return STYLES.find((s) => s.id === id) ?? STYLES[0];
}
