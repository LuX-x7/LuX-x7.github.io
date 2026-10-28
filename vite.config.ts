import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { readdirSync, readFileSync } from "node:fs";
import matter from "gray-matter";
import { marked } from "marked";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react(), {
    name: "writing-content",
    resolveId(id) { if (id === "virtual:writing") return "\0virtual:writing"; },
    load(id) {
      if (id !== "\0virtual:writing") return;
      const directory = `${root}content/writing`;
      this.addWatchFile(directory);
      const posts = readdirSync(directory).filter(name => name.endsWith(".md")).map(name => {
        const path = `${directory}/${name}`;
        this.addWatchFile(path);
        const { data, content } = matter(readFileSync(path, "utf8"));
        return { slug: name.slice(0, -3), title: String(data.title || name.slice(0, -3)), date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date || ""), description: String(data.description || ""), html: marked.parse(content) };
      }).sort((a, b) => b.date.localeCompare(a.date));
      return `export default ${JSON.stringify(posts)}`;
    }
  }],
  build: { rollupOptions: { input: {
    home: `${root}index.html`, about: `${root}about/index.html`, writing: `${root}writing/index.html`, article: `${root}writing/article/index.html`, projects: `${root}projects/index.html`
  } } }
});
