// Public profile content. Update these fields when your background changes.
export const profile = {
  name: "Lu Xiao",
  chineseName: "肖路",
  role: "M.Sc. Student",
  institution: "Hunan University",
  school: "School of Artificial Intelligence and Robotics",
  email: "luxiao.x7@gmail.com",
  github: "https://github.com/LuX-x7",
  wechat: "LuX_x7",
  portrait: new URL("./assets/touxiang1.jpg", import.meta.url).href,
  interests: ["Robot Learning", "Deep Reinforcement Learning", "Robotic Manipulation"],
};

// Broad public summaries only; add titles and links when ready to share.
export const research = [
  { title: "UAV Benchmark", category: "Benchmark", status: "Under Review", description: "Developing a benchmark for the evaluation of unmanned aerial vehicle (UAV) systems." },
  { title: "Multi-Agent Collaboration", category: "Multi-agent systems", status: "Under Review", description: "Studying how multiple agents coordinate and collaborate to accomplish shared tasks." },
];

export const education = [
  { date: "2026.09 — 2029.06", degree: "M.Sc. in Artificial Intelligence", institution: "Hunan University", detail: "School of Artificial Intelligence and Robotics · Expected graduation: June 2029", logo: "/logos/hnu.png" },
  { date: "2022.09 — 2026.06", degree: "B.Eng. in Electronic Information Engineering", institution: "Nanchang University", detail: "Jiluan Academy", logo: "/logos/ncu.png" },
];

export const experience = [
  { date: "2026.09 — Present", role: "Research Student", institution: "Hunan University", lab: "Intelligent Sensing and Action Lab", mentor: "Leyuan Fang", href: "https://robotics.hnu.edu.cn/info/1176/3115.htm", logo: "/logos/hnu.png" },
  { date: "2025.11 — 2026.09", role: "Visiting Student", institution: "Westlake University", lab: "Westlake Intelligent Computing and Application Lab", mentor: "Haibin Ling", href: "https://haibinling.github.io/", logo: "/logos/westlake.png" },
  { date: "2025.01 — 2025.09", role: "Research Intern", institution: "Shenzhen X-Institute & Tsinghua SIGS", lab: "", mentor: "Xueqian Wang", href: "https://www.sigs.tsinghua.edu.cn/wxq/list.htm", logo: "/logos/tsinghua.png" },
];
