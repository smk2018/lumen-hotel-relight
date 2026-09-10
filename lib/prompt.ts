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

export function buildRetouchPrompt(input: PromptInput): string {
  const light = lightingById(input.lighting);
  const style = styleById(input.style);
  const lock =
    input.lock >= 0.85
      ? "PIXEL-LOCKED. The camera angle, framing, perspective, architecture, furniture, plants, fixtures, decorations, labels and object silhouettes must remain identical. Do not add, remove, move, restyle or redesign any object."
      : input.lock >= 0.7
        ? "Structure-locked. Keep the same camera, layout, furniture placement and major objects. Small tidy-up of cushions or wrinkles is allowed. Do not add or remove furniture."
        : "Keep the same room and camera. Furniture may be slightly restyled but the layout must stay recognizable.";

  const extra = input.extra?.trim()
    ? `Additional direction: ${input.extra.trim()}`
    : "";

  return [
    `Photorealistic hospitality marketing photograph of this exact ${ROOM_HINT[input.room]}.`,
    lock,
    `ONLY change lighting: ${light.promptEn}.`,
    `Atmosphere: ${style.promptEn}.`,
    "Professional architectural photography, sharp materials, natural textures, no people, no watermark, no invented signage.",
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
      ? "保持图中室内结构、墙体、地面拼花、家具位置、物品形状与镜头角度完全不变。不要增删、移动或替换任何物体。不要改变品牌标识与文字。"
      : input.lock >= 0.7
        ? "保持镜头、空间布局与主要家具位置不变。允许把靠垫、袋袋整理得更整齐。不要新增或删除家具。"
        : "保持同一房间与机位，布局可轻微整理。";

  const extra = input.extra?.trim() ? `补充：${input.extra.trim()}` : "";

  return {
    positive: [
      lockZh,
      `仅调整光线：${light.promptZh}。`,
      `氛围与色彩：${style.promptZh}。`,
      "专业酒店民宿宣传摄影，真实材质，锐利细节，无人，无水印。",
      extra,
    ]
      .filter(Boolean)
      .join(""),
    negative:
      "改变机位, 改变布局, 增删家具, 变形, 多余的人, 文字乱码, 水印, 卡通, 油画, 过饱和, 塑料感, 重复物体, 多余镜子倒影错误",
  };
}
