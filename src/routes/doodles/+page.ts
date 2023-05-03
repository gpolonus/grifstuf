import { fetchDoodles } from '$lib/doodles-data';
import { error } from '@sveltejs/kit';

export const load = async () => {
  try {
    const doodles = await fetchDoodles();
    return doodles[doodles.length - 1]
  } catch (e) {
    throw error(404, 'Not found');
  }

}