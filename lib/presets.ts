export type LightingId =
  | "correct"
  | "lift"
  | "wb"
  | "ratio"
  | "highlight";

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
  relight: number;
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
    id: "correct",
    nameZh: "真实校正",
    nameEn: "True correct",
    kelvin: "5200K",
    relight: 0.4,
    promptZh:
      "提高欠曝区域的曝光，纠正偏黄、偏绿或偏冷的色温，恢复室内正常光比。保持原有光线方向与阴影形状，不要发明新的灯带、射灯或戏剧性光影。白墙与织物接近中性，暗部保留细节但不死黑，高光不溢出",
    promptEn:
      "lift underexposed areas, neutralize yellow/green/blue color cast, restore a natural indoor light ratio. Keep the original light direction and shadow shapes. Do not invent new cove lights, spots or dramatic lighting. Neutral whites, open shadows without crushed blacks, highlights not blown",
    wash: "linear-gradient(135deg,#f4f1ea 0%,#ddd6c8 55%,#b7ae9f 100%)",
  },
  {
    id: "lift",
    nameZh: "提亮暗部",
    nameEn: "Lift shadows",
    kelvin: "5200K",
    relight: 0.35,
    promptZh:
      "主要抬暗部与中间调，让角落、床底、沙发背光面可见。不要改变高光形状，不要把房间打成摄影棚平光",
    promptEn:
      "primarily lift shadows and midtones so corners and backlit furniture stay visible. Do not reshape highlights. Do not flatten the room into studio even light",
    wash: "linear-gradient(135deg,#f7f4ee 0%,#e6e0d4 50%,#c9c2b4 100%)",
  },
  {
    id: "wb",
    nameZh: "纠正色温",
    nameEn: "White balance",
    kelvin: "5000K",
    relight: 0.45,
    promptZh:
      "只纠正色温与色偏：钨丝灯偏黄、日光灯偏绿、混合光偏冷都拉回中性。曝光与光比尽量不动",
    promptEn:
      "correct white balance only: neutralize tungsten yellow, fluorescent green, mixed-light cyan. Keep exposure and contrast almost unchanged",
    wash: "linear-gradient(90deg,#f0d9b8 0%,#ece8e0 50%,#c9d4de 100%)",
  },
  {
    id: "ratio",
    nameZh: "正常光比",
    nameEn: "Light ratio",
    kelvin: "5200K",
    relight: 0.4,
    promptZh:
      "把窗光与室内的反差收到人眼正常范围：窗外不过曝成死白，室内不沉成剪影。光的方向仍从窗户或原有灯具来",
    promptEn:
      "bring window-to-interior contrast into a natural range: windows not blown, interiors not silhouettes. Light still comes from the existing windows and fixtures",
    wash: "linear-gradient(135deg,#efece6 0%,#cfc8bb 48%,#8f877a 100%)",
  },
  {
    id: "highlight",
    nameZh: "收回高光",
    nameEn: "Recover highlights",
    kelvin: "5400K",
    relight: 0.3,
    promptZh:
      "压住窗框、灯罩、大理石上的溢出高光，找回材质。整体略提一点中间调，避免发灰",
    promptEn:
      "recover blown highlights on window frames, lamp shades and stone. Slightly lift midtones so the image does not go grey",
    wash: "linear-gradient(135deg,#ffffff 0%,#ebe6dc 50%,#c5bdb0 100%)",
  },
];

export const STYLES: StylePreset[] = [
  {
    id: "keep",
    nameZh: "不换风格",
    nameEn: "No restyle",
    blurb: "材质、配色、家具全部保留。默认如此。",
    promptZh: "保持原有装修风格、材质与配色完全不变",
    promptEn:
      "keep original interior style, materials and palette unchanged",
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

/** Conservative denoise so furniture does not drift. lock 0.88 ≈ 0.24 */
export function denoiseForLock(lock: number): number {
  return Number(Math.max(0.12, 0.72 - lock * 0.55).toFixed(2));
}

export function controlNetForLock(lock: number): number {
  return Number(Math.min(0.92, 0.5 + lock * 0.4).toFixed(2));
}
