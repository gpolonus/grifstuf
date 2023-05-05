import { buildConfig } from 'payload/config';
import path from 'path';
import Categories from './collections/Categories';
import Posts from './collections/Posts';
import Tags from './collections/Tags';
import Users from './collections/Users';
import Doodles from './collections/Doodles';

export default buildConfig({
  serverURL: process.env.NODE_ENV === 'production' ? 'https://box.grifstuf.com' : 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [
    Categories,
    Posts,
    Tags,
    Users,
    Doodles,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  },
  graphQL: {
    disable: true
  },
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, written in bytes
    },
  }
});
