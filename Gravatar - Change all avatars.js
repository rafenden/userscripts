// ==UserScript==
// @name         Gravatar - Change all avatars
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  A siple script that tick all checkboxes with email addresses when uploading new avatar.
// @author       Rafal Enden
// @match        https://en.gravatar.com/gravatars/apply/*
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  Array.from(document.querySelectorAll('[name="ids[]"]')).forEach(checkbox => checkbox.click())
})();
