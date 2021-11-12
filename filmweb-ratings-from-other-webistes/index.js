// ==UserScript==
// @name         Filmweb.pl — Ratings from other websites
// @description  Show ratings on the filmweb.pl movie page from IMDB, Rotten Tomatoes and Metacritic.
// @author       Rafal Enden
// @namespace    https://github.com/rafenden
// @homepageURL  https://github.com/rafenden/userscripts/filmweb-ratings-from-other-webistes
// @supportURL   https://github.com/rafenden/userscripts/issues
// @version      1.0
// @match        *://www.filmweb.pl/*
// @connect      www.omdbapi.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==

// Show critics rating.
document.querySelector('.filmRating.hide').classList.remove('hide')

const getTitle = () => {
  return (document.querySelector('.filmCoverSection__orginalTitle') || document.querySelector('.filmCoverSection__title')).textContent
}

const getYear = () => {
  return document.querySelector('.filmCoverSection__year').textContent
}

const addRatings = (json) => {
  const ratingsContainer = document.querySelector('.filmCoverSection__ratings')

  for (let i = 0; i < json.Ratings.length; i++) {
    const rating = json.Ratings[i]
    let ratingUrl

    if (rating.Source === 'Rotten Tomatoes' && json.tomatoURL && json.tomatoURL !== 'N/A') {
      ratingUrl = json.tomatoURL
    }
    else if (rating.Source === 'Metacritic') {
      ratingUrl = `https://www.metacritic.com/search/all/${json.Title}/results`
    }
    else if (rating.Source === 'Internet Movie Database') {
      ratingUrl = `https://www.imdb.com/title/${json.imdbID}/`
    }

    ratingsContainer.innerHTML = ratingsContainer.innerHTML + `<a class="filmRating__count" style="margin-right: 10px" href="${ratingUrl}">${rating.Source}: <strong>${rating.Value}</strong></a>`
  }
}

// Fetch ratings from other websites.
GM_xmlhttpRequest({
  method: 'GET',
  url: `http://www.omdbapi.com/?apikey=6be019fc&tomatoes=true&t=${getTitle()}&y=${getYear()}`,
  onload: (response) => {
    var json = JSON.parse(response.responseText)
    if (json) {
      if (json.Error) {
        console.error(`Error: ${json.Error}`)
      }
      else {
        addRatings(json)
      }
    }
    else {
      console.error('Unknown error')
    }
  }
})
