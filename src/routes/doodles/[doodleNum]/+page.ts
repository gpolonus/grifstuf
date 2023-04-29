import { fetchDoodle } from '$lib/doodles-data';
import { error } from '@sveltejs/kit';

export const load = async ({ params }: { params: any }) => {
  if (!isNaN(parseInt(params.doodleNum))) {
    const doodle = await fetchDoodle(Number(params.doodleNum));

    return {
      doodle
    };
  }

  throw error(404, 'Not found');
}