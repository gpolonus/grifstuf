
import "isomorphic-fetch";

let allDoodles = [];

const serverUrl = process.env.NODE_ENV === 'production'
  ? 'https://box.grifstuf.com'
  : 'http://localhost:3000'

export async function fetchDoodles() {
  if (allDoodles) {
    return allDoodles;
  }

  allDoodles = await fetch(`${serverUrl}/api/doodles?limit=500&sort=publishedDate`)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(rows => {
      return rows.docs.map(({ title, alt, publishedDate, sizes: { view: { url } } }, num) => ({
        title,
        alt,
        publishedDate: new Date(publishedDate),
        url: `${serverUrl}${url}`,
        index: num,
        last: num === rows.docs.length - 1
      }))
    })

  return allDoodles
}

export async function fetchDoodle(index) {
  return (await fetchDoodles())[index];
}
