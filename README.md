# 间光 Lumen · 酒店民宿曝光 / 色温校正

一个 ComfyUI 工作流，把客房 / 大堂 / 卫浴实拍做成可用宣传底图：**墙体、家具、物品位置完全不变**，只做三件事：

1. 提高欠曝曝光  
2. 纠正色温（偏黄 / 偏绿 / 偏冷）  
3. 恢复室内正常光比  

**不发明灯带，不做电影光，不换装修风格。** 还原房间本来的光影结构。

## 一个工作流就够

**Qwen-Image-Edit-2509 + 轻度 Relight LoRA + ControlNet Union（Canny + Depth）**

| 层 | 作用 |
| --- | --- |
| Qwen Image Edit 2509 | 对着原图像素做指令编辑 |
| Relight LoRA | 强度 **0.3–0.45**（不是 0.85）。只帮曝光和色温，不改光的方向 |
| ControlNet Union | Canny + Depth，strength **0.80–0.90**。沙发、地砖、龙头钉死 |
| Lightning 8-step | 8 步，CFG = 1.0，denoise **0.18–0.26** |

提示词顺序：**先锁结构 → 再写校正 → 明确禁止创意光影。** 第一句永远写「保持结构完全不变」。

## 快速开始

1. 安装 [ComfyUI](https://github.com/comfyanonymous/ComfyUI) 与 ComfyUI Manager
2. 下载下方模型放到对应目录
3. 把 [`workflows/lumen-qwen-relight.json`](workflows/lumen-qwen-relight.json) 拖进画布
4. Manager → Install Missing Custom Nodes
5. `LoadImage` 换成你的客房实拍（建议长边 2K–4K JPEG，不要先用美图软件拉爆高光）
6. Relight LoRA 确认是 **0.40**，denoise **0.24**
7. Queue Prompt，用 Image Comparer 左右拖，检查椅脚、开关、插座有没有漂

## 模型

| 文件 | 目录 | 来源 |
| --- | --- | --- |
| `qwen_image_edit_2509_fp8_e4m3fn.safetensors` | `models/unet/` | [Comfy-Org/Qwen-Image-Edit_ComfyUI](https://huggingface.co/Comfy-Org/Qwen-Image-Edit_ComfyUI) |
| `qwen_2.5_vl_7b_fp8_e4m3fn.safetensors` | `models/clip/` | [Comfy-Org/Qwen-Image_ComfyUI](https://huggingface.co/Comfy-Org/Qwen-Image_ComfyUI) |
| `qwen_image_vae.safetensors` | `models/vae/` | 同上 |
| `Qwen-Image-Edit-2509-Lightning-8steps-V1.0-bf16.safetensors` | `models/loras/` | [lightx2v/Qwen-Image-Lightning](https://huggingface.co/lightx2v/Qwen-Image-Lightning) |
| `Qwen-Edit-2509-Relight.safetensors` | `models/loras/` | [dx8152 Relight](https://huggingface.co/dx8152/Qwen-Image-Edit-2509-Relight) |
| `InstantX-Qwen-Image-ControlNet-Union.safetensors` | `models/controlnet/` | [InstantX/Qwen-Image-ControlNet-Union](https://huggingface.co/InstantX/Qwen-Image-ControlNet-Union) |

自定义节点：Manager 搜 **Qwen Image Edit**、**ControlNet Aux**、**rgthree**（Image Comparer）。

显存：12GB 用 FP8；24GB 可上 BF16。

## 参数口诀

| 目的 | Denoise | ControlNet | Relight | 步数 / CFG |
| --- | --- | --- | --- | --- |
| 真实校正（默认） | 0.18–0.26 | 0.80–0.90 | 0.40 | 8 / 1.0 |
| 只提暗部 / 只校色温 | 0.16–0.22 | 0.85–0.90 | 0.30–0.45 | 8 / 1.0 |
| 不要做：创意换光 | ≥ 0.40 | ≤ 0.65 | 0.85 | — |

denoise 过 **0.35**，茶几会开始搬家。那不是校正，是结构锁失效。结构锁建议 **85–92%**。

## 提示词骨架

直接粘到 `TextEncodeQwenImageEditPlus`：

```
保持图中室内结构、墙体、地面拼花、家具位置、物品形状与镜头角度完全不变。不要增删、移动或替换任何物体。不要改变品牌标识与文字。
只做技术校正：提高曝光、纠正色温、恢复正常光比。还原房间真实的光影结构。不要做创造性光影或调色，不要发明灯具。
提高欠曝区域的曝光，纠正偏黄、偏绿或偏冷的色温，恢复室内正常光比。保持原有光线方向与阴影形状。
保持原有装修风格、材质与配色完全不变。
真实室内照片，自然材质，锐利细节，无人，无水印。
```

反向：

```
改变机位, 改变布局, 增删家具, 变形, 多余的人, 文字乱码, 水印, 卡通, 油画, 过饱和, 塑料感, 戏剧性光影, 电影打光, 创意调色, 霓虹, 体积光, 丁达尔, HDR过度, 过曝死白, 死黑, 换装修风格, 发明灯带
```

五种校正任务见 [`prompts/lighting.md`](prompts/lighting.md)。

## 目录

```
workflows/lumen-qwen-relight.json   # 拖进 ComfyUI 的工作流
prompts/skeleton.txt                # 提示词骨架
prompts/lighting.md                 # 五种校正任务
prompts/styles.md                   # 不换风格
prompts/combos.md                   # 什么时候用哪一种校正
lib/presets.ts                      # 词库
lib/prompt.ts                       # 按锁定强度拼提示词
lib/workflow-json.ts                # 按当前设定导出完整 JSON
```

## 落地顺序

1. 把 JSON 拖进 ComfyUI，Load Image 换成实拍。
2. Relight 0.40，denoise 0.24，ControlNet 0.85。
3. Queue。对照滑杆检查椅脚、开关、插座。
4. 暗部仍黑就只改「提亮暗部」那一句；发黄就只改「纠正色温」。
5. 过关的图再接超分。

## License

个人与商业宣传出图可用。模型权重遵循各 Hugging Face 仓库许可。
