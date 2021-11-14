// ==UserScript==
// @name         imdb.com — Ratings from other websites
// @description  Show ratings on the imdb.com movie page from Filmweb, Rotten Tomatoes and Metacritic.
// @author       Rafal Enden
// @namespace    https://github.com/rafenden
// @homepageURL  https://github.com/rafenden/userscripts/blob/master/imdb-ratings-from-other-websites
// @supportURL   https://github.com/rafenden/userscripts/issues
// @license      MIT
// @version      1.0
// @match        https://www.imdb.com/title/*
// @connect      www.filmweb.pl
// @connect      www.omdbapi.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==

function getMovieID() {
  const IMDbID_RegEx = /\/title\/(tt\d{7})\//
  return IMDbID_RegEx.exec(window.location.href)[1]
}

function getMovieTitle() {
  return document.querySelector('[data-testid="hero-title-block__title"]').textContent
}

function getMovieYear() {
  return document.querySelector('[data-testid="hero-title-block__metadata"]').firstElementChild.firstElementChild.textContent
}

function addRating(siteName, url, rating, count) {
  //const ratingsWrapper = document.querySelector('.RatingBar__ButtonContainer-sc-85l9wd-1')
  const ratingsWrapper = document.querySelector('[class*="TitleBlock__HideableRatingBar"]')
  const ratingItem = document.querySelector('[data-testid="hero-rating-bar__aggregate-rating"]')

  const newRatingItem = ratingItem.cloneNode(true)
  newRatingItem.firstElementChild.innerText = siteName
  newRatingItem.querySelector('[class*="RatingBarButtonBase__Button"]').setAttribute('href', url)
  newRatingItem.querySelector('[data-testid="hero-rating-bar__aggregate-rating__score"]').firstElementChild.innerText = rating
  newRatingItem.querySelector('[class*="AggregateRatingButton__TotalRatingAmount"]').innerText = count || ''

  ratingsWrapper.prepend(newRatingItem)
}

function showFilmwebRating() {
  GM_xmlhttpRequest({
    method: 'GET',
    url: `https://www.filmweb.pl/search?q=${getMovieTitle()}+${getMovieYear()}`,
    onload: (response) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.responseText, 'text/html');

      const rating = doc.querySelector('.rateBox__rate').textContent
      const count = doc.querySelector('.rateBox__votes--count').textContent
      const url = doc.querySelector('.filmPreview__link').getAttribute('href')

      addRating('Filmweb', `https://www.filmweb.pl${url}`, rating, count)
    },
  })
}

function showOtherRatings() {
  const OMDBAPI_API_KEY = '6be019fc'
  GM_xmlhttpRequest({
    method: 'GET',
    url: `http://www.omdbapi.com/?apikey=${OMDBAPI_API_KEY}&tomatoes=true&i=${getMovieID()}`,
    onload: (response) => {
      const json = JSON.parse(response.responseText)
      console.log(json)
      if (json) {
        if (json.Error) {
          console.error(`Error: ${json.Error}`)
        }
        else {
          json.Ratings.forEach((rating) => {
            if (rating.Source === 'Rotten Tomatoes' && json.tomatoURL && json.tomatoURL !== 'N/A') {
              addRating('Rotten Tomatoes', json.tomatoURL, rating.Value)
            }
            else if (rating.Source === 'Metacritic') {
              addRating('Metacritic', `https://www.metacritic.com/search/all/${json.Title}/results`, rating.Value)
            }
          });
        }
      }
      else {
        console.error('Unknown error')
      }
    }
  })
}

showFilmwebRating()
showOtherRatings()

document.querySelectorAll('[data-testid="hero-rating-bar__aggregate-rating__score"]').forEach((element) => {
  element.lastElementChild.remove()
})
