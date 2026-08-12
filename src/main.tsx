import { useEffect, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "../app/globals.css";

type Theme = "light" | "dark";

const navigation = [["Home", "/"], ["About", "/about/"], ["Writing", "/writing/"], ["Projects", "/projects/"]];

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
        <nav aria-label="Main navigation">{navigation.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
        <ThemeToggle />
      </div>
    </header>
    <div className="site-content">{children}</div>
    <footer>© <span className="year-number">2026</span> Lu Xiao</footer>
  </>;
}

const LinkOut = ({ href, children }: { href: string; children: ReactNode }) => <a href={href} target="_blank" rel="noreferrer">{children}</a>;

function Home() {
  const writing = [{ date: "2026", title: "First set of learning notes", type: "PDF" }, { date: "2026", title: "On learning carefully", type: "Essay" }];
  return <main>
    <section className="introduction"><img src="/touxiang1.png" alt="Portrait of Lu Xiao" /><div><h1>Lu Xiao <span className="chinese-name">肖路</span></h1><p>I am an incoming M.Sc. student in Artificial Intelligence at Hunan University. My interests lie in artificial intelligence, robotics, and visual computing.</p><p>This website is a quiet record of what I learn, write, and build.</p></div></section>
    <section className="home-section"><h2>Recent writing</h2><div className="entry-list">{writing.map(item => <a className="entry" href="/writing/" key={item.title}><time>{item.date}</time><span>{item.title}</span><small>{item.type}</small></a>)}</div><p className="more-link"><a href="/writing/">All writing →</a></p></section>
    <section className="home-section"><h2>Projects</h2><p>I keep a small collection of current and completed projects, including this website.</p><p className="more-link"><a href="/projects/">View projects →</a></p></section>
  </main>;
}

function About() {
  return <main>
    <header className="page-header"><h1>About</h1><p>My education and research experience.</p></header>
    <section className="text-section"><h2>Biography</h2><p>I am Lu Xiao (肖路), an incoming M.Sc. student in Artificial Intelligence at the College of Artificial Intelligence and Robotics, Hunan University, where I will be advised by Professor <LinkOut href="https://robotics.hnu.edu.cn/info/1176/3115.htm">Leyuan Fang</LinkOut> beginning in September 2026.</p><p>I received my B.Eng. in Electronic Information Engineering from Nanchang University in 2026. During my undergraduate studies, I explored research across chemistry, electronic information engineering, robotics, and artificial intelligence. I am currently a visiting student in Professor <LinkOut href="https://haibinling.github.io/">Haibin Ling&apos;s</LinkOut> lab at Westlake University.</p></section>
    <section className="text-section"><h2>Education</h2>
      <div className="dated-item"><time>2026 Sep–</time><div><h3>M.Sc. in Artificial Intelligence</h3><p>College of Artificial Intelligence and Robotics, Hunan University</p><p>Advisor: Professor <LinkOut href="https://robotics.hnu.edu.cn/info/1176/3115.htm">Leyuan Fang</LinkOut></p></div><img className="institution-logo" src="/logos/hnu.png" alt="Hunan University emblem" /></div>
      <div className="dated-item"><time>2022–2026</time><div><h3>B.Eng. in Electronic Information Engineering</h3><p>Jiluan Academy,Nanchang University</p><p>Advisor: Professor <LinkOut href="https://teacher.ncu.edu.cn/publish/wufahui/">Fahui Wu</LinkOut></p></div><img className="institution-logo" src="/logos/ncu.png" alt="Nanchang University emblem" /></div>
    </section>
    <section className="text-section"><h2>Research Experience</h2>
      <div className="dated-item"><time>2026 Mar–present</time><div><h3>Visiting Student</h3><p>Westlake Intelligent Computing and Application Lab, Westlake University</p><p>Mentor: Chair Professor <LinkOut href="https://haibinling.github.io/">Haibin Ling</LinkOut></p></div><img className="institution-logo" src="/logos/westlake.png" alt="Westlake University logo" /></div>
      <div className="dated-item"><time>2025 Jan–Sep</time><div><h3>Research Training Programme</h3><p>Shenzhen X-Institute &amp; Tsinghua SIGS</p><p>Mentor: Professor <LinkOut href="https://www.sigs.tsinghua.edu.cn/wxq/list.htm">Xueqian Wang</LinkOut></p></div><div className="institution-logos"><img className="institution-logo institution-logo-wide" src="/logos/x-institute.jpg" alt="Shenzhen X-Institute logo" /><img className="institution-logo" src="/logos/tsinghua.png" alt="Tsinghua University emblem" /></div></div>
      <div className="dated-item"><time>2022 Sep–2023 Jun</time><div><h3>Undergraduate Study in Chemistry</h3><p>School of Chemistry and Chemical Engineering, Nanchang University</p><p>Mentor: Professor <LinkOut href="https://chem.ncu.edu.cn/article.jsp?urltype=news.NewsContentUrl&wbtreeid=1411&wbnewsid=7261">Xiang Wang</LinkOut></p></div><img className="institution-logo" src="/logos/ncu.png" alt="Nanchang University emblem" /></div>
    </section>
    <section className="text-section"><h2>Contact</h2><div className="contact-list"><p><span>Email</span><a href="mailto:luxiao.x7@gmail.com">luxiao.x7@gmail.com</a></p><p><span>WeChat</span><strong>LuX_Maphy</strong></p></div></section>
  </main>;
}

function Writing() {
  const entries = [
    {
      year: "2026",
      title: "Introduction",
      description: "An introductory set of learning notes.",
      format: "PDF",
      href: "/pdfs/Introduction.pdf"
    }
  ];

  return (
    <main>
      <header className="page-header">
        <h1>Writing</h1>
        <p>Essays and PDF notes on subjects I am studying.</p>
      </header>

      <div className="writing-index">
        {entries.map(entry => (
          <article key={entry.title}>
            <time>{entry.year}</time>
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

      <p className="quiet-note">
        PDF notes will open directly in the browser and remain available for download.
      </p>
    </main>
  );
}

function Projects() {
  return <main><header className="page-header"><h1>Projects</h1><p>Selected things I have built or am currently working on.</p></header><section className="project-item"><h2>Personal learning website</h2><p>A simple home for my writing, PDF notes, and project work.</p><p className="project-meta">In progress · 2026</p></section><section className="project-item"><h2>Future project</h2><p>A short account of the problem, the work, and what I learned from it.</p><p className="project-meta">To be added</p></section></main>;
}

const page = document.body.dataset.page;
const content = page === "about" ? <About /> : page === "writing" ? <Writing /> : page === "projects" ? <Projects /> : <Home />;
document.title = `${page && page !== "home" ? `${page[0].toUpperCase()}${page.slice(1)} — ` : ""}Lu Xiao`;
createRoot(document.getElementById("root")!).render(<Layout>{content}</Layout>);
