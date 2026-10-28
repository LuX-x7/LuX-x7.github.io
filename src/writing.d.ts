declare module "virtual:writing" {
  const posts: { slug: string; title: string; date: string; description: string; html: string }[];
  export default posts;
}
