import {
  lightingById,
  styleById,
  type LightingId,
  type RoomKind,
  type StyleId,
} from "./presets";

const ROOM_HINT: Record<RoomKind, string> = {
  lobby: "hotel lobby / lounge",
  guest: "hotel guest bedroom",
  bath: "hotel bathroom vanity",
  dining: "hotel dining room or bar",
  courtyard: "courtyard inn room",
  corridor: "hotel corridor",
};

export interface PromptInput {
  lighting: LightingId;
  style: StyleId;
  room: RoomKind;
  lock: number;
  extra?: string;
}

const LOCK_EN_HIGH =
  "PIXEL-LOCKED. Camera, framing, perspective, architecture, furniture, plants, fixtures, decorations, labels and silhouettes must stay identical. Do not add, remove, move or restyle any object.";
const LOCK_EN_MID =
  "Structure-locked. Keep the same camera, layout and major objects. Do not add or remove furniture.";
const LOCK_EN_LOW =
  "Keep the same room and camera. Layout must stay recognizable.";

const LOCK_ZH_HIGH =
  "保持图中室内结构、墙体、地面拼花、家具位置、物品形状与镜头角度完全不变。不要增删、移动或替换任何物体。不要改变品牌标识与文字。";
const LOCK_ZH_MID =
  "保持镜头、空间布局与主要家具位置不变。不要新增或删除家具。";
const LOCK_ZH_LOW = "保持同一房间与机位，布局可轻微整理。";

export function buildRetouchPrompt(input: PromptInput): string {
  const light = lightingById(input.lighting);
  const style = styleById(input.style);
  const lock =
    input.lock >= 0.85
      ? LOCK_EN_HIGH
      : input.lock >= 0.7
        ? LOCK_EN_MID
        : LOCK_EN_LOW;

  const extra = input.extra?.trim()
    ? `Additional direction: ${input.extra.trim()}`
    : "";

  const atmosphere =
    style.id === "keep"
      ? "Do not restyle the interior. Materials and palette stay as photographed."
      : `Atmosphere: ${style.promptEn}.`;

  return [
    `Photorealistic correction of this exact ${ROOM_HINT[input.room]} photograph.`,
    lock,
    "Technical correction only: exposure, white balance, and a natural light ratio. Restore the room's real light-and-shadow structure. No creative lighting, no cinematic grade, no invented fixtures.",
    `Correction: ${light.promptEn}.`,
    atmosphere,
    "Natural architectural photography, true materials, no people, no watermark, no invented signage.",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

export function buildComfyPrompt(input: PromptInput): {
  positive: string;
  negative: string;
} {
  const light = lightingById(input.lighting);
  const style = styleById(input.style);
  const lockZh =
    input.lock >= 0.85
      ? LOCK_ZH_HIGH
      : input.lock >= 0.7
        ? LOCK_ZH_MID
        : LOCK_ZH_LOW;

  const extra = input.extra?.trim() ? `补充：${input.extra.trim()}` : "";
  const atmosphere =
    style.id === "keep"
      ? "保持原有装修风格、材质与配色完全不变。"
      : `氛围与色彩：${style.promptZh}。`;

  return {
    positive: [
      lockZh,
      "只做技术校正：提高曝光、纠正色温、恢复正常光比。还原房间真实的光影结构。不要做创造性光影或调色，不要发明灯具。",
      `${light.promptZh}。`,
      atmosphere,
      "真实室内照片，自然材质，锐利细节，无人，无水印。",
      extra,
    ]
      .filter(Boolean)
      .join(""),
    negative:
      "改变机位, 改变布局, 增删家具, 变形, 多余的人, 文字乱码, 水印, 卡通, 油画, 过饱和, 塑料感, 戏剧性光影, 电影打光, 创意调色, 霓虹, 体积光, 丁达尔, HDR过度, 过曝死白, 死黑, 换装修风格, 发明灯带",
  };
}
