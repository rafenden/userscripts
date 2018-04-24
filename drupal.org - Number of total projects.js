// ==UserScript==
// @name         drupal.org — Number of total projects
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Show number of projects on the user profile.
// @author       Rafal Enden
// @match        https://www.drupal.org/u/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const projectsElement = document.querySelector('.versioncontrol-project-user-commits');
    const totalProjects = projectsElement.querySelectorAll('li').length;
    projectsElement.insertAdjacentHTML('beforebegin', `<p>Total projects: ${totalProjects}</p>`);
})();