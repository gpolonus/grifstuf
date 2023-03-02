import { error } from '@sveltejs/kit';

export const load = ({ params }: { params: any }) => {
  if (!isNaN(parseInt(params.slug))) {
    return {
      doodleNum: Number(params.slug)
    };
  }

  throw error(404, 'Not found');
}