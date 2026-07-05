---
title: Markdown 写作指南
description: 快速上手 Markdown 语法，写出排版精美的文章。
date: 2026-07-04
tags:
  - 教程
  - Markdown
---

# Markdown 写作指南

这篇文章展示了你可以在文章中使用的主要 Markdown 语法。

## 文本格式

**粗体文字**、*斜体文字*、~~删除线~~、`行内代码`。

## 列表

### 无序列表

- 第一项
- 第二项
  - 嵌套项
  - 另一个嵌套项
- 第三项

### 有序列表

1. 第一步
2. 第二步
3. 第三步

## 引用

> 这是一段引用文字。
>
> 引用可以有多段。
>
> — 引用来源

## 代码块

```javascript
// JavaScript 代码示例
function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

console.log(fibonacci(10)) // → 55
```

```css
/* CSS 代码示例 */
.button {
  background: var(--color-primary);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: var(--radius);
}
```

## 表格

| 功能 | 状态 | 说明 |
|------|------|------|
| 文章列表 | ✅ | 首页展示所有文章 |
| Markdown 渲染 | ✅ | 支持完整的 Markdown 语法 |
| 代码高亮 | ✅ | 代码块自动语法高亮 |
| 暗色模式 | 🔧 | 在 CSS 中取消注释即可启用 |
| 标签分类 | 🔜 | 后续添加标签筛选功能 |

## 分隔线

---

## 链接与图片

- [Nuxt 官方文档](https://nuxt.com)
- [Nuxt Content 文档](https://content.nuxt.com)

## 提示

在 `content/articles/` 目录下创建新的 `.md` 文件，加上合适的 frontmatter（标题、日期、标签等），文章就会自动出现在首页列表中。

**写作愉快！** 🎉
