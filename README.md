# 间光 Lumen · 酒店民宿结构锁定精修

一个 ComfyUI 工作流，把客房 / 大堂 / 卫浴实拍做成宣传图：**墙体、家具、物品位置完全不变**，只改光线和风格。

适用于酒店、民宿、OTA 主图、小红书、官网。同一张实拍可批量出晨光、暖奢、阴天、夜景等多套主题。

## 一个工作流就够

不要拆成「调光一条 + 风格一条」。2025 年底之后的标准答法：

**Qwen-Image-Edit-2509 + Relight LoRA + ControlNet Union（Canny + Depth）**

| 层 | 作用 |
| --- | --- |
| Qwen Image Edit 2509 | 指令编辑原图像素，不是文生图再贴回去 |
| Relight LoRA（dx8152） | 只改光的方向和色温，不改几何 |
| ControlNet Union | Canny 锁边缘，Depth 锁空间。沙发、地砖、龙头钉死 |
| Lightning 8-step | 8 步出图，CFG = 1.0 |

提示词顺序必须是：**先锁结构 → 再写光 → 最后写风格**。Qwen 对中文更听话。第一句永远写「保持结构完全不变」。

## 快速开始

1. 安装 [ComfyUI](https://github.com/comfyanonymous/ComfyUI) 与 ComfyUI Manager
2. 下载下方模型放到对应目录
3. 把 [`workflows/lumen-qwen-relight.json`](workflows/lumen-qwen-relight.json) 拖进画布
4. Manager → Install Missing Custom Nodes
5. `LoadImage` 换成你的客房实拍（建议长边 2K–4K JPEG，不要先用美图软件拉爆高光）
6. Queue Prompt，用 Image Comparer 左右拖，检查椅脚、开关、插座有没有漂

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

| 目的 | Denoise | ControlNet | 步数 / CFG |
| --- | --- | --- | --- |
| 只调光（推荐宣传精修） | 0.22–0.32 | 0.75–0.85 | 8 / 1.0 |
| 调光 + 轻度风格 | 0.32–0.40 | 0.65–0.75 | 8 / 1.0 |
| 换主题（北欧 / 侘寂） | 0.40–0.50 | 0.55–0.65 | 8–12 / 1.0 |

denoise 过 **0.5**，茶几会开始搬家。那不是风格，是结构锁失效。漂了就加 ControlNet、降 denoise。过关后再接 SeedVR2 或 Ultimate SD Upscale 出 4K，不要在 denoise 阶段追求分辨率。

结构锁滑杆对照：80–90% ≈ denoise 0.28、ControlNet 0.80。

## 提示词骨架

直接粘到 `TextEncodeQwenImageEditPlus`：

```
保持图中室内结构、墙体、地面拼花、家具位置、物品形状与镜头角度完全不变。不要增删、移动或替换任何物体。不要改变品牌标识与文字。
仅调整光线：{光线描述，含方向 / 色温 / 灯带}。
氛围与色彩：{风格描述}。
专业酒店民宿宣传摄影，真实材质，锐利细节，无人，无水印。
```

反向：

```
改变机位, 改变布局, 增删家具, 变形, 多余的人, 文字乱码, 水印, 卡通, 油画, 过饱和, 塑料感, 重复物体, 多余镜子倒影错误
```

完整光线 / 风格词库见 [`prompts/`](prompts/)。

## 推荐搭配（宣传套）

同一张实拍只改光线那一句，就能出一套 OTA 主图：

| 场景 | 光线 | 风格 |
| --- | --- | --- |
| 商务酒店大堂 | 暖奢金辉 3200K | 当代暖奢 |
| 日式民宿客房 | 晨光清透 5200K | 日式侘寂 |
| 江南院子 | 晨光清透 5200K | 江南院落 |
| 海岛度假 | 夏日正午 5600K | 热带度假 |
| 设计师酒店夜景 | 影院夜色 2400K | 仅调光 |
| 北欧公寓型民宿 | 阴天柔光 6500K | 北欧原木 |

## 目录

```
workflows/lumen-qwen-relight.json   # 拖进 ComfyUI 的工作流
prompts/skeleton.txt                # 提示词骨架
prompts/lighting.md                 # 八种光线
prompts/styles.md                   # 十种气质
prompts/combos.md                   # 场景搭配
lib/presets.ts                      # 词库（可给自己的工具调用）
lib/prompt.ts                       # 按锁定强度拼提示词
lib/workflow-json.ts                # 按当前设定导出完整 JSON
```

## 落地顺序

1. 用一张样图确认光线 / 风格口味。
2. 把 JSON 拖进 ComfyUI，Load Image 换成实拍。
3. Queue。对照滑杆检查椅脚、开关、插座。
4. 同一张图只改 lighting 句子，批量出晨光 / 夜景 / 阴天。
5. 过关的图再接超分。

## License

个人与商业宣传出图可用。模型权重遵循各 Hugging Face 仓库许可。
