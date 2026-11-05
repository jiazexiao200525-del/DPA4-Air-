# DPA4-Air × LiF Σ3 (111) 晶界 · 闭环执行手册

一份**可直接执行的**机器学习势闭环流程手册：把「DPA4-Air 预优化 → 选帧 → ABACUS 单点打标签
→ LoRA 微调 → 分会主动学习采样 → DFT 受力验收 → 晶界能」拆成 19 页、五道决策门的逐项操作。

目标体系：LiF Σ3 (111) 对称倾斜晶界，12 原子周期双界面模型，全部可动（`fixed = 0`）。

- 正文页数：**19 页**
- 生成时间：2026-11-05 17:49
- 依赖：**无**。纯静态 HTML/CSS/JS，零外部引用、零 CDN、不联网也能跑

## 在线看

| 入口 | 地址 | 跳转方式 |
|---|---|---|
多页版（推荐） | `/` | 真实文件跳转，每页一个独立地址 |
单文件版 | `/handbook.html` | `#/slug` 哈希跳转，不刷新页面 |
任意步骤直达 | `/pages/step-03b.html` 等 | 可直接收藏、转发 |

深链接示例（发给别人时最有用）：

```
https://<你的用户名>.github.io/<仓库名>/handbook.html#/step-03b     ← 主动学习采样
https://<你的用户名>.github.io/<仓库名>/handbook.html#/gates       ← 决策门
```

## 发布到 GitHub Pages（5 步）

1. 新建一个 **public** 仓库（例如 `lif-dpa4-handbook`），不要勾选自动生成 README
2. 把本目录里的**全部内容**（`index.html` / `handbook.html` / `pages/` / `assets/` /
   `.nojekyll` / `404.html`）上传到仓库根目录
   ```bash
   git init
   git add -A
   git commit -m "DPA4-Air LiF handbook"
   git branch -M main
   git remote add origin https://github.com/<用户名>/<仓库名>.git
   git push -u origin main
   ```
3. 仓库 **Settings → Pages**
4. **Source** 选 `Deploy from a branch`，**Branch** 选 `main`，目录选 **`/ (root)`**，Save
5. 等 1–3 分钟，访问 `https://<用户名>.github.io/<仓库名>/`

> `.nojekyll` 这个文件必须一起传。没有它，GitHub Pages 会走 Jekyll 处理，
> 可能忽略下划线开头的文件或改变目录行为。

## 目录结构

```
.
├── index.html         多页版首页（四组导航 + 目录卡）
├── handbook.html      单文件版：19 页全部内联，一个文件就是整站
├── 404.html           错误链接自动退回站点根
├── .nojekyll          关闭 Jekyll
├── assets/
│   ├── site.css       全站样式（含 A4 打印视图）
│   └── site.js        导航、清单本地存储
└── pages/             18 个子页
    ├── spec.html / protocol.html / calibration.html
    ├── step-00.html … step-08.html（含 step-03b.html 主动学习采样）
    └── gates.html / deliverables.html / checklist.html / glossary.html
```

## 内容清单

| 组 | 页 |
|---|---|
概览 | 首页 · 全貌 |
预备 | 算例规格 · 四条先钉死的口径 · 标签精度标定 |
执行 | 00 建目录 · 01 单帧预检 · 02 受控预优化 · 03 选帧 · **03B 主动学习采样** · 04 DFT 标签 · 05 数据划分 · 05B LoRA 微调 · 06 再优化与多候选 · 07 受力验收 · 08 晶界能 |
收束 | 决策门（五道）· 交付物与边界 · 执行清单（20 项）· 口径备忘 |

## 使用边界

这是 12 原子的**流程验证**模型，不是出数模型：

- 两个界面只隔 ≈7.07 Å，晶粒半区仅 ~3.5 Å，晶界能会被界面耦合污染，**不能当 LiF Σ3 晶界能写进结论**
- 要出数请换 144 / 232 原子元胞并做间距收敛
- 结构门判据：全部 12 原子最大受力分量 ≤ 0.05 eV/Å

## 本地打开

`handbook.html` 双击即可（桌面浏览器）。多页版需要保持目录结构，
或起一个静态服务器：

```bash
python -m http.server 8000
```

## 许可

内容为执行手册与方法说明，可自由参考与改编。
