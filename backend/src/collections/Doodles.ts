import path from 'path';
import type { CollectionConfig, CollectionAfterChangeHook } from 'payload/types';
import 'isomorphic-fetch'

const deployTrigger: CollectionAfterChangeHook = async ({
  doc, // full document data
  req, // full express request
  previousDoc, // document data before updating the collection
  operation, // name of the operation ie. 'create', 'update'
}) => {
  if (process.env.NODE_ENV === 'production') {
    fetch(process.env.VERCEL_DEPLOY_HOOK_URL).then(() => {
      console.log('Deployment Triggered')
    })
  } else {
    console.log('local faux deployment triggered')
  }
  return doc
}

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
        fit: 'contain',
        position: 'center',
        background: 'white'
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
  },
  hooks: {
    afterChange: [
      deployTrigger
    ]
  }
};

export default Doodles;
