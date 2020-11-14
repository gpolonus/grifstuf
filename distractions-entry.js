
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
  const entries = data.split('\n').map(makeDistractionsEntry)
  process.stdout.write(entries.join(''))
});

function makeDistractionsEntry(title) {
  if (!title) return ''
  const url = title.replace(/\ /g, '-').toLowerCase();
  const date = Date.now();

  return `
-
  url: ${url}
  title: ${title}
  date: ${date}`
}
