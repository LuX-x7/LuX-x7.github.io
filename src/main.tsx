import { useEffect, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "../app/globals.css";
import posts from "virtual:writing";

type Theme = "light" | "dark";

const navigation = [["Home", "/"], ["About", "/about/"], ["Writing", "/writing/"], ["Projects", "/projects/"]];

const writingEntries = [
  {
    date: "2026.09.30",
    title: "Transformer",
    description: "Notes on the Transformer architecture — from sequence tasks and token embeddings to scaled dot-product attention, multi-head attention, and the masked decoder with cross-attention, with step-by-step derivations.",
    format: "PDF",
    href: "/pdfs/Transformer.pdf"
  },
  {
    date: "2026.09.23",
    title: "Diffusion Model",
    description: "Notes on denoising diffusion probabilistic models — from the forward noising chain and the ELBO derivation to the reverse process that generates samples.",
    format: "PDF",
    href: "/pdfs/DiffusionM.pdf"
  },
  {
    date: "2026.08.13",
    title: "Fundamentals of Machine Learning",
    description: "Notes introducing foundational concepts in machine learning.",
    format: "PDF",
    href: "/pdfs/NNDL-1.pdf"
  },
  {
    date: "2026.08.12",
    title: "Introduction",
    description: "An introductory set of learning notes.",
    format: "PDF",
    href: "/pdfs/Introduction.pdf"
  }
];

const projectEntries = [
  {
    title: "Personal learning website",
    description: "A simple home for my writing, PDF notes, and project work.",
    date: "2026.08.13",
    status: "In progress"
  }
];

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light"), []);
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setTheme(next);
  }
  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}><span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span></button>;
}

function Layout({ children }: { children: ReactNode }) {
  return <>
    <header className="site-header">
      <a className="site-title" href="/">Lu Xiao</a>
      <div className="header-actions">
        <nav aria-label="Main navigation">{navigation.map(([label, href]) => <a href={href} key={href} aria-current={location.pathname === href || (href === "/writing/" && location.pathname.startsWith("/writing/")) ? "page" : undefined}>{label}</a>)}</nav>
        <ThemeToggle />
      </div>
    </header>
    <div className="site-content">{children}</div>
    <footer>© <span className="year-number">2026</span> <span className="footer-name">Lu Xiao</span></footer>
  </>;
}

const LinkOut = ({ href, children }: { href: string; children: ReactNode }) => <a href={href} target="_blank" rel="noreferrer">{children}</a>;

function Home() {
  const recent = [...writingEntries.map(item => ({ ...item, external: true })), ...posts.map(post => ({ date: post.date, title: post.title, description: post.description, format: "Essay", href: `/writing/article/?slug=${encodeURIComponent(post.slug)}`, external: false }))].sort((a, b) => b.date.replaceAll(".", "-").localeCompare(a.date.replaceAll(".", "-"))).slice(0, 4);
  return <main className="home">
    <section className="home-hero" aria-labelledby="home-name">
      <div className="home-hero-copy">
        <p className="home-eyebrow">HUNAN UNIVERSITY <span> / </span> ROBOTICS &amp; AI</p>
        <h1 id="home-name">Lu Xiao <span>肖路</span></h1>
        <p className="home-intro">I study how robots learn to interact with the world. I’m a master’s student at Hunan University, working on robotic manipulation and exploring robot learning and deep reinforcement learning.</p>
        <div className="home-contact"><a className="contact-primary" href="/about/">More about me <span aria-hidden="true">↗</span></a><a href="mailto:luxiao.x7@gmail.com">Email <span aria-hidden="true">↗</span></a><a href="https://github.com/LuX-x7">GitHub <span aria-hidden="true">↗</span></a></div>
      </div>
      <figure className="home-portrait"><img src="/portrait.jpg" alt="Lu Xiao sitting in a mountain landscape" width="630" height="648" fetchPriority="high" /><figcaption><span>LU XIAO / 肖路</span><span>RESEARCH &amp; NOTES</span></figcaption></figure>
    </section>
    <section className="home-writing" aria-labelledby="writing-heading">
      <div className="home-section-title"><div><p>THE NOTEBOOK / 01</p><h2 id="writing-heading">Learning,<br />in progress.</h2><p className="section-description">Notes and reflections on the ideas I’m exploring.</p></div><a href="/writing/">Explore all writing <span aria-hidden="true">↗</span></a></div>
      <div className="home-writing-list">{recent.map((item, index) => <a className="home-writing-item" href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} key={item.href}><span className="writing-number">{String(index + 1).padStart(2, "0")}</span><span className="writing-title">{item.title}<small>{item.description}</small><span className="writing-format">{item.format === "PDF" ? "LEARNING NOTES · PDF" : "ESSAY"}</span></span><time>{item.date.replaceAll(".", "-")}</time><span className="writing-arrow" aria-hidden="true">↗</span></a>)}</div>
    </section>
  </main>;
}

function About() {
  return <main>
    <header className="page-header"><h1>About</h1><p>A little more about my background, research, and how to reach me.</p></header>
    <section className="text-section"><h2>Biography</h2><p>I am Lu Xiao (肖路), a master&apos;s student at Hunan University&apos;s School of Artificial Intelligence and Robotics. My research focuses on robotic manipulation, with interests in robot learning and deep reinforcement learning. I received my B.Eng. in Electronic Information Engineering from Jiluan Academy at Nanchang University. I also trained through the April programme at Shenzhen X-Institute, and my research experience includes work at Tsinghua SIGS and Westlake University.</p></section>
    <section className="text-section"><h2>Education</h2>
      <div className="dated-item"><time>2026.09–2029.06 (Expected)</time><div><h3>M.Sc. in Artificial Intelligence</h3><p>School of Artificial Intelligence and Robotics, Hunan University</p></div><img className="institution-logo" src="/logos/hnu.png" alt="Hunan University emblem" /></div>
      <div className="dated-item"><time>2022.09–2026.06</time><div><h3>B.Eng. in Electronic Information Engineering</h3><p>Jiluan Academy, Nanchang University</p></div><img className="institution-logo" src="/logos/ncu.png" alt="Nanchang University emblem" /></div>
    </section>
    <section className="text-section"><h2>Research Experience</h2>
      <div className="dated-item"><time>2026.09–</time><div><h3>Research Student</h3><p>Intelligent Sensing and Action Lab, Hunan University</p><p>Mentor: Professor <LinkOut href="https://robotics.hnu.edu.cn/info/1176/3115.htm">Leyuan Fang</LinkOut></p></div><img className="institution-logo" src="/logos/hnu.png" alt="Hunan University emblem" /></div>
      <div className="dated-item"><time>2025.11–2026.09</time><div><h3>Visiting Student</h3><p>Westlake Intelligent Computing and Application Lab, Westlake University</p><p>Mentor: Chair Professor <LinkOut href="https://haibinling.github.io/">Haibin Ling</LinkOut></p></div><img className="institution-logo" src="/logos/westlake.png" alt="Westlake University logo" /></div>
      <div className="dated-item"><time>2025.01–2025.09</time><div><h3>Intern</h3><p>Shenzhen X-Institute &amp; Tsinghua SIGS</p><p>Mentor: Professor <LinkOut href="https://www.sigs.tsinghua.edu.cn/wxq/list.htm">Xueqian Wang</LinkOut></p></div><div className="institution-logos"><img className="institution-logo institution-logo-wide" src="/logos/x-institute.jpg" alt="Shenzhen X-Institute logo" /><img className="institution-logo" src="/logos/tsinghua.png" alt="Tsinghua University emblem" /></div></div>
      <div className="dated-item"><time>2023.06–2025.01</time><div><h3>Intern</h3><p>School of Advanced Manufacturing, Nanchang University</p><p>Mentor: Professor <LinkOut href="https://teacher.ncu.edu.cn/publish/091727/index.html">Zhi Hu</LinkOut></p></div><img className="institution-logo" src="/logos/ncu.png" alt="Nanchang University emblem" /></div>
      <div className="dated-item"><time>2022.09–2023.06</time><div><h3>Intern</h3><p>School of Chemistry and Chemical Engineering, Nanchang University</p><p>Mentor: Professor <LinkOut href="https://chem.ncu.edu.cn/article.jsp?urltype=news.NewsContentUrl&wbtreeid=1411&wbnewsid=7261">Xiang Wang</LinkOut></p></div><img className="institution-logo" src="/logos/ncu.png" alt="Nanchang University emblem" /></div>
    </section>
    <section className="text-section"><h2>Contact</h2><div className="contact-list"><p><span>Email</span><a href="mailto:luxiao.x7@gmail.com">luxiao.x7@gmail.com</a></p><p><span>WeChat</span><strong>LuX_Maphy</strong></p></div></section>
  </main>;
}

function Writing() {
  return (
    <main>
      <header className="page-header">
        <h1>Writing</h1>
        <p>Learning notes, essays, and reflections on the ideas I am exploring.</p>
      </header>

      {posts.length > 0 && <section className="writing-section"><h2>Essays &amp; reflections</h2><div className="writing-index">{posts.map(post => <article key={post.slug}><time>{post.date}</time><div><h2><a href={`/writing/article/?slug=${encodeURIComponent(post.slug)}`}>{post.title}</a></h2>{post.description && <p>{post.description}</p>}</div><small>Essay</small></article>)}</div></section>}
      <section className="writing-section"><h2>Notes</h2><div className="writing-index">
        {writingEntries.map(entry => (
          <article key={entry.title}>
            <time>{entry.date}</time>
            <div>
              <h2>
                <a href={entry.href} target="_blank" rel="noreferrer">
                  {entry.title}
                </a>
              </h2>
              <p>{entry.description}</p>
            </div>
            <small>{entry.format}</small>
          </article>
        ))}
      </div>

      </section>
      <p className="quiet-note">
        Notes open as PDFs in a new tab and can be downloaded for offline reading.
      </p>
    </main>
  );
}


function Article() {
  const slug = new URLSearchParams(location.search).get("slug");
  const post = posts.find(item => item.slug === slug);
  useEffect(() => { document.title = post ? `${post.title} — Lu Xiao` : "Writing — Lu Xiao"; }, [post]);
  return <main className="article-page"><a className="back-link" href="/writing/">← All writing</a>{post ? <article><header><time>{post.date}</time><h1>{post.title}</h1>{post.description && <p>{post.description}</p>}</header><div className="article-body" dangerouslySetInnerHTML={{ __html: post.html }} /></article> : <p>Sorry, this article could not be found. Browse <a href="/writing/">all writing</a> to find another.</p>}</main>;
}

function Projects() {
  return <main><header className="page-header"><h1>Projects</h1><p>A selection of things I am building and learning from.</p></header>{projectEntries.map(project => <section className="project-item" key={project.title}><div className="project-heading"><time>{project.date}</time><h2>{project.title}</h2></div><p>{project.description}</p><p className="project-meta">{project.status}</p></section>)}</main>;
}

const page = document.body.dataset.page;
const content = page === "about" ? <About /> : page === "writing" ? <Writing /> : page === "article" ? <Article /> : page === "projects" ? <Projects /> : <Home />;
document.title = `${page && page !== "home" ? `${page[0].toUpperCase()}${page.slice(1)} — ` : ""}Lu Xiao`;
createRoot(document.getElementById("root")!).render(<Layout>{content}</Layout>);
