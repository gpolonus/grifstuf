
import fs from 'fs';
import fm from 'front-matter';

const loadBlogContent = (path: string) => {
  const content = fs.readFileSync(path, 'utf8');
  const { attributes, body }: { attributes: {}, body: string } = fm(content);
  return {
    attributes,
    body
  }
}

export const load = ({ params }: any) => {
  if (!params.slug) return {};

  const pathToPost = `./src/routes/blog/[slug]/${params.slug}.md`
  return loadBlogContent(pathToPost);
}
