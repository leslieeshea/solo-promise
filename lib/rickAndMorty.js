const request = require('superagent');

function getOriginForCharacters(characters) {
  const dedupedUrls = [...new Set(characters.map(character => character.origin.url))];
  return Promise.all(
    dedupedUrls.filter(url => url !== '').map(url => request.get(url)
      .then(res => res.body.name))
  );
}

request
  .get('https://rickandmortyapi.com/api/character/')
  .then(res => res.body.results)
  .then(getOriginForCharacters)
  /*eslint-disable-next-line*/
  .then(console.log);
