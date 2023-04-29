import path from 'path';
import type { CollectionConfig } from 'payload/types';

const Doodles: CollectionConfig = {
  slug: 'doodles',
  upload: {
    staticDir: path.resolve(__dirname, '../../doodles'),
    // Specify the size name that you'd like to use as admin thumbnail
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 150,
        height: 200,
        fit: 'cover',
        position: 'center'
      },
      {
        name: 'view',
        width: 300,
        height: 400,
        fit: 'cover',
        position: 'center'
      },
      {
        name: 'wide',
        width: 1200,
        height: 1600,
        fit: 'cover',
        position: 'center'
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'publishedDate',
      type: 'date',
    },
  ],
  access: {
    read: () => true
  }
};

export default Doodles;
