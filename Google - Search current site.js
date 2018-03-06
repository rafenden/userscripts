(() => {
  'use strict';
    
  const URL = document.location.href;
  let domain = URL.split('/')[2];
  if (domain.substring(0, 4) === 'www.') {
    domain = domain.substring(4);
  }
  if (domain !== '' && domain !== 'localhost') {
    query = prompt('Search this site');
    query = query.replace(' ', '+');
    document.location = `http://www.google.pl/search?q=${query}+site%3A${domain}`;
  }
})();
