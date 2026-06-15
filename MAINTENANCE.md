# 网站维护指南

你好！这是你的 Hexo 学术个人网站 `LuX-x7.github.io` 的维护说明。

---

## 一、项目结构

```
D:/Blog
├── _config.yml                          # Hexo 全局配置（站点标题、作者、URL 等）
├── _config.hexo-theme-researcher.yml    # 主题配置（菜单、头像、联系方式等）
├── package.json                         # 依赖列表
├── source/
│   ├── _posts/                          # Notes 文章（博客文章）
│   ├── _data/                           # 学术数据（CV、论文、项目）
│   │   ├── cv.yml
│   │   ├── publications.yml
│   │   ├── projects.yml
│   │   └── talks.yml
│   ├── files/                           # 可下载文件（如简历 PDF）
│   ├── images/                          # 图片（头像、网站图标等）
│   └── ...                              # 其他页面
└── themes/
    └── hexo-theme-researcher/           # 主题文件（一般不需要改）
```

---

## 二、日常更新流程

无论你修改了什么文件，最后都要执行这三步才能同步到网站：

```bash
git add .
git commit -m "描述你做了什么"
git push origin main
```

然后等待 1~3 分钟，访问 `https://LuX-x7.github.io` 即可看到更新。

---

## 三、本地预览

在发布之前，你可以在本地预览效果：

```bash
hexo server
```

然后打开浏览器访问：`http://localhost:4000`

按 `Ctrl + C` 停止本地服务。

如果页面显示不正常，可以先清理再重新生成：

```bash
hexo clean
hexo generate
hexo server
```

---

## 四、修改个人信息

打开 `_config.hexo-theme-researcher.yml`：

| 配置项 | 作用 |
|--------|------|
| `avatar` | 头像图片路径，例如 `/images/LuXiao.jpg` |
| `favicon` | 网站图标路径，例如 `/images/fa1.ico` |
| `menu` | 顶部/侧边栏菜单 |
| `about` | 首页个人简介 |
| `academic_profiles` | Google Scholar、GitHub 等学术主页链接 |
| `contact` | 联系邮箱、地址等 |
| `cv.download_link` | 简历 PDF 下载链接 |

修改后执行：

```bash
git add .
git commit -m "更新个人信息"
git push origin main
```

---

## 五、更新学术内容

学术内容都存储在 `source/_data/` 目录下的 YAML 文件中。

### 5.1 更新简历 / CV

编辑 `source/_data/cv.yml`：

```yaml
education:
  - degree: "Visiting Student"
    institution: "Your Institution"
    period: "2025 - 2026"
    description: "Research focus area"

experience:
  - position: "Research Intern"
    institution: "Your Lab"
    period: "2025 - Present"
    description: "Brief description"
    responsibilities:
      - "Responsibility 1"
      - "Responsibility 2"

skills:
  "Research Areas":
    - "Human-Computer Interaction"
    - "Design"

awards:
  - title: "Your Award"
    issuer: "Institution"
    date: "2025"
    description: "Description"
```

### 5.2 更新论文 Publications

编辑 `source/_data/publications.yml`：

```yaml
- title: "论文标题"
  authors: "Lu Xiao, et al."
  venue: "Conference Name"
  year: "2025"
  type: "conference"
  doi: "10.xxxx/xxxxx"
  pdf: "https://example.com/paper.pdf"
  abstract: "论文摘要"
  featured: enable
```

### 5.3 更新项目 Projects

编辑 `source/_data/projects.yml`：

```yaml
- title: "项目名称"
  status: "current"        # current 或 completed
  period: "2024 - Present"
  category: "HCI"
  description: "项目简介"
  tags: ["HCI", "AI"]
  website: "https://example.com"
  github: "https://github.com/LuX-x7/repo"
  featured: enable
```

### 5.4 更新演讲 Talks

编辑 `source/_data/talks.yml`：

```yaml
- title: "演讲标题"
  event: "会议/研讨会名称"
  location: "城市, 国家"
  date: "2025-06-15"
  type: "presentation"
  links:
    - label: "Slides"
      url: "https://example.com/slides.pdf"
```

---

## 六、在 Notes 里插入新文档

Notes 其实就是 Hexo 的博客文章。所有文章都放在 `source/_posts/` 目录下。

### 6.1 快速创建新文章

在 `D:/Blog` 目录下执行：

```bash
hexo new "文章标题"
```

Hexo 会自动在 `source/_posts/` 下创建一个 Markdown 文件，例如：

```
source/_posts/文章标题.md
```

### 6.2 编辑文章内容

打开生成的 Markdown 文件，内容类似：

```markdown
---
title: 文章标题
date: 2026-06-15 16:00:00
tags:
  - tag1
  - tag2
---

在这里写正文内容。

## 二级标题

- 列表项 1
- 列表项 2

**加粗文字**

[链接文字](https://example.com)
```

### 6.3 文章 Front-matter 说明

文件顶部的 `---` 之间是文章的元数据：

| 字段 | 说明 |
|------|------|
| `title` | 文章标题 |
| `date` | 发布日期 |
| `tags` | 标签列表 |
| `categories` | 分类列表 |
| `draft: true` | 如果加这一行，文章不会发布 |

### 6.4 插入图片

如果你想在文章里插入图片，推荐把图片放到 `source/images/` 目录下，然后在文章中这样引用：

```markdown
![图片描述](/images/图片文件名.jpg)
```

### 6.5 发布新文章

写完文章后，执行：

```bash
git add .
git commit -m "添加新文章：文章标题"
git push origin main
```

等待几分钟后，在 `https://LuX-x7.github.io/notes/` 就能看到新文章。

---

## 七、上传文件（如简历、论文 PDF）

把文件放到 `source/files/` 目录下，然后在配置或文章中引用：

```markdown
[下载简历](/files/CV_Lu_Xiao_VisitingStudent.pdf)
```

---

## 八、常用命令总结

| 命令 | 作用 |
|------|------|
| `hexo new "标题"` | 创建新文章 |
| `hexo new page "页面名"` | 创建新页面 |
| `hexo server` | 本地预览 |
| `hexo clean` | 清理生成的文件 |
| `hexo generate` | 生成静态网站 |
| `git add .` | 暂存所有修改 |
| `git commit -m "说明"` | 提交修改 |
| `git push origin main` | 推送到 GitHub |

---

## 九、注意事项

1. **修改后必须 push**：只在本地改文件，网站不会更新。
2. **强制刷新**：如果网站没变化，试试 `Ctrl + Shift + R` 或清空浏览器缓存。
3. **不要直接改 `public/` 目录**：这个目录是自动生成的，下次生成会被覆盖。
4. **备份重要内容**：`source/_posts/` 和 `source/_data/` 里的内容最重要，建议定期 push 到 GitHub。

---

如果你还有其他问题，随时问我！
