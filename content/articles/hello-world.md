---
title: 你好，世界！
description: 第一篇个人文章，记录建站历程。
date: 2026-07-05
tags:
  - 随笔
  - 建站
---

# 你好，世界！

第一篇博文。这个空间以后会用来记录：

- **技术笔记** — 踩过的坑、学到的技巧
- **生活感悟** — 日常的灵光一闪
- **项目展示** — 有意思的作品

## 本站 DIY 指南

所有样式和布局都可以直接改，这里是你最常用的几个文件：

| 文件 | 改什么 |
|------|--------|
| `assets/css/main.css` | 🎨 颜色、字体、间距 |
| `pages/index.vue` | 🏠 首页布局 |
| `components/AppHeader.vue` | 📌 导航栏 |
| `components/AppFooter.vue` | 📌 底部 |
| `components/ArticleCard.vue` | 📄 文章卡片 |
| `pages/articles/[slug].vue` | 📖 文章页排版 |

## 写文章

在 `content/articles/` 下新建 `.md` 文件：

```yaml
---
title: 文章标题
description: 简介
date: 2026-07-05
tags:
  - 标签
---

正文（Markdown）
```

保存即发布。推送到 GitHub 后自动部署。

## 代码测试

```javascript
// 语法高亮正常
function greet(name) {
  return `你好，${name}！`
}
console.log(greet('世界'))
```

> 开始写吧 ✨
