(async () => {
  const lucy = require('Lucy');
  const testatron = require('testatron');
  const {
    keys
  } = lucy;
  console.log('Building Test Cases');
  await testatron({
    destination: `${__dirname}/tests`,
    filePath: './build/bundle.js',
    prefix: ` delete require.cache[require.resolve('Lucy')];
    const $ = require('Lucy');
    const {
      ${keys(lucy).join(',')}
    } = $;`,
  });
  console.log('END');
})();
