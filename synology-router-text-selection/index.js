// ==UserScript==
// @name         Synology Router — Enable text selection
// @description  Enable text selection in Synology SRM (router).
// @author       Rafal Enden
// @namespace    https://github.com/rafenden
// @homepageURL  https://github.com/rafenden/userscripts/blob/master/synology-router-text-selection
// @supportURL   https://github.com/rafenden/userscripts/issues
// @license      MIT
// @version      1.0
// @match        *://*/webman/index.cgi
// @grant        none
// ==/UserScript==

'use strict'

document.querySelector('body').style.userSelect = 'text'
