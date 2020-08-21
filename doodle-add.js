
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
  const entries = data.split('\n').map(makeDoodleEntry)
  process.stdout.write(entries.join(''))
});

function makeDoodleEntry(data) {
  if (!data) return ''
  const name = data;
  const title = name.split('.')[0].replace(/\_/g, ' ');
  const date = Date.now();

  return `
-
  url: ${name}
  title: ${title}
  date: ${date}
  alt:`
}
