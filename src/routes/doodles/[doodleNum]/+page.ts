import { fetchDoodle } from '$lib/doodles-data';
import { error } from '@sveltejs/kit';

export const load = async ({ params }: { params: any }) => {
  if (!isNaN(parseInt(params.doodleNum))) {
    return await fetchDoodle(Number(params.doodleNum))
  }

  throw error(404, 'Not found');
}