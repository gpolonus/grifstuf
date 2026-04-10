import { fetchDoodle } from '$lib/doodles-data';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
  if (!isNaN(parseInt(params.doodleNum))) {
    return await fetchDoodle(Number(params.doodleNum))
  }

  return await fetchDoodle(0)
  // throw error(404, 'Not found');
}