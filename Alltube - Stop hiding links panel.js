// ==UserScript==
// @name         Alltube Don't Hide Sources
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Stop hiding links panel which normally is hiding after 3 seconds.
// @author       Rafal Enden
// @match        http://alltube.tv/*
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  jQuery('.watch').click(() => jQuery('#slide-panel').clearQueue());
})();
