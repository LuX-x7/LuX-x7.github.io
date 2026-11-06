import { useEffect, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "../app/globals.css";
import posts from "virtual:writing";
import { profile, education, experience, research } from "./profile";

type Theme = "light" | "dark";

const navigation = [["About Me", "/#about-me"], ["Research", "/#research"], ["Education", "/#education"], ["Experience", "/#experience"], ["Writing", "/writing/"], ["Projects", "/projects/"]];

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
    status: "In progress",
    href: "https://github.com/LuX-x7/LuX-x7.github.io"
  }
];

function Icon({ name }: { name: "mail" | "github" | "location" | "sun" | "moon" | "arrow" }) {
  const paths = {
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></>,
    github: <><path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 22v-3.8a3.3 3.3 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-7A5.5 5.5 0 0 0 18.8 5a5.1 5.1 0 0 0-.1-3.6S17.5 1 15 2.8a13.4 13.4 0 0 0-7 0C5.5 1 4.3 1.4 4.3 1.4A5.1 5.1 0 0 0 4.2 5a5.5 5.5 0 0 0-1.5 3.8c0 5.5 3.2 6.7 6.2 7A3.3 3.3 0 0 0 8 18.3V22"/></>,
    location: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>,
    moon: <path d="M20.9 13a9 9 0 1 1-9.9-9.9A7 7 0 0 0 20.9 13Z"/>,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5"/>,
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch { /* Theme still works when storage is unavailable. */ }
    setTheme(next);
  }
  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}><Icon name={theme === "dark" ? "sun" : "moon"}/></button>;
}

function Sidebar() {
  return <aside className="profile-sidebar" aria-label="Personal profile">
    <a href="/" className="portrait-link" aria-label="Lu Xiao home"><img className="profile-photo" src={profile.portrait} alt="Lu Xiao sitting in a mountain landscape" width="176" height="176" fetchPriority="high" /></a>
    <div className="profile-identity"><h2>{profile.name} <span lang="zh">{profile.chineseName}</span></h2><p className="profile-role">{profile.role}</p><p>{profile.institution}</p><p className="profile-school">{profile.school}</p></div>
    <p className="sidebar-bio">Robot learning, reinforcement learning, and robotic manipulation.</p>
    <ul className="social-links"><li><a href={`mailto:${profile.email}`} title={profile.email}><Icon name="mail"/>Email</a></li><li><a href={profile.github} target="_blank" rel="noreferrer"><Icon name="github"/>GitHub</a></li><li><a href="/about/#contact"><Icon name="location"/>Contact &amp; WeChat</a></li></ul>
  </aside>;
}

function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(location.pathname.startsWith("/writing/") ? "/writing/" : location.pathname.startsWith("/projects/") ? "/projects/" : "/#about-me");
  useEffect(() => {
    if (document.body.dataset.page !== "home") return;
    let frame = 0;
    function update() {
      const threshold = (document.querySelector(".site-header")?.getBoundingClientRect().height || 64) + 30;
      const sections = ["about-me", "research", "education", "experience", "writing"];
      let current = "about-me";
      for (const id of sections) {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= threshold) current = id;
      }
      setActive(current === "writing" ? "/writing/" : `/#${current}`);
    }
    function onScroll() { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  useEffect(() => {
    function onKey(event: KeyboardEvent) { if (event.key === "Escape") setMenuOpen(false); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className={`site-header${menuOpen ? " menu-open" : ""}`}><a className="site-title" href="/">Homepage</a><div className="header-actions"><nav id="main-navigation" aria-label="Main navigation">{navigation.map(([label, href]) => <a href={href} key={href} className={active === href ? "is-active" : undefined} aria-current={active === href ? (href.includes("#") ? "location" : "page") : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav><ThemeToggle/><button className="menu-toggle" type="button" aria-label="Navigation menu" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(open => !open)}><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">{menuOpen ? <path d="m6 6 12 12M6 18 18 6"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}</svg><span>Menu</span></button></div></header>
    <div className="site-content"><Sidebar/><div className="main-column" id="main-content" tabIndex={-1}>{children}</div></div>
    <footer><span>© {new Date().getFullYear()} Lu Xiao</span><span>Layout inspired by <a href="https://github.com/RayeRen/acad-homepage.github.io" target="_blank" rel="noreferrer">AcadHomepage</a> · Navigation inspired by <a href="https://github.com/xyjoey/PRISM" target="_blank" rel="noreferrer">PRISM</a></span><a href="#main-content">Back to top ↑</a></footer>
  </>;
}

const LinkOut = ({ href, children }: { href: string; children: ReactNode }) => <a href={href} target="_blank" rel="noreferrer">{children}</a>;

const sectionSymbols: Record<string, string> = { Research: "📝", Education: "📖", "Research Experience": "💻", "Writing & Notes": "📚" };

function SectionHeading({ title, href, link }: { title: string; href?: string; link?: string }) {
  return <div className="section-heading"><h2>{sectionSymbols[title] && <span className="section-symbol" aria-hidden="true">{sectionSymbols[title]}</span>}{title}</h2>{href && <a href={href}>{link || "View all"}<Icon name="arrow"/></a>}</div>;
}

function Education() {
  return <div className="education-list">{education.map(item => <article className="affiliation-item" key={item.degree}><img src={item.logo} alt={`${item.institution} emblem`} width="80" height="80"/><div><div className="affiliation-heading"><h3>{item.institution}</h3><time>{item.date}</time></div><p className="degree">{item.degree}</p><p>{item.detail}</p></div></article>)}</div>;
}

function Experience({ compact = false }: { compact?: boolean }) {
  return <div className="experience-list">{experience.slice(0, compact ? 3 : undefined).map(item => <article className="affiliation-item" key={item.date}><img src={item.logo} alt={`${item.institution} emblem`} width="48" height="48"/><div><div className="affiliation-heading"><h3>{item.institution}</h3><time>{item.date}</time></div><p className="degree">{item.role}{item.lab && ` · ${item.lab}`}</p><p>Mentor: Prof. <LinkOut href={item.href}>{item.mentor}</LinkOut></p></div></article>)}</div>;
}

function Biography() {
  return <div className="biography">
    <p>I am <strong>Lu Xiao (肖路)</strong>, a master’s student in the School of Artificial Intelligence and Robotics at <LinkOut href="https://www.hnu.edu.cn/">Hunan University</LinkOut>, working with Prof. <LinkOut href={experience[0].href}>Leyuan Fang</LinkOut>. My research focuses on <strong>robotic manipulation</strong>, with interests in robot learning and deep reinforcement learning.</p>
    <p>I received my B.Eng. in Electronic Information Engineering from <strong>Jiluan Academy, Nanchang University</strong>. During my undergraduate studies, I also gained research experience at Nanchang University, working with Prof. <LinkOut href={experience[4].href}>Xiang Wang</LinkOut> and Prof. <LinkOut href={experience[3].href}>Zhi Hu</LinkOut>.</p>
    <p>Previously, I completed six months of research training through the April programme at <strong>Shenzhen X-Institute</strong> and was a research intern at <strong>X-Institute and Tsinghua SIGS</strong> with Prof. <LinkOut href={experience[2].href}>Xueqian Wang</LinkOut>. I later visited <strong>Westlake University</strong>, working with Prof. <LinkOut href={experience[1].href}>Haibin Ling</LinkOut> in the Westlake Intelligent Computing and Application Lab.</p>
  </div>;
}

function Research() {
  return <div className="research-list">{research.map(item => <article className="research-item" key={item.title}><h3>{item.title}</h3><p className="research-category">{item.category}</p><p>{item.description}</p></article>)}</div>;
}

function Home() {
  const recent = [...writingEntries.map(item => ({ ...item, external: true })), ...posts.map(post => ({ date: post.date, title: post.title, description: post.description, format: "Essay", href: `/writing/article/?slug=${encodeURIComponent(post.slug)}`, external: false }))].sort((a, b) => b.date.replaceAll(".", "-").localeCompare(a.date.replaceAll(".", "-"))).slice(0, 3);
  return <main className="home">
    <section className="about-section" id="about-me"><h1>About Me</h1><Biography/></section>
    <section className="home-section" id="research"><SectionHeading title="Research" href="/projects/" link="All projects"/><Research/></section>
    <section className="home-section" id="education"><SectionHeading title="Education"/><Education/></section>
    <section className="home-section" id="experience"><SectionHeading title="Research Experience"/><Experience/></section>
    <section className="home-section" id="writing"><SectionHeading title="Writing & Notes" href="/writing/" link="All writing"/><div className="note-cards">{recent.map(item => <article className="note-card" key={item.href}><div className="note-meta"><time dateTime={item.date.replaceAll(".", "-")}>{item.date.replaceAll(".", "-")}</time><span>{item.format === "PDF" ? "PDF notes" : "Essay"}</span></div><div className="note-copy"><h3><a href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined}>{item.title}</a></h3><p>{item.description}</p></div></article>)}</div></section>
  </main>;
}

function About() {
  return <main><header className="page-header"><p className="eyebrow">BACKGROUND & CONTACT</p><h1>About</h1><p>My path through learning and research.</p></header><section className="text-section"><h2>Biography</h2><Biography/></section><section className="text-section"><h2>Education</h2><Education/></section><section className="text-section" id="experience"><h2>Research experience</h2><Experience/></section><section className="text-section" id="contact"><h2>Get in touch</h2><p>Feel free to reach out about research and shared interests.</p><div className="contact-list"><p><span>Email</span><a href={`mailto:${profile.email}`}>{profile.email}</a></p><p><span>GitHub</span><LinkOut href={profile.github}>LuX-x7 ↗</LinkOut></p><p><span>WeChat</span><span>{profile.wechat}</span></p></div></section></main>;
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
  return <main><header className="page-header"><h1>Research &amp; projects</h1><p>Work on UAV evaluation, multi-agent collaboration, and things I build.</p></header><section className="text-section"><h2>Research</h2><Research/></section><section className="text-section"><h2>Other projects</h2>{projectEntries.map(project => <section className="project-item" key={project.title}><div className="project-heading"><time>{project.date}</time><h2><LinkOut href={project.href}>{project.title} ↗</LinkOut></h2></div><p>{project.description}</p><p className="project-meta">{project.status}</p></section>)}</section></main>;
}

const page = document.body.dataset.page;
const content = page === "about" ? <About /> : page === "writing" ? <Writing /> : page === "article" ? <Article /> : page === "projects" ? <Projects /> : <Home />;
document.title = `${page && page !== "home" ? `${page[0].toUpperCase()}${page.slice(1)} — ` : ""}Lu Xiao`;
createRoot(document.getElementById("root")!).render(<Layout>{content}</Layout>);
