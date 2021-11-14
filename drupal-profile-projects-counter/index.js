// ==UserScript==
// @name         drupal.org — Number of total projects
// @description  Show number of projects on the drupal.org user profile.
// @author       Rafal Enden
// @namespace    https://github.com/rafenden
// @homepageURL  https://github.com/rafenden/userscripts/blob/master/drupal-profile-projects-counter
// @supportURL   https://github.com/rafenden/userscripts/issues
// @license      MIT
// @version      1.0
// @match        *://www.drupal.org/u/*
// @grant        none
// ==/UserScript==

'use strict'

const projectsElement = document.querySelector('.versioncontrol-project-user-commits')
const totalProjects = projectsElement.querySelectorAll('li').length
projectsElement.insertAdjacentHTML('beforebegin', `<p>Total projects: ${totalProjects}</p>`)
