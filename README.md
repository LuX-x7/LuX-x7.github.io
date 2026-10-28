<div align="center">

# Lu Xiao · 肖路

**M.Sc. student, School of Artificial Intelligence and Robotics, Hunan University**

Deep Reinforcement Learning · Robot Learning · Robotic Manipulation

[🌐 Website](https://lux-x7.github.io) &nbsp;·&nbsp; [✉️ Email](mailto:luxiao.x7@gmail.com)

</div>

---

## 👋 About

I am **Lu Xiao (肖路)**, a master's student in the School of Artificial Intelligence and Robotics at **Hunan University**, where I work on **robotic manipulation**. My research interests include deep reinforcement learning, robot learning, and robotic manipulation.

I earned my B.Eng. in Electronic Information Engineering from **Jiluan Academy, Nanchang University**. I also completed six months of research training through the April programme at **Shenzhen X-Institute**, and later served as a visiting student at **Tsinghua University** and **Westlake University**.

This repository is both my personal website and a quiet record of what I learn, write, and build.

## 🎓 Education

| Period | Degree | Institution |
| --- | --- | --- |
| 2026.09 – 2029.06 (Expected) | M.Sc. in Artificial Intelligence | School of Artificial Intelligence and Robotics, Hunan University |
| 2022.09 – 2026.06 | B.Eng. in Electronic Information Engineering | Jiluan Academy, Nanchang University |

## 🔬 Research Experience

| Period | Role | Affiliation & Mentor |
| --- | --- | --- |
| 2026.09 – | Research Student | Intelligent Sensing and Action Lab, Hunan University · Prof. Leyuan Fang |
| 2025.11 – 2026.09 | Visiting Student | Westlake Intelligent Computing and Application Lab, Westlake University · Prof. Haibin Ling |
| 2025.01 – 2025.09 | Intern | Shenzhen X-Institute & Tsinghua SIGS · Prof. Xueqian Wang |
| 2023.06 – 2025.01 | Intern | School of Advanced Manufacturing, Nanchang University · Prof. Zhi Hu |
| 2022.09 – 2023.06 | Intern | School of Chemistry and Chemical Engineering, Nanchang University · Prof. Xiang Wang |

## 📚 Writing & Notes

LaTeX notes on what I am currently studying. Sources live in [`Notes/`](Notes/); the compiled PDFs are published on the website.

- **[Diffusion Model](Notes/DiffusionM/DiffusionM.tex)** — denoising diffusion probabilistic models, from the forward noising chain and the ELBO derivation to the reverse sampling process.
- **[Transformer](Notes/Transformer/Transformer.tex)** — attention, multi-head attention, positional encoding, and the original encoder–decoder architecture.
- **[Fundamentals of Machine Learning](Notes/NNDL-1/NNDL-1.tex)** — foundational concepts in machine learning.

## 🧩 This Repository

A static personal site built with **React + Vite + TypeScript**, deployed to **GitHub Pages** through GitHub Actions.

```bash
pnpm install
pnpm run dev      # local development
pnpm run build    # production build
```

## 📫 Contact

- **Email** — [luxiao.x7@gmail.com](mailto:luxiao.x7@gmail.com)
- **WeChat** — `LuX_Maphy`
- **Website** — [lux-x7.github.io](https://lux-x7.github.io)

## Mobile writing

Essays are stored as Markdown in `content/writing/` and rendered as web pages at build time. Existing PDF notes remain unchanged. The Decap CMS editor is available at `/admin/` after deployment.

Before the editor can sign in, deploy a GitHub OAuth provider and configure its URL as `backend.base_url` in `public/admin/config.yml`. Register a GitHub OAuth app with the provider's callback URL, and configure the provider with the app credentials and site origin according to its instructions. GitHub Pages cannot run the OAuth server itself. Never put a client secret or personal access token in this public repository. See [Decap authentication documentation](https://decapcms.org/docs/authentication/).

After setup, sign in at `/admin/`, create an article, and publish it. Publishing commits to `main`, triggering the GitHub Pages workflow; the article appears after deployment succeeds. Content and uploads in this public repository are public. To edit on a computer, add a Markdown file to `content/writing/` with `title`, `date` (YYYY-MM-DD), and optional `description` in YAML front matter.
