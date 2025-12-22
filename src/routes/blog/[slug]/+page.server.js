
import fs from 'fs';
import fm from 'front-matter';

const loadBlogContent = (path) => {
  const content = fs.readFileSync(path, 'utf8');
  const { attributes, body } = fm(content);
  return {
    attributes,
    body
  }
}

export const load = ({ params }) => {
  if (!params.slug) return {};

  const pathToPost = `./src/routes/blog/[slug]/${params.slug}.md`
  return loadBlogContent(pathToPost);
}
